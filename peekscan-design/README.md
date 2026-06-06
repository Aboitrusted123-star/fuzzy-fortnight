# PeekScan Design System & UI/UX

Complete design deliverables for the PeekScan mobile app — a barcode/QR code scanner that reads through tape, seals, stickers, and shrink wrap.

## Design Philosophy

PeekScan is designed for **warehouse and logistics workers** in fast-paced, low-light environments. Every design decision prioritizes:

- **Speed** — minimal taps to scan, auto-detect, instant results
- **Glove-friendly** — 48px+ minimum tap targets, generous spacing
- **High contrast** — readable in bright warehouse lights and dim storage areas
- **Industrial aesthetic** — dark mode default, cyan accents, no visual fluff

## Deliverables

### 📐 User Flows
- **File:** [`flows/user-flows.md`](flows/user-flows.md)
- **Flow 1:** Free Trial → Scan → Upgrade (complete user journey)
- **Flow 2:** Scan Error Handling (error recovery paths)
- **Flow 3:** Settings & Configuration
- **Flow 4:** Scan History

### 📝 Wireframes
- **File:** [`wireframes/screen-wireframes.md`](wireframes/screen-wireframes.md)
- 6 screens documented with ASCII wireframes and annotations:
  1. Camera Viewfinder (main screen)
  2. Scan Result
  3. Upgrade / Purchase
  4. Scan History
  5. Settings
  6. Error / Obscured Code

### 🎨 High-Fidelity Mockups

| Screen | Image | Notes |
|--------|-------|-------|
| Camera Viewfinder | [`mockups/camera-viewfinder.png`](mockups/camera-viewfinder.png) | Live preview, scan guides, status, free tier counter |
| Scan Result | [`mockups/scan-result.png`](mockups/scan-result.png) | Success state with decoded data + actions |
| Scan History | [`mockups/scan-history.png`](mockups/scan-history.png) | Grouped by time with scan items |
| Settings | [`mockups/settings-screen.png`](mockups/settings-screen.png) | Full settings hierarchy |
| Upgrade Screen | [`mockups/upgrade-screen.png`](mockups/upgrade-screen.png) | Pricing cards + CTA |
| Error/Obscured | [`mockups/error-obscured.png`](mockups/error-obscured.png) | Error state with suggestions |
| Onboarding | [`mockups/onboarding-screen.png`](mockups/onboarding-screen.png) | First onboarding slide |

### 🏷️ Logo & Brand
- **Logo:** [`logo/peekscan-logo.png`](logo/peekscan-logo.png) — eye/scan-icon mark
- **Brand Guide:** [`brand/logo-concept.md`](brand/logo-concept.md)
- **Design System:** [`brand/design-system.md`](brand/design-system.md)

### 📐 Design System Specs
**File:** [`brand/design-system.md`](brand/design-system.md)

Complete token system covering:
- **Colors:** Primary (cyan #00D4FF), backgrounds, text, status, functional colors
- **Typography:** Inter + JetBrains Mono, 8-level type scale
- **Spacing:** 4px grid, 13 spacing tokens
- **Corner Radius:** 4 levels (sm/md/lg/full)
- **Iconography:** Line style, 2px stroke, 24×24 default, 15+ core icons
- **Shadows:** 4 elevation levels + scan glow
- **Animation:** Timing tokens for transitions, pulses, feedback

## Screen Map

```
App Launch
  └→ Onboarding (3 slides, first-timers only)
      └→ Camera Viewfinder ←── MAIN SCREEN
          ├→ Scan Result
          │   ├→ Copy / Share / Save
          │   └→ Error (retry / manual entry / save photo)
          ├→ Scan History (list → detail)
          ├→ Settings
          │   └→ Account → Upgrade / Enterprise / Restore
          └→ Upgrade Screen (also shown at scan limit)
```

## Usage for Mobile App Engineer

The design system tokens map directly to React Native `StyleSheet` constants. Key patterns:

```js
// Colors
const colors = {
  cyan: '#00D4FF',
  bgDark: '#0D0D0D',
  bgSurface: '#1A1A1A',
  textPrimary: '#FFFFFF',
  success: '#34D399',
  error: '#EF4444',
};

// Spacing (4px grid)
const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

// Tap targets
const MIN_TAP_TARGET = 48; // px - glove-friendly
```

## Key UX Patterns

1. **Auto-scan is default** — no tap-to-scan button required. Point and it reads.
2. **Scan count visible always** — free tier users see their remaining scans prominently.
3. **Error recovery is guided** — specific suggestions (flash, focus, distance) rather than generic "try again."
4. **One-tap copy** — scan result shows data immediately with copy as primary action.
5. **Dark mode default** — saves battery on OLED phones, better in dim warehouses.