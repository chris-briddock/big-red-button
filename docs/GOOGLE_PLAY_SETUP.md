# Google Play Store Automated Deployment Setup

This guide will help you set up automated deployment to Google Play Store using EAS Submit and GitHub Actions.

## 📋 Prerequisites

- Google Play Console account
- App already published to Google Play Store (at least once manually)
- EAS Build configured and working

## 🔧 Google Play Console Setup

### 1. Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google Play Android Developer API**
4. Go to **IAM & Admin** → **Service Accounts**
5. Click **Create Service Account**
6. Name it `github-actions-play-store`
7. Click **Create and Continue**
8. Skip role assignment for now
9. Click **Done**

### 2. Generate Service Account Key

1. Click on the created service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Download the JSON file
6. **Keep this file secure!**

### 3. Configure Google Play Console

1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your app
3. Go to **Setup** → **API access**
4. Click **Link** next to your Google Cloud project
5. Go to **Service accounts** section
6. Find your service account and click **Grant access**
7. Set permissions:
   - **App information**: View only
   - **App access**: View only  
   - **Store presence**: View and edit
   - **Pricing & distribution**: View only
   - **App releases**: View and edit
   - **Release management**: View and edit
8. Click **Apply**

## 🔐 GitHub Secrets Setup

Add these secrets to your GitHub repository:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Add **New repository secret**:
   - **Name**: `GOOGLE_SERVICE_ACCOUNT_KEY`
   - **Value**: Paste the entire contents of the downloaded JSON file

## 🚀 Release Tracks

The configuration supports three release tracks:

### Internal Testing (`production` profile)
- **Track**: `internal`
- **Purpose**: Quick testing with internal testers
- **Automatic**: Runs on every main branch push

### Beta Testing (`beta` profile)  
- **Track**: `beta`
- **Purpose**: Wider testing with beta testers
- **Manual**: Trigger manually when ready

### Production (`release` profile)
- **Track**: `production` 
- **Purpose**: Public release
- **Manual**: Trigger manually for production releases

## 📱 Usage

### Automatic Internal Testing
Every push to `main` branch will:
1. Run tests and linting
2. Build preview (Android)
3. Build production (Android)
4. Submit to Google Play Internal Testing track

### Manual Beta Release
```bash
# Build and submit to beta track
eas submit --platform android --profile beta --non-interactive
```

### Manual Production Release
```bash
# Build and submit to production track  
eas submit --platform android --profile release --non-interactive
```

## 🔍 Monitoring

### Check Submission Status
1. Go to Google Play Console
2. Select your app
3. Go to **Testing** → **Internal testing** (or respective track)
4. Check the latest release

### GitHub Actions Logs
- Monitor the **Submit to Google Play Store** job
- Check for any authentication or submission errors

## 🛡️ Security Best Practices

1. **Never commit** the service account JSON file
2. **Rotate keys** regularly (every 90 days recommended)
3. **Use minimal permissions** for the service account
4. **Monitor access logs** in Google Cloud Console

## 🚨 Troubleshooting

### Common Issues

**Authentication Failed**
- Verify `GOOGLE_SERVICE_ACCOUNT_KEY` secret is correct
- Check service account has proper permissions in Play Console

**App Not Found**
- Ensure app is already published to Play Store
- Verify package name matches in `app.json`

**Track Not Available**
- Internal testing track must be set up in Play Console first
- Add at least one internal tester

**Version Code Conflict**
- EAS handles version incrementing automatically
- Check `autoIncrement: true` in `eas.json`

## 📈 Next Steps

1. Set up internal testers in Google Play Console
2. Configure beta testing track for wider testing
3. Set up staged rollouts for production releases
4. Add release notes automation from commit messages
