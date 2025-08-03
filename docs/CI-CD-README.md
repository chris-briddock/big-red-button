# 🚀 CI/CD Pipeline for Big Red Button

Your Big Red Button app now has a complete CI/CD pipeline! This document explains what was added and how to use it.

## 📁 What Was Added

### GitHub Actions Workflows
- `.github/workflows/build-and-deploy.yml` - Main CI/CD pipeline
- `.github/workflows/pr-checks.yml` - Pull request validation
- `.github/SETUP.md` - Detailed setup instructions

### Testing Infrastructure
- `__tests__/App.test.tsx` - Unit tests for your app
- `jest.setup.js` - Jest configuration for React Native
- Updated `package.json` with testing scripts and dependencies

### Code Quality Tools
- `.eslintrc.js` - ESLint configuration for TypeScript/React Native
- Enhanced `package.json` with linting and build scripts

## 🎯 Pipeline Features

### 🔄 **Automated Testing**
- ✅ Unit tests with Jest and React Testing Library
- ✅ TypeScript type checking
- ✅ ESLint code quality checks
- ✅ Security vulnerability scanning
- ✅ Code coverage reporting

### 🏗️ **Smart Building**
- 🚀 **Pull Requests**: Preview Android builds
- 🚀 **Main Branch**: Production builds (Android + iOS)
- 🚀 **Develop Branch**: OTA (Over-The-Air) updates

### 📊 **Quality Gates**
- ❌ Blocks merges if tests fail
- ❌ Blocks merges if linting fails
- ❌ Blocks merges if TypeScript errors exist
- ✅ Requires 70% code coverage

## 🚦 How It Works

### Branch Strategy
```
main (production) ← Production builds to app stores
├── develop (staging) ← OTA updates for testing
│   ├── feature/new-animation ← PR checks only
│   ├── feature/sound-effects ← PR checks only
│   └── bugfix/button-timing ← PR checks only
```

### Workflow Triggers

| Event | Action | Result |
|-------|--------|--------|
| PR to `main` | Run tests, lint, build preview | Preview APK |
| Push to `main` | Full pipeline | Production builds |
| Push to `develop` | Tests + OTA update | Live update |
| PR to any branch | Validation checks | Quality report |

## 🛠️ Setup Instructions

### 1. **Required: Add Expo Token**
```bash
# Get your token from: https://expo.dev/accounts/[username]/settings/access-tokens
# Add to GitHub: Repository Settings → Secrets → Actions
# Secret name: EXPO_TOKEN
# Secret value: [your-expo-token]
```

### 2. **Install Dependencies**
```bash
cd src/bigredbutton
npm install
```

### 3. **Test Locally**
```bash
# Run tests
npm test

# Run linting
npm run lint

# Type check
npm run type-check

# Build locally (requires EAS setup)
npm run build:android
```

## 📱 Available Scripts

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios           # Run on iOS

# Testing
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint          # Check code style
npm run lint:fix      # Fix code style issues
npm run type-check    # Check TypeScript types

# Building
npm run build:android # Build Android app
npm run build:ios     # Build iOS app
npm run build:all     # Build both platforms
npm run update        # Publish OTA update
```

## 🧪 Testing

Your app now has comprehensive tests:

### Test Coverage
- ✅ Button rendering and interaction
- ✅ State transitions (Initial → Countdown → Explosion → Reset)
- ✅ Animation timing
- ✅ Accessibility properties
- ✅ Multiple button press handling

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode (for development)
npm run test:watch
```

## 🔍 Code Quality

### ESLint Rules
- TypeScript best practices
- React/React Native specific rules
- Code style consistency
- Performance optimizations
- Accessibility checks

### Fixing Issues
```bash
# Check for issues
npm run lint

# Auto-fix what's possible
npm run lint:fix

# Check TypeScript
npm run type-check
```

## 🚀 Deployment Workflow

### For Features/Bug Fixes:
1. Create branch: `git checkout -b feature/my-feature`
2. Make changes and commit
3. Push: `git push origin feature/my-feature`
4. Create Pull Request
5. ✅ CI runs tests and builds preview
6. Merge after approval

### For Production Release:
1. Merge to `main` branch
2. ✅ CI builds production apps automatically
3. Download from Expo dashboard
4. Upload to Google Play Store / App Store

### For Quick Updates:
1. Merge to `develop` branch
2. ✅ CI publishes OTA update automatically
3. Users get update without app store

## 📊 Monitoring

### Build Status
- Check GitHub Actions tab for build status
- Green ✅ = All good
- Red ❌ = Needs attention

### Coverage Reports
- Automatically generated on each test run
- Uploaded to Codecov (if configured)
- Minimum 70% coverage required

### Build Artifacts
- Preview builds: Available in PR comments
- Production builds: Available in Expo dashboard
- OTA updates: Live immediately

## 🔧 Customization

### Adjust Coverage Requirements
Edit `package.json`:
```json
"coverageThreshold": {
  "global": {
    "branches": 80,  // Increase for stricter requirements
    "functions": 80,
    "lines": 80,
    "statements": 80
  }
}
```

### Add More Platforms
Edit `.github/workflows/build-and-deploy.yml`:
```yaml
strategy:
  matrix:
    platform: [android, ios, web]  # Add web builds
```

### Change Branch Strategy
Edit workflow triggers:
```yaml
on:
  push:
    branches: [main, staging, production]  # Your branches
```

## 🆘 Troubleshooting

### Common Issues:

1. **Tests Failing**
   ```bash
   # Run locally to debug
   npm test
   # Check test output for specific failures
   ```

2. **Build Failing**
   ```bash
   # Check EAS configuration
   npx expo config
   # Verify Expo token is set correctly
   ```

3. **Lint Errors**
   ```bash
   # Auto-fix most issues
   npm run lint:fix
   # Fix remaining issues manually
   ```

## 🎉 Benefits

Your Big Red Button app now has:

- ✅ **Professional Quality**: Automated testing and code quality
- ✅ **Fast Deployment**: Automated builds and OTA updates
- ✅ **Risk Reduction**: Tests catch bugs before users do
- ✅ **Team Collaboration**: PR checks ensure code quality
- ✅ **Scalability**: Easy to add more features and tests

## 📚 Next Steps

1. **Add More Tests**: Increase coverage for edge cases
2. **Set Up Notifications**: Get alerts for build failures
3. **Add Performance Tests**: Monitor app performance
4. **Configure Staging**: Set up staging environment
5. **Add E2E Tests**: Test full user workflows

Your CI/CD pipeline is ready! 🚀 Every code change is now automatically tested, built, and deployed with professional-grade quality assurance.
