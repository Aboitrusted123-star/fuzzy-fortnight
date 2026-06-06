# PeekScan Screen Wireframes

## Screen 1: Camera Viewfinder (Main Screen)

```
┌────────────────────────────────┐
│  ● LIVE    ⚡    🔍    🔦   🔎 │  <- Top bar (status + quick toggles)
│                                │
│   ┌────────────────────────┐   │
│   │                        │   │
│   │   ┌────────────────┐   │   │  <- Camera preview area
│   │   │  ┌──┐          │   │   │
│   │   │  │  │  ┌──┐    │   │   │  <- Dimmed overlay outside
│   │   │  └──┘  │  │    │   │   │     scan area
│   │   │        └──┘    │   │   │
│   │   └────────────────┘   │   │
│   │                        │   │
│   └────────────────────────┘   │
│                                │
│  ┌─── SCANNING ────────────┐  │  <- Status indicator
│  │  Hold steady...         │  │
│  └──────────────────────────┘  │
│                                │
│  ▓▓▓▓▓▓▓░░░░░ 4 of 5 scans   │  <- Free tier counter
│                                │
│  [📷]  [⚙️]  [📋]              │  <- Bottom nav
└────────────────────────────────┘

Dimensions: 390×844 (iPhone 14 size)
Key elements:
- Camera preview fills most of screen
- Dimmed overlay with bright scan frame
- Pulsing horizontal scan line
- 4 corner brackets in #00D4FF
- Bottom: scan counter shows remaining
- Quick settings accessible from top bar
```

## Screen 2: Scan Result

```
┌────────────────────────────────┐
│  ← Back                        │
│                                │
│         ✓                      │  <- Green success checkmark
│    "Code Found!"               │
│                                │
│    ┌──────────────────┐       │
│    │  9781234567890   │       │  <- Barcode value (large)
│    │    [UPC-A]       │       │
│    └──────────────────┘       │
│                                │
│    ┌──────────────────┐       │
│    │                  │       │  <- Thumbnail preview
│    │   (barcode img)  │       │     of scanned code
│    │                  │       │
│    └──────────────────┘       │
│                                │
│   Time: 2:34 PM               │  <- Timestamp
│                                │
│   ┌──────────────────────┐   │
│   │  📋 Copy Code         │   │  <- Outline button
│   └──────────────────────┘   │
│   ┌──────────────────────┐   │
│   │  ↗️ Share              │   │  <- Filled button
│   └──────────────────────┘   │
│                                │
│       [Save to History]       │  <- Text link
│                                │
└────────────────────────────────┘

States:
- Success: Green check + code display + actions
- Partial: Orange warning + "Enhancing..." + retry option
- Error: Red X + "Could not read code" + retry + manual entry
```

## Screen 3: Upgrade / Purchase

```
┌────────────────────────────────┐
│  ← Back                        │
│                                │
│        🔒 Pro                  │  <- Lock icon + badge
│                                │
│   Upgrade to PeekScan Pro      │
│                                │
│   ✓ Unlimited scans            │
│   ✓ Priority support           │
│   ✓ Advanced processing        │
│   ✓ No ads - ever              │
│                                │
│   ┌────────┐  ┌────────────┐  │
│   │$4.99   │  │$10/seat/mo │  │  <- Two pricing cards
│   │One-time│  │Enterprise  │  │
│   │        │  │🏷️ Best for │  │
│   │  POPULAR│  │  teams    │  │
│   └────────┘  └────────────┘  │
│                                │
│   ┌──────────────────────┐   │
│   │  Get Pro - $4.99     │   │  <- CTA button (cyan)
│   └──────────────────────┘   │
│                                │
│       [Restore Purchases]     │  <- Text link
│       [Contact Sales]         │
│                                │
│   "Secure payment via Apple   │
│    App Store / Google Play"   │
└────────────────────────────────┘

Free tier limit reached variant:
- Shows "You've used all 5 free scans today"
- Greyed out camera preview behind
- Same CTA but urgency added
```

## Screen 4: Scan History

```
┌────────────────────────────────┐
│  ← Back   Scan History    🔍  │
│                                │
│  TODAY                         │  <- Section header
│                                │
│  ┌────────────────────────┐  │
│  │ [█] 9781234567890    › │  │  <- Scan item
│  │      2:34 PM · UPC-A  │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ [█] 4901234567890    › │  │
│  │      1:15 PM · QR     │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ [█] 6901234567890    › │  │
│  │      10:02 AM · CODE128│  │
│  └────────────────────────┘  │
│                                │
│  YESTERDAY                     │  <- Section header
│                                │
│  ┌────────────────────────┐  │
│  │ [█] 9780987654321    › │  │
│  │      5:20 PM · EAN-13 │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ [█] QR-CONTENT-01    › │  │
│  │      3:45 PM · QR     │  │
│  └────────────────────────┘  │
│                                │
└────────────────────────────────┘

Tap item → Detail view with:
- Full barcode value (copyable)
- Timestamp
- Scanned image thumbnail
- Actions: Copy, Share, Delete
- Long press for quick copy
```

## Screen 5: Settings

```
┌────────────────────────────────┐
│  ← Back   Settings             │
│                                │
│  SCAN SETTINGS                 │  <- Section header
│  ┌────────────────────────┐  │
│  │ ⚡ Flash              ›│  │  <- Auto (default)
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🔍 Focus              ›│  │  <- Auto (default)
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🔉 Beep on Scan   [🔘]│  │  <- Toggle ON
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 📳 Vibrate on Scan [🔘]│  │  <- Toggle ON
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🔲 Scan Area Guides [🔘]│  │  <- Toggle ON
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🔎 Zoom       ──────●─│  │  <- Slider
│  └────────────────────────┘  │
│                                │
│  DISPLAY                       │
│  ┌────────────────────────┐  │
│  │ 🌙 Theme              ›│  │  <- Dark
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🔠 Font Size          ›│  │  <- Medium
│  └────────────────────────┘  │
│                                │
│  ACCOUNT                       │
│  ┌────────────────────────┐  │
│  │ ⭐ Upgrade to Pro     ›│  │  <- With star icon
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🏢 Enterprise         ›│  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🔄 Restore Purchases  ›│  │
│  └────────────────────────┘  │
│                                │
│  ABOUT                         │
│  ┌────────────────────────┐  │
│  │ ℹ️ Version      1.0.0  │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 📄 Privacy Policy     ›│  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 📋 Terms of Service   ›│  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 💬 Contact Support    ›│  │
│  └────────────────────────┘  │
│                                │
└────────────────────────────────┘
```

## Screen 6: Error / Obscured Code

```
┌────────────────────────────────┐
│  ← Back                        │
│                                │
│         ✗                      │  <- Red error X
│    "Code Obscured"             │
│                                │
│   The barcode could not be     │
│   read through the covering.   │
│                                │
│   ┌──────────────────────┐   │
│   │  Try adjusting light  │   │  <- Suggestion chips
│   └──────────────────────┘   │
│   ┌──────────────────────┐   │
│   │  Toggle flash on      │   │
│   └──────────────────────┘   │
│   ┌──────────────────────┐   │
│   │  Move closer/farther  │   │
│   └──────────────────────┘   │
│   ┌──────────────────────┐   │
│   │  Use manual focus     │   │
│   └──────────────────────┘   │
│                                │
│   ┌──────────────────────┐   │
│   │  🔄 Retry             │   │  <- Retry button
│   └──────────────────────┘   │
│   ┌──────────────────────┐   │
│   │  ✏️ Enter Manually    │   │  <- Manual entry
│   └──────────────────────┘   │
│   ┌──────────────────────┐   │
│   │  📸 Save Photo        │   │  <- Save for later
│   └──────────────────────┘   │
│                                │
└────────────────────────────────┘
```