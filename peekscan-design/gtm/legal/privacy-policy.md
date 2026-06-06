# PeekScan Privacy Policy

**Last Updated:** June 3, 2026

## Our Commitment to Privacy

PeekScan is designed with privacy first. We believe scanning a barcode should not require sharing your data. This policy explains exactly what we do — and don't — collect.

## What We Collect

### Camera Access (Required)
PeekScan requires camera access to scan barcodes and QR codes. When you point the camera at a code:
- **Frames are processed entirely on your device.** No images, video, or pixel data is ever sent to our servers or any third party.
- The camera feed is analyzed in real-time using on-device AI. Nothing is recorded, transmitted, or stored.

### Scan History (Local Only)
- Decoded barcode values and timestamps are saved to your device's local storage (`AsyncStorage` on React Native).
- This data never leaves your device unless you explicitly choose to share/copy a result.
- You can clear your scan history at any time from the app settings.

### In-App Purchases
- Payments are processed entirely by Apple (App Store) or Google (Play Store).
- We receive only a transaction receipt to verify your purchase status — no payment details.

## What We Do NOT Collect

- ❌ No account registration or email
- ❌ No location data
- ❌ No analytics or tracking SDKs
- ❌ No crash reporting that sends personal data
- ❌ No advertising identifiers
- ❌ No usage statistics
- ❌ No personal information of any kind

## Third-Party Services

| Service | Purpose | Data Shared |
|---------|---------|-------------|
| Apple App Store | Payment processing for Pro upgrade | Transaction receipt (no personal data) |
| Google Play Store | Payment processing for Pro upgrade | Transaction receipt (no personal data) |
| RevenueCat | Purchase verification | Anonymous app user ID only |

## Data Security
- All processing is local — no data in transit to secure.
- Local storage uses the device's built-in encryption where available (iOS Keychain, Android EncryptedSharedPreferences).

## Your Rights
- **Delete:** Clear scan history anytime from Settings → Clear History.
- **Revoke access:** Disable camera permission in your device settings (app will not function).
- **Export:** Scan history can be exported as CSV from the history screen.

## Children's Privacy
PeekScan does not knowingly collect any data from children under 13. The app is designed for professional/industrial use.

## Changes
If this policy changes materially, we will notify users via the app's next update. We will never add data collection without clear notice.

## Contact
Questions? Email **privacy@peekscan.app**