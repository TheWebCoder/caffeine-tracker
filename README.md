# ☕ Caffeine Tracker

A full-stack web application for monitoring daily caffeine intake with real-time data synchronization. Built with React and Firebase to help users make informed decisions about their caffeine consumption habits.

## 🚀 Live Demo

<a href="https://caffeinetrackr.netlify.app" target="_blank">https://caffeinetrackr.netlify.app</a>


## Overview

Caffeine Tracker is a personal health monitoring tool that allows users to log their caffeine intake throughout the day. The application provides insights into consumption patterns and helps users stay within recommended daily limits. As someone who struggled with managing my own caffeine intake during long coding sessions, I built this app to solve a real problem I was facing.

## ✨ Features

- **Real-time tracking**: Log coffee, tea, energy drinks, and other caffeinated beverages
- **Daily summaries**: Visual representation of caffeine consumption over time
- **User authentication**: Secure login and personalized tracking via Firebase Auth
- **Responsive design**: Seamless experience across desktop and mobile devices
- **Data persistence**: Cloud-based storage with Firebase Firestore
- **Intake history**: View past consumption patterns and trends
- **Quick add presets**: Common beverage types with pre-configured caffeine amounts

## 🛠 Tech Stack

**Frontend:**
- React 18.x
- Vite (build tool)
- CSS3 (custom styling)
- ESLint (code quality)

**Backend & Services:**
- Firebase Authentication
- Cloud Firestore (NoSQL database)
- Firebase Hosting

**Development Tools:**
- Git & GitHub
- npm
- VS Code

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (free tier works fine)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TheWebCoder/caffeine-tracker.git
cd caffeine-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Email/Password provider)
   - Create a Firestore database
   - Copy your Firebase config

4. Create a `firebase.js` file in the root directory:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deployment

Deploy to Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📁 Project Structure

```
caffeine-tracker/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── styles/          # CSS modules
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── firebase.js          # Firebase configuration
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## 💭 Development Process

### Motivation

As a developer, I found myself consuming caffeine throughout the day without tracking how much I was actually taking in. After experiencing sleep issues and jitters, I realized I needed a simple way to monitor my intake. Rather than using a generic notes app, I decided to build a dedicated solution that would also strengthen my React and Firebase skills.

### Design Decisions

**Why React?** React's component-based architecture made it easy to create reusable UI elements like beverage cards and input forms. The virtual DOM ensures smooth performance even with frequent data updates.

**Why Firebase?** Firebase provided a quick way to implement authentication and real-time data sync without building a custom backend. This allowed me to focus on the frontend experience while still having production-ready infrastructure.

**Why Vite?** Vite's lightning-fast hot module replacement significantly improved the development experience compared to Create React App. Build times dropped from 30+ seconds to under 5 seconds.

## 🎯 Challenges & Solutions

### Challenge 1: Real-time Data Synchronization

**Problem:** Initial implementation used REST-like calls to Firebase, causing stale data when multiple tabs were open or when switching between devices.

**Solution:** Implemented Firestore's `onSnapshot` listener to establish real-time subscriptions. This ensures that any changes to caffeine entries are immediately reflected across all connected clients without manual refreshing.

```javascript
useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, 'entries'),
    (snapshot) => {
      const entries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntries(entries);
    }
  );
  return () => unsubscribe();
}, []);
```

### Challenge 2: State Management Complexity

**Problem:** As the app grew, prop drilling became unwieldy. Components three levels deep needed access to user data and caffeine entries.

**Solution:** Implemented React Context API to create a global state management solution. This reduced prop drilling and made the codebase more maintainable. While I considered Redux, Context API provided sufficient functionality for this app's scope.

### Challenge 3: Timestamp Accuracy Across Timezones

**Problem:** Users in different timezones saw incorrect timestamps because I was storing local Date objects, which Firebase converted inconsistently.

**Solution:** Switched to Firebase's `serverTimestamp()` for all entries. This ensures timestamps are consistent and timezone-agnostic. Display logic handles local time conversion on the client side.

### Challenge 4: Mobile Responsiveness

**Problem:** The initial design looked great on desktop but buttons were too small and spacing was cramped on mobile devices.

**Solution:** Adopted a mobile-first CSS approach with fluid typography and touch-friendly tap targets (minimum 44x44px). Used CSS Grid and Flexbox for responsive layouts without media query hell.

## 🔮 Future Enhancements

- [ ] Data visualization with Chart.js showing consumption trends
- [ ] Push notifications when approaching daily caffeine limits
- [ ] Social features: share progress with friends
- [ ] Integration with health apps (Apple Health, Google Fit)
- [ ] Barcode scanner for quick beverage entry
- [ ] Caffeine metabolism calculator based on user body weight
- [ ] Export data as CSV for personal analysis
- [ ] Progressive Web App (PWA) capabilities for offline use

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Bryan G**
- GitHub: [@TheWebCoder](https://github.com/TheWebCoder)

## 🙏 Acknowledgments

- Firebase documentation for excellent guides on authentication and Firestore
- The React community for best practices and patterns
- Coffee for the inspiration (and the problem this app solves)

---

*Built with ☕ and React*
