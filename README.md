# Email Drafts App

A React Native application for managing email drafts with features for creating, editing, and sending emails.

## Features

- Create and manage email drafts
- Real-time email validation
- Save drafts for later
- Send emails
- Search functionality
- Form validation
- User authentication
- Persistent storage

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn
- React Native Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd Emailer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
```

## Dependencies

The project uses the following key dependencies:

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.x",
    "react-native-paper": "^5.x",
    "react-redux": "^8.x",
    "@reduxjs/toolkit": "^1.x",
    "@react-native-async-storage/async-storage": "^1.x",
    "react-native-uuid": "^2.x"
  }
}
```

## Running the App

```bash
npx expo start
# or
yarn expo start
```


## Key Features Implementation

### Email Validation
The app includes comprehensive email validation:
```typescript
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Form Validation
- Required fields validation
- Real-time validation feedback
- Error messaging
- Draft vs Send validation rules

### State Management
The app uses Redux for state management with the following slices:
- User slice for authentication
- Drafts slice for managing email drafts

### Data Persistence
- AsyncStorage for local data storage

## Contact

Email - shettyamman016@gmail.com
Project Link: https://github.com/AmanShetty123/Emailer

## Acknowledgments

- React Native Paper for UI components
- React Navigation for routing
- Redux Toolkit for state management
