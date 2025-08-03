# CI/CD Setup Guide

This guide will help you set up the CI/CD pipeline for your Big Red Button app.

## Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Expo Account**: You need an Expo account with EAS access
3. **Google Play Console**: For Android app publishing (optional)
4. **Apple Developer Account**: For iOS app publishing (optional)

## Required Secrets

Add these secrets to your GitHub repository settings:

### Go to: Repository Settings → Secrets and variables → Actions

#### Required Secrets:

1. **EXPO_TOKEN**
   - Go to https://expo.dev/accounts/[username]/settings/access-tokens
   - Create a new token with appropriate permissions
   - Copy the token and add it as `EXPO_TOKEN` secret

#### Optional Secrets (for advanced features):

2. **CODECOV_TOKEN** (for code coverage reporting)
   - Sign up at https://codecov.io
   - Connect your GitHub repository
   - Copy the token and add it as `CODECOV_TOKEN` secret

## Workflow Overview

### 1. **Pull Request Checks** (`.github/workflows/pr-checks.yml`)
Runs on every pull request:
- ✅ Validates PR changes
- 🔒 Security audit
- 🧪 Tests on multiple Node.js versions
- 📱 Validates Expo configuration
- 📊 Checks bundle size

### 2. **Build and Deploy** (`.github/workflows/build-and-deploy.yml`)
Runs based on branch:

#### On Pull Requests:
- 🧪 Runs tests and linting
- 🚀 Builds preview APK (Android only)

#### On `main` branch push:
- 🧪 Runs tests and linting
- 🚀 Builds production apps (Android + iOS)
- 📢 Notifies build status

#### On `develop` branch push:
- 🧪 Runs tests and linting
- 📱 Publishes OTA (Over-The-Air) update

## Branch Strategy

### Recommended Git Flow:

```
main (production)
├── develop (staging)
│   ├── feature/new-animation
│   ├── feature/sound-effects
│   └── bugfix/button-timing
```

### Branch Purposes:

- **`main`**: Production-ready code, triggers production builds
- **`develop`**: Integration branch, triggers OTA updates
- **`feature/*`**: New features, triggers PR checks
- **`bugfix/*`**: Bug fixes, triggers PR checks

## Setup Steps

### 1. Enable GitHub Actions
1. Go to your repository
2. Click on "Actions" tab
3. GitHub Actions should be enabled by default

### 2. Add Expo Token
1. Get your Expo token from https://expo.dev/accounts/[username]/settings/access-tokens
2. Go to Repository Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `EXPO_TOKEN`
5. Value: Your Expo token
6. Click "Add secret"

### 3. Configure EAS (if not done already)
```bash
cd src/bigredbutton
npx eas login
npx eas build:configure
```

### 4. Test the Pipeline
1. Create a new branch: `git checkout -b feature/test-ci`
2. Make a small change to README.md
3. Commit and push: `git add . && git commit -m "Test CI" && git push origin feature/test-ci`
4. Create a pull request
5. Watch the CI/CD pipeline run!

## Pipeline Features

### 🧪 **Testing**
- Unit tests with Jest
- TypeScript type checking
- Code coverage reporting
- Multiple Node.js version compatibility

### 🔍 **Code Quality**
- ESLint for code style
- Security vulnerability scanning
- Bundle size monitoring
- Expo configuration validation

### 🚀 **Building**
- Preview builds for PRs
- Production builds for releases
- Both Android and iOS support
- Automatic version incrementing

### 📱 **Deployment**
- OTA updates for quick fixes
- Production builds for app stores
- Automatic notifications
- Build artifact management

## Customization

### Modify Build Triggers
Edit `.github/workflows/build-and-deploy.yml`:

```yaml
on:
  push:
    branches: [main, develop, staging]  # Add your branches
  pull_request:
    branches: [main]
```

### Change Test Coverage Requirements
Edit `package.json`:

```json
"coverageThreshold": {
  "global": {
    "branches": 80,    # Increase for stricter requirements
    "functions": 80,
    "lines": 80,
    "statements": 80
  }
}
```

### Add More Platforms
Edit the build matrix in `.github/workflows/build-and-deploy.yml`:

```yaml
strategy:
  matrix:
    platform: [android, ios, web]  # Add web builds
```

## Troubleshooting

### Common Issues:

1. **"EXPO_TOKEN not found"**
   - Make sure you added the secret correctly
   - Check the secret name matches exactly

2. **"Build failed"**
   - Check EAS configuration in `eas.json`
   - Verify your Expo account has build credits

3. **"Tests failing"**
   - Run tests locally first: `npm test`
   - Check test dependencies are installed

4. **"Lint errors"**
   - Run locally: `npm run lint:fix`
   - Fix any remaining issues manually

### Getting Help:

1. Check GitHub Actions logs for detailed error messages
2. Review Expo build logs in your Expo dashboard
3. Consult the [EAS Build documentation](https://docs.expo.dev/build/introduction/)

## Next Steps

Once your CI/CD is working:

1. **Add more tests** to increase coverage
2. **Set up notifications** (Slack, Discord, email)
3. **Add deployment to app stores** (Google Play, App Store)
4. **Configure staging environments**
5. **Add performance monitoring**

Your Big Red Button app now has professional-grade CI/CD! 🎉
