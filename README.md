# Framez

Framez is a minimal social mobile app built with React Native (Expo) and Supabase. Users can register, log in, create text or image posts, view a global feed, and see their profile with their own posts. Designed for the Stage 4 task, it demonstrates authentication, realtime data, storage, and mobile navigation.

## Features

- Authentication: Email/password sign-up, login, logout
- Persistent sessions with `AsyncStorage`
- Posts: Text + optional image (uploaded to Supabase Storage)
- Feed: Most-recent-first with realtime updates
- Profile: User info (name, email) + user’s posts
- Navigation: Auth stack (Login, Register) and App stack (Feed, Create Post, Profile)

## Tech Stack

- React Native (Expo SDK 54)
- Supabase (Auth, Postgres, Storage, Realtime)
- React Navigation (native-stack)
- dayjs (relative time)
- react-hook-form (forms)

## Getting Started

1) Prerequisites
- Node.js LTS
- Expo CLI (optional, `npm i -g expo`)
- Supabase project (URL + anon key)

2) Configure Supabase
- Update `app/services/supabaseClient.js` with your Supabase URL and anon key.
- Create a public Storage bucket named `posts`.
- Run the SQL in the Database section below.

3) Install
```bash
npm install
```

4) Run
- Web preview:
```bash
npm run web
```
- Android (device or emulator):
```bash
npm run android
```
- iOS (macOS required):
```bash
npm run ios
```

## Database

Run in Supabase SQL editor:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  avatar_url text,
  updated_at timestamp with time zone default now()
);

create table if not exists public.posts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text,
  image_url text,
  author_name text,
  created_at timestamp with time zone default now()
);

alter publication supabase_realtime add table public.posts;

alter table public.profiles enable row level security;
alter table public.posts enable row level security;

create policy "Read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Insert own profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Read all posts" on public.posts
  for select using (true);
create policy "Insert own posts" on public.posts
  for insert with check (auth.uid() = user_id);
create policy "Update own posts" on public.posts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Delete own posts" on public.posts
  for delete using (auth.uid() = user_id);
```

## Environment & Notes

- If email confirmation is enabled, users must verify email after sign-up to keep the session.
- The `posts` bucket must be public for feed images to render. For private buckets, use signed URLs.
- The Supabase anon key is expected to be used on the client; rotate/regenerate keys periodically.

## Development Tips

- Expo Go: `npx expo start` then scan the QR to test on device.
- Android on Windows: Install Android Studio and SDK, set `ANDROID_SDK_ROOT` and ensure `adb` is in your `PATH`.
- Web support: Install `react-dom` and `react-native-web` (already included).

## Deployment (Appetize.io)

Build and upload the app to Appetize.io to host a web-based preview. Include the Appetize link in your submission.

## License

No license specified. For educational use in Stage 4.