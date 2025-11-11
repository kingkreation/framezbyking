# Framez 📱

A mobile social media application built with React Native and Supabase for Stage 4 Frontend Development Task.

## Features

- ✅ **User Authentication**: Secure sign-up, login, and logout using Supabase Authentication
- ✅ **Persistent Sessions**: Users remain logged in after closing and reopening the app
- ✅ **Create Posts**: Share text and/or image posts  
- ✅ **Feed**: View all posts from users in chronological order
- ✅ **Profile**: View user information and personal posts
- ✅ **Real-time Updates**: Posts update automatically using Supabase real-time subscriptions
- ✅ **Free Hosting**: 1GB free storage with Supabase (no credit card required!)

## Tech Stack

### Frontend
- **React Native** (Expo SDK 54)
- **React Navigation** - Screen navigation with bottom tabs
- **Expo Image Picker** - Upload images from device
- **AsyncStorage** - Persistent local storage for sessions

### Backend
- **Supabase Authentication** - User registration and login
- **Supabase Database** (PostgreSQL) - Real-time database for posts and user data
- **Supabase Storage** - Cloud storage for post images (1GB free!)

### State Management
- **React Context API** - Global authentication state

## Project Structure

```
framez/
├── App.js                      # Main app component
├── app/
│   ├── screens/                # All screen components
│   │   ├── LoginScreen.js      # User login
│   │   ├── RegisterScreen.js   # User registration
│   │   ├── FeedScreen.js       # All posts feed
│   │   ├── CreatePostScreen.js # Create new post
│   │   └── ProfileScreen.js    # User profile
│   ├── components/             # Reusable components
│   │   └── PostCard.js         # Individual post display
│   ├── context/                # React Context
│   │   └── AuthContext.js      # Authentication context
│   ├── services/               # External services
│   │   └── supabaseConfig.js   # Supabase configuration
│   ├── utils/                  # Utility functions
│   │   └── timeAgo.js          # Format timestamps
│   └── navigation/             # Navigation setup
│       ├── AuthStack.js        # Auth screens navigation
│       ├── AppStack.js         # Main app tabs navigation
│       └── index.js            # Root navigator
├── assets/                     # Images and static files
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd framez
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   
   a. Create a Supabase project at [Supabase Dashboard](https://app.supabase.com/)
   
   b. Get your project credentials:
      - Go to Project Settings > API
      - Copy your **Project URL** and **anon/public key**
   
   c. Update `app/services/supabaseConfig.js` with your credentials:
   ```javascript
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

4. **Set up Database Tables**
   
   In Supabase Dashboard > SQL Editor, run these SQL commands:
   
   **Create users table:**
   ```sql
   CREATE TABLE users (
     id uuid REFERENCES auth.users PRIMARY KEY,
     name text NOT NULL,
     email text NOT NULL,
     created_at timestamp with time zone DEFAULT now()
   );

   -- Enable Row Level Security
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;

   -- Policy: Users can read any user
   CREATE POLICY "Users can view all users"
     ON users FOR SELECT
     USING (true);

   -- Policy: Users can only update their own data
   CREATE POLICY "Users can update own data"
     ON users FOR UPDATE
     USING (auth.uid() = id);

   -- Policy: Users can insert their own data
   CREATE POLICY "Users can insert own data"
     ON users FOR INSERT
     WITH CHECK (auth.uid() = id);
   ```

   **Create posts table:**
   ```sql
   CREATE TABLE posts (
     id bigserial PRIMARY KEY,
     user_id uuid REFERENCES auth.users NOT NULL,
     author_name text NOT NULL,
     content text,
     image_url text,
     created_at timestamp with time zone DEFAULT now()
   );

   -- Enable Row Level Security
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

   -- Policy: Authenticated users can read all posts
   CREATE POLICY "Authenticated users can view all posts"
     ON posts FOR SELECT
     USING (auth.role() = 'authenticated');

   -- Policy: Authenticated users can create posts
   CREATE POLICY "Authenticated users can create posts"
     ON posts FOR INSERT
     WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

   -- Policy: Users can update their own posts
   CREATE POLICY "Users can update own posts"
     ON posts FOR UPDATE
     USING (auth.uid() = user_id);

   -- Policy: Users can delete their own posts
   CREATE POLICY "Users can delete own posts"
     ON posts FOR DELETE
     USING (auth.uid() = user_id);
   ```

   **Enable Realtime for posts:**
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE posts;
   ```

5. **Set up Storage for Images**
   
   a. In Supabase Dashboard > Storage, create a new bucket named `posts`
   
   b. Make it public by clicking on the bucket > Policies > "New Policy"
   
   c. Use this policy for public read access:
   ```sql
   -- Policy: Anyone can view images
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'posts');

   -- Policy: Authenticated users can upload images
   CREATE POLICY "Authenticated users can upload images"
   ON storage.objects FOR INSERT
   WITH CHECK (bucket_id = 'posts' AND auth.role() = 'authenticated');
   ```

6. **Enable Email Authentication**
   
   - Go to Authentication > Providers
   - Enable Email provider
   - Turn off "Confirm email" if you want instant signups (recommended for testing)

### Running the App

#### Web (Development)
```bash
npm run web
```
The app will open at http://localhost:5000

#### Mobile (Expo Go)
```bash
npm start
```
Scan the QR code with:
- **iOS**: Camera app
- **Android**: Expo Go app

#### Build for Production
```bash
# Android
npm run android

# iOS (requires macOS)
npm run ios
```

## Usage

### Registration
1. Open the app
2. Click "Sign Up"
3. Enter your name, email, and password
4. Click "Sign Up"

### Login
1. Enter your email and password
2. Click "Log In"

### Create a Post
1. Navigate to the "Post" tab
2. Type your message (optional)
3. Click "Add Image" to upload a photo (optional)
4. Click "Post"

### View Feed
- The "Home" tab shows all posts from all users
- Pull down to refresh

### View Profile
- The "Profile" tab shows your information and posts
- Click "Logout" to sign out

## Data Models

### Users Table
```sql
{
  id: uuid (references auth.users),
  name: text,
  email: text,
  created_at: timestamp
}
```

### Posts Table
```sql
{
  id: bigserial,
  user_id: uuid (references auth.users),
  author_name: text,
  content: text,
  image_url: text,
  created_at: timestamp
}
```

## Design Inspiration

The app design is inspired by Instagram with:
- Clean, minimal interface
- White background with subtle borders
- Blue accent color (#0095f6)
- Round profile avatars
- Card-based post layout

## Deployment

### Expo Go (Testing)
Use the QR code from `npm start` to test on physical devices

### Appetize.io (Demo)
1. Create an account at [appetize.io](https://appetize.io)
2. Upload your built app
3. Get the shareable link

## Testing Checklist

- ✅ User can register with email and password
- ✅ User can log in
- ✅ User can log out
- ✅ Auth session persists after app restart
- ✅ User can create text-only post
- ✅ User can create post with image
- ✅ Feed displays all posts
- ✅ Posts show author name and timestamp
- ✅ Profile shows user information
- ✅ Profile shows only user's posts
- ✅ Navigation works smoothly
- ✅ App runs on web
- ✅ App runs on Android/iOS via Expo Go
- ✅ Real-time updates work

## Why Supabase?

- **Free tier is generous**: 1GB storage, 50MB database, unlimited API requests
- **No credit card required** for free tier
- **PostgreSQL database**: More powerful than NoSQL for complex queries
- **Real-time subscriptions**: Built-in websocket support
- **Row Level Security**: Database-level security policies
- **Easy to use**: Simple API similar to Firebase

## Troubleshooting

**Issue**: "Invalid API key" error
- **Solution**: Double-check your Supabase URL and anon key in `supabaseConfig.js`

**Issue**: Can't create posts
- **Solution**: Make sure you've created the database tables and enabled RLS policies

**Issue**: Images not uploading
- **Solution**: Check that the `posts` storage bucket exists and has the correct policies

**Issue**: Real-time updates not working
- **Solution**: Run the `ALTER PUBLICATION` command to enable realtime for the posts table

## Future Enhancements

- Add comments on posts
- Add likes/reactions
- Add user avatars
- Add post deletion
- Add image filters
- Add push notifications
- Add user search
- Add follow/unfollow functionality
- Add direct messaging

## Credits

Built for Stage 4 Frontend Development Task

## License

This project is open source and available under the MIT License.
