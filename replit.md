# Framez - Mobile Social Media Application

## Overview

Framez is a mobile social media application built with React Native (Expo) for a Stage 4 Frontend Development task. The app allows users to share posts with text and images, featuring user authentication, a global feed of posts, and individual user profiles. The application follows an Instagram-inspired design pattern.

**Current Status**: ✅ Fully set up and running on Replit
- App is accessible at http://localhost:5000 (Expo web)
- Workflow configured and running successfully
- All core features implemented
- Firebase integration configured (requires user's credentials)

## Recent Changes (November 11, 2025)

- Initial Expo project setup with React Native
- Implemented complete authentication system (Login/Register)
- Created Feed, CreatePost, and Profile screens
- Integrated Firebase Authentication, Firestore, and Storage
- Set up React Navigation with Auth and App stacks
- Configured Expo web workflow on port 5000
- Added comprehensive README with setup instructions

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
│   │   ├── FeedScreen.js       # All posts feed
│   │   ├── CreatePostScreen.js # Create new post
│   │   └── ProfileScreen.js    # User profile
│   ├── components/             # Reusable components
│   │   └── PostCard.js         # Individual post display
│   ├── context/                # React Context
│   │   └── AuthContext.js      # Authentication state management
│   ├── services/               # External services
│   │   └── firebaseConfig.js   # Firebase configuration (needs user credentials)
│   ├── utils/                  # Utility functions
│   │   └── timeAgo.js          # Timestamp formatting
│   └── navigation/             # Navigation setup
│       ├── AuthStack.js        # Auth screens navigation
│       ├── AppStack.js         # Main app tabs navigation
│       └── index.js            # Root navigator
├── assets/                     # Images and static files
├── package.json
└── README.md                   # Comprehensive setup guide
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

**Firebase Services** (v12.5.0):
- **Authentication**: Email/password authentication flow
- **Firestore**: Real-time NoSQL database with onSnapshot listeners
- **Storage**: Cloud storage for post images

**Data Collections**:
- `users`: User profile information (uid, name, email, createdAt)
- `posts`: Post documents (userId, authorName, content, imageUrl, timestamp)

**Persistent Sessions**: AsyncStorage for local session persistence

### Key Dependencies

- `expo` (~54.0.23)
- `react-native` (0.81.5)
- `react-native-web` (0.21.0)
- `firebase` (^12.5.0)
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

1. **Configure Firebase**:
   - Create Firebase project at console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Update credentials in `framez/app/services/firebaseConfig.js`
   - Set up Firestore and Storage security rules (see README.md)

2. **Testing**:
   - Test registration flow
   - Test login/logout
   - Create posts with text and images
   - Verify feed displays all posts
   - Check profile shows user's posts only

3. **Deployment**:
   - Use Expo Go for mobile testing (scan QR code from `npm start`)
   - Deploy to Appetize.io for web-based demo
   - Create demo video showing all features

4. **Submission**:
   - Push code to GitHub
   - Record 2-3 minute demo video
   - Upload to Appetize.io
   - Submit via provided form

### Important Notes

- Firebase credentials are placeholders - user must add their own
- App runs on web (localhost:5000) but is designed for mobile
- Image picker works on mobile and web
- Real-time updates require internet connection
- Some dependency version warnings are present but don't affect functionality