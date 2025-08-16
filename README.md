# Competition Template - Next.js + Firebase

This is a ready-to-use template for competitions featuring a Next.js application with Firebase integration. Perfect for rapid prototyping and development contests.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Firebase account
- Git

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd your-project-name
npm install
```

### 2. Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > General > Your apps
5. Add a web app and copy the config

### 3. Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase config:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## 🛠️ What's Included

### Complete CRUD Operations
✅ **CREATE** - Add new tasks  
✅ **READ** - Fetch and display tasks  
✅ **UPDATE** - Edit task text and toggle completion  
✅ **DELETE** - Remove tasks  

### Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Firebase Firestore** for database
- **Firebase Auth** ready for authentication
- **Real-time updates** between UI and database
- **Responsive design**

### Project Structure
```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main task manager component
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── lib/
│       └── firebase.ts       # Firebase configuration
├── .env.example              # Environment variables template
└── package.json
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Competition Tips

### Quick Customization
1. **Change the data model** in `src/app/page.tsx` (Task interface)
2. **Update Firestore collection name** (currently "tasks")
3. **Modify the UI** components for your specific needs
4. **Add more pages** in `src/app/` directory

### Common Extensions
- Add user authentication with Firebase Auth
- Implement real-time updates with onSnapshot
- Add file upload with Firebase Storage
- Create API routes in `src/app/api/`
- Add more complex data relationships

### Firebase Firestore Rules
For development, use these rules (update for production):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 🚨 Security Notes

- The current setup is for development/competition use
- Update Firebase security rules for production
- Never commit `.env.local` to version control
- Use Firebase Auth for user-specific data in production

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🏆 Perfect for Competitions

This template is specifically designed for:
- Hackathons
- Coding competitions  
- Rapid prototyping
- Demo applications
- Learning projects

Built with ❤️ for developers who want to focus on building great features, not boilerplate setup.
