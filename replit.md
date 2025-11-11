# Framez - Mobile Social Media Application

## Overview

Framez is a mobile social media application built with React Native (Expo) for a Stage 4 Frontend Development task. The app allows users to share posts with text and images, featuring user authentication, a global feed of posts, and individual user profiles. The application follows an Instagram-inspired design pattern.

**Current Status**: ✅ Fully migrated to Supabase and running
- App is accessible at http://localhost:5000 (Expo web)
- Workflow configured and running successfully
- All core features implemented
- Supabase integration configured (requires user's credentials)
- Free tier: 1GB storage, no credit card required!

## Recent Changes (November 11, 2025)

- ✅ **Migrated from Firebase to Supabase** (user request - avoid Firebase storage costs)
- Installed @supabase/supabase-js package
- Created supabaseConfig.js with placeholder credentials
- Updated AuthContext to use Supabase Authentication
- Updated FeedScreen with Supabase real-time subscriptions
- Updated CreatePostScreen with Supabase Storage for images
- Updated ProfileScreen with Supabase queries
- Removed Firebase dependencies and config files
- Created comprehensive README with Supabase setup instructions
- Cleared Metro cache and verified app bundles successfully

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Architecture

### Directory Structure

```
framez/                         # Main application directory
├── App.js                      # Root component with AuthProvider
├── app/
│   ├── screens/                # All screen components
│   │   ├── LoginScreen.js      # User login
│   │   ├── RegisterScreen.js   # User registration
│   │   ├── FeedScreen.js       # All posts feed (Supabase real-time)
│   │   ├── CreatePostScreen.js # Create new post (Supabase Storage)
│   │   └── ProfileScreen.js    # User profile (Supabase queries)
│   ├── components/             # Reusable components
│   │   └── PostCard.js         # Individual post display
│   ├── context/                # React Context
│   │   └── AuthContext.js      # Authentication state (Supabase Auth)
│   ├── services/               # External services
│   │   └── supabaseConfig.js   # Supabase configuration (needs user credentials)
│   ├── utils/                  # Utility functions
│   │   └── timeAgo.js          # Timestamp formatting
│   └── navigation/             # Navigation setup
│       ├── AuthStack.js        # Auth screens navigation
│       ├── AppStack.js         # Main app tabs navigation
│       └── index.js            # Root navigator
├── assets/                     # Images and static files
├── package.json
└── README.md                   # Comprehensive Supabase setup guide
```

### Frontend Architecture

**Framework**: React Native with Expo SDK 54
- Cross-platform mobile development (iOS, Android, Web)
- React 19.1.0 for modern component patterns
- Expo provides development workflow and built-in modules

**Navigation**: React Navigation 7
- AuthStack: Login and Register screens (Native Stack Navigator)
- AppStack: Feed, CreatePost, and Profile screens (Bottom Tab Navigator)
- Conditional rendering based on authentication state

**State Management**: React Context API
- AuthContext for global authentication state
- Local component state for screen-specific data
- No additional state management library

**UI/UX Design**:
- Instagram-inspired minimal design
- Blue accent color (#0095f6)
- Bottom tab navigation
- Pull-to-refresh on feed
- Loading states and form validation

### Backend Architecture

**Supabase Services** (v2.48.1):
- **Authentication**: Email/password authentication flow
- **Database**: PostgreSQL real-time database with Row Level Security (RLS)
- **Storage**: Cloud storage for post images (1GB free!)

**Why Supabase over Firebase**:
- **Free tier is better**: 1GB storage vs Firebase requiring paid plan
- **No credit card required** for free tier
- **PostgreSQL**: More powerful than Firestore for complex queries
- **Real-time subscriptions**: Built-in websocket support
- **Row Level Security**: Database-level security policies

**Data Tables**:
- `users`: User profile information (id, name, email, created_at)
- `posts`: Post documents (id, user_id, author_name, content, image_url, created_at)

**Database Schema** (PostgreSQL with snake_case):
```sql
users {
  id: uuid (references auth.users),
  name: text,
  email: text,
  created_at: timestamp
}

posts {
  id: bigserial,
  user_id: uuid (references auth.users),
  author_name: text,
  content: text,
  image_url: text,
  created_at: timestamp
}
```

**Persistent Sessions**: AsyncStorage for local session persistence

### Key Dependencies

- `expo` (~54.0.23)
- `react-native` (0.81.5)
- `react-native-web` (0.21.0)
- `@supabase/supabase-js` (^2.48.1)
- `@react-navigation/native` (^7.1.19)
- `@react-navigation/bottom-tabs` (^7.8.4)
- `@react-navigation/native-stack` (^7.6.2)
- `expo-image-picker` (^17.0.8)
- `@react-native-async-storage/async-storage` (^1.24.0)

### Workflow Configuration

**Name**: Framez App
**Command**: `cd framez && npm run web`
**Port**: 5000
**Type**: Web preview
**Status**: Running

### Next Steps for User

1. **Configure Supabase**:
   - Create free Supabase project at app.supabase.com
   - Get Project URL and anon key from Project Settings > API
   - Update credentials in `framez/app/services/supabaseConfig.js`
   - Follow README.md for complete SQL setup instructions

2. **Set Up Database Tables**:
   - Run SQL commands in Supabase Dashboard > SQL Editor
   - Create `users` table with RLS policies
   - Create `posts` table with RLS policies
   - Enable realtime for `posts` table

3. **Set Up Storage**:
   - Create `posts` bucket in Supabase Storage
   - Configure public read access policy
   - Allow authenticated users to upload

4. **Enable Email Authentication**:
   - Go to Authentication > Providers
   - Enable Email provider
   - Turn off "Confirm email" for instant signups (testing)

5. **Testing**:
   - Test registration flow
   - Test login/logout
   - Create posts with text and images
   - Verify feed displays all posts
   - Check profile shows user's posts only

6. **Deployment**:
   - Use Expo Go for mobile testing (scan QR code from `npm start`)
   - Deploy to Appetize.io for web-based demo
   - Create demo video showing all features

7. **Submission**:
   - Push code to GitHub
   - Record 2-3 minute demo video
   - Upload to Appetize.io
   - Submit via provided form

### Important Notes

- Supabase credentials are placeholders - user must add their own
- App runs on web (localhost:5000) but is designed for mobile
- Image picker works on mobile and web
- Real-time updates require internet connection
- Some dependency version warnings are present but don't affect functionality
- Supabase anon key is safe to expose client-side (security via RLS policies)
- PostgreSQL uses snake_case (created_at) vs Firestore's camelCase (createdAt)

### Database Design Choice

Using PostgreSQL (Supabase) instead of Firestore (Firebase):
- Snake_case field names: `created_at`, `author_name`, `image_url`, `user_id`
- Auto-incrementing IDs for posts (bigserial)
- Row Level Security policies instead of Firestore rules
- Real-time subscriptions with websockets
- More powerful query capabilities

### Submission Deadline

November 12, 2025
