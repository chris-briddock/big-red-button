#!/bin/bash

# Submit to Google Play Store Script
# Usage: ./scripts/submit-to-play-store.sh [internal|beta|production]

set -e

# Default to internal if no argument provided
TRACK=${1:-internal}

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Big Red Button - Google Play Store Submission${NC}"
echo -e "${BLUE}=================================================${NC}"

# Validate track argument
case $TRACK in
    "internal"|"beta"|"production")
        echo -e "${GREEN}✅ Valid release track: $TRACK${NC}"
        ;;
    *)
        echo -e "${RED}❌ Invalid release track: $TRACK${NC}"
        echo -e "${YELLOW}Valid options: internal, beta, production${NC}"
        exit 1
        ;;
esac

# Map track to EAS profile
case $TRACK in
    "internal")
        PROFILE="production"
        DESCRIPTION="Internal Testing"
        ;;
    "beta")
        PROFILE="beta"
        DESCRIPTION="Beta Testing"
        ;;
    "production")
        PROFILE="release"
        DESCRIPTION="Production Release"
        ;;
esac

echo -e "${BLUE}📋 Submission Details:${NC}"
echo -e "  Track: ${YELLOW}$TRACK${NC}"
echo -e "  Profile: ${YELLOW}$PROFILE${NC}"
echo -e "  Description: ${YELLOW}$DESCRIPTION${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "app.json" ]; then
    echo -e "${RED}❌ Error: app.json not found${NC}"
    echo -e "${YELLOW}Please run this script from the src/bigredbutton directory${NC}"
    exit 1
fi

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo -e "${RED}❌ EAS CLI not found${NC}"
    echo -e "${YELLOW}Installing EAS CLI...${NC}"
    npm install -g eas-cli
fi

# Check authentication
echo -e "${BLUE}🔐 Checking EAS authentication...${NC}"
if ! eas whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not authenticated with EAS${NC}"
    echo -e "${BLUE}Please login to EAS:${NC}"
    eas login
fi

# Show current user
USER=$(eas whoami)
echo -e "${GREEN}✅ Authenticated as: $USER${NC}"

# Confirm submission
echo ""
echo -e "${YELLOW}⚠️  You are about to submit to Google Play Store${NC}"
echo -e "${YELLOW}   Track: $TRACK ($DESCRIPTION)${NC}"
echo ""
read -p "Do you want to continue? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}❌ Submission cancelled${NC}"
    exit 0
fi

# Submit to store
echo -e "${BLUE}🏪 Submitting to Google Play Store...${NC}"
echo -e "${BLUE}This may take several minutes...${NC}"

if eas submit --platform android --profile $PROFILE --non-interactive; then
    echo ""
    echo -e "${GREEN}🎉 Successfully submitted to Google Play Store!${NC}"
    echo -e "${GREEN}   Track: $TRACK ($DESCRIPTION)${NC}"
    echo ""
    echo -e "${BLUE}📱 Next steps:${NC}"
    echo -e "  1. Check Google Play Console for submission status"
    echo -e "  2. Review and approve the release if needed"
    echo -e "  3. Monitor for any issues or feedback"
    echo ""
    echo -e "${BLUE}🔗 Google Play Console:${NC}"
    echo -e "  https://play.google.com/console/"
else
    echo ""
    echo -e "${RED}❌ Submission failed${NC}"
    echo -e "${YELLOW}Check the error messages above for details${NC}"
    exit 1
fi
