# 🔴 Big Red Button

A fun and satisfying React Native app featuring a big red button that triggers an explosive countdown experience!

## 📱 Features

- **Interactive Big Red Button**: Tap to activate with satisfying press animation
- **Dramatic Countdown**: 3-2-1 countdown with scaling animations
- **Explosive Effects**: Particle explosion animation with 8 animated particles
- **Custom Icon**: Beautiful 3D-style red button app icon
- **Smooth Animations**: Built with React Native Animated API for fluid motion
- **TypeScript**: Fully typed for better development experience

## 🎮 How It Works

1. **Initial State**: Shows the big red button with "PRESS ME!" text
2. **Button Press**: Tap the button to trigger the countdown sequence
3. **Countdown**: Watch the dramatic 3-2-1 countdown with animations
4. **Explosion**: Enjoy the particle explosion effect
5. **Reset**: Automatically returns to initial state for another press

## 🛠️ Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build service
- **TypeScript**: Type-safe JavaScript
- **React Native Animated**: Smooth animations and transitions
- **EAS Build**: Production-ready app builds

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd big-red-button/src/bigredbutton
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on device/emulator:
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app

## 📦 Building for Production

### Android APK (Preview)
```bash
eas build --platform android --profile preview
```

### Android AAB (Production)
```bash
eas build --platform android --profile production
```

### iOS
```bash
eas build --platform ios --profile production
```

## 🎨 App Icon

The app features a custom-designed red button icon created programmatically with:
- Radial gradient (bright red to dark red)
- 3D highlight effects
- Professional shadows and borders
- "PRESS ME!" text on larger sizes
- Multiple sizes for different use cases

## 📁 Project Structure

```
src/bigredbutton/
├── App.tsx              # Main app component
├── app.json             # Expo configuration
├── eas.json             # EAS Build configuration
├── package.json         # Dependencies and scripts
├── assets/              # App icons and images
│   ├── icon.png         # Main app icon (1024x1024)
│   ├── adaptive-icon.png # Android adaptive icon
│   ├── splash-icon.png  # Splash screen icon
│   └── favicon.png      # Web favicon
└── README.md           # This file
```

## 🎯 App States

The app uses a simple state machine with four states:

- `INITIAL`: Shows the red button ready to press
- `COUNTDOWN`: Displays 3-2-1 countdown animation
- `EXPLOSION`: Shows particle explosion effects
- `RESET`: Brief transition back to initial state

## 🎨 Animations

### Button Press Animation
- Scale animation from 1.0 to 0.95 and back
- Smooth spring animation for natural feel

### Countdown Animation
- Each number scales from 0.5 to 1.2 to 1.0
- Fade in/out effects for smooth transitions

### Explosion Animation
- 8 particles animated simultaneously
- Random directions and distances
- Opacity fade out over 2 seconds
- Automatic reset after completion

## 📱 Supported Platforms

- ✅ Android (API 21+)
- ✅ iOS (iOS 11+)
- ✅ Web (via Expo Web)

## 🏪 Google Play Store

The app is ready for Google Play Store submission with:
- Production-ready AAB build
- Custom app icon
- Proper app configuration
- No sensitive permissions required
- Entertainment category suitable

### Store Listing Info
- **Category**: Entertainment
- **Content Rating**: Everyone
- **Permissions**: None required
- **Size**: ~10MB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- None currently reported

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review existing GitHub issues
3. Create a new issue with detailed description

---

**Made with ❤️ and a lot of button pressing!** 🔴💥
