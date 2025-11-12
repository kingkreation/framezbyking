# Framez (React Native + Expo + Supabase)

A minimal social app where users can register, log in, create text/image posts, see a global feed, and view their profile with their posts. Built for Stage 4 using Expo and Supabase.

## Tech Stack

- React Native (Expo)
- Supabase (Auth, Postgres, Storage, Realtime)
- React Navigation (Native Stack)
- dayjs (time formatting)
- react-hook-form (forms)

## Getting Started

1. Prerequisites:
   - Node.js LTS
   - Expo CLI (`npm i -g expo` optional)
   - Supabase project (URL + anon key)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app (web preview for quick validation):
   ```bash
   npm run web
   ```
   Or run on device/simulator:
   ```bash
   npm run android
   npm run ios
   ```

## Supabase Setup

Use your project URL and anon key in `app/services/supabaseClient.js`.

### Storage

Create a bucket named `posts` (public):

1. Supabase Dashboard → Storage → Create bucket
2. Name: `posts`, Public: enabled

### Database Schema

Run the following SQL in Supabase SQL editor:

```sql
-- Profiles table mirrors auth.users and stores display name
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  avatar_url text,
  updated_at timestamp with time zone default now()
);

-- Posts table
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text,
  image_url text,
  author_name text,
  created_at timestamp with time zone default now()
);

-- Enable realtime
alter publication supabase_realtime add table public.posts;

-- RLS policies
alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- Profiles policies
create policy "Read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Insert own profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Posts policies
create policy "Read all posts" on public.posts
  for select using (true);
create policy "Insert own posts" on public.posts
  for insert with check (auth.uid() = user_id);
create policy "Update own posts" on public.posts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Delete own posts" on public.posts
  for delete using (auth.uid() = user_id);
```

## Features Implemented

- Email/password sign-up, login, logout
- Persistent session via AsyncStorage
- Create posts with text and optional image (uploads to Storage)
- Global feed (most recent first) with realtime updates
- Profile screen showing current user info and their posts
- Simple navigation with header actions (New, Me)

## Notes

- If email confirmation is enabled in Supabase, users must verify email before session persists.
- Storage bucket must be public for image URLs to render; for private, use signed URLs.
- This project uses the public anon key in client (expected for Supabase frontend).

## Appetize.io

After the app runs on Android/iOS, export and upload to Appetize.io per their instructions. Include the hosted preview link in your submission.