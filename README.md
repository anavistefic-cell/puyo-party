# Puyo Party: Android APK project

## Easiest: build the APK in the cloud (no Android tools needed)
1. Create a free GitHub repository and upload everything in this folder (keep the `.github` folder).
2. Open the repo's **Actions** tab, choose **Build Android APK**, press **Run workflow**.
3. When it finishes (about 5 minutes), download **puyo-party-apk** from the run page and unzip it to get `app-debug.apk`.
4. Copy the APK to your phone and install it. Android will ask you to allow installs from unknown sources.

## Build on your own computer
Needs Node 18+, JDK 17 and Android Studio.
    npm install
    npm run css
    npx cap add android
    npx cap open android      # then Build > Build APK(s) in Android Studio

## Controls
- Touch pads: left, down, right, rotate, hard drop, pause.
- Bluetooth/USB gamepad: D-pad or left stick moves, A/X rotates, B/Y hard drops. Press any button once so Android detects it.
- Menu: choose mode, players and heroes by tapping.
