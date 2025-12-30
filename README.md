# EcoWatch Frontend

React frontend for the EcoWatch environmental intelligence platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update Firebase config in `src/services/firebase.js`

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

## Build for Production

```bash
npm run build
```

## Deploy to Firebase

1. Login to Firebase:
```bash
firebase login
```

2. Initialize (first time only):
```bash
firebase init hosting
```

3. Deploy:
```bash
npm run deploy
```

Or manually:
```bash
npm run build
firebase deploy --only hosting
```

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL

## Features

- 🗺️ Interactive environmental risk map
- 🤖 AI-powered impact analysis
- ✏️ Petition system with real-time updates
- 📰 Live environmental news feed
- 🔐 Firebase authentication
- 📱 Responsive design