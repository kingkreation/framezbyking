# Framez 📱

A mobile social media application built with React Native and Firebase for Stage 4 Frontend Development Task.

## Features

- ✅ **User Authentication**: Secure sign-up, login, and logout using Firebase Authentication
- ✅ **Persistent Sessions**: Users remain logged in after closing and reopening the app
- ✅ **Create Posts**: Share text and/or image posts
- ✅ **Feed**: View all posts from users in chronological order
- ✅ **Profile**: View user information and personal posts
- ✅ **Real-time Updates**: Posts update automatically using Firestore real-time listeners

## Tech Stack

### Frontend
- **React Native** (Expo SDK 54)
- **React Navigation** - Screen navigation with bottom tabs
- **Expo Image Picker** - Upload images from device
- **AsyncStorage** - Persistent local storage for sessions

### Backend
- **Firebase Authentication** - User registration and login
- **Firestore Database** - Real-time NoSQL database for posts and user data
- **Firebase Storage** - Cloud storage for post images

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
│   │   └── firebaseConfig.js   # Firebase configuration
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

3. **Configure Firebase**
   
   a. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   
   b. Enable the following services:
      - Authentication (Email/Password provider)
      - Firestore Database
      - Storage
   
   c. Get your Firebase configuration from Project Settings
   
   d. Update `app/services/firebaseConfig.js` with your credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Set up Firestore Security Rules**
   
   In Firebase Console > Firestore Database > Rules, add:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
       match /posts/{postId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null;
         allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
       }
     }
   }
   ```

5. **Set up Storage Security Rules**
   
   In Firebase Console > Storage > Rules, add:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /posts/{allPaths=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null;
       }
     }
   }
   ```

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

### Users Collection
```javascript
{
  uid: string,
  name: string,
  email: string,
  createdAt: timestamp
}
```

### Posts Collection
```javascript
{
  id: string,
  userId: string,
  authorName: string,
  content: string,
  imageUrl: string | null,
  timestamp: string (ISO 8601)
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

## Known Issues

- Image upload on web may have CORS issues in production (works fine in development)
- Some dependencies show version warnings but don't affect functionality

## Future Enhancements

- Add comments on posts
- Add likes/reactions
- Add user avatars
- Add post deletion
- Add image filters
- Add push notifications
- Add user search
- Add follow/unfollow functionality

## Credits

Built by [Your Name] for Stage 4 Frontend Development Task

## License

This project is open source and available under the MIT License.
