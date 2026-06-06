# PeekScan Landing Page

A single-page marketing site for PeekScan barcode scanner app — designed for warehouse and logistics professionals.

## Page Layout (top-to-bottom)

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo] PeekScan            Features  Pricing  Download ██  │ ← Nav (sticky)
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │                          │  │     ┌────────────┐       │  │
│  │  SEE THROUGH IT.         │  │     │ (Phone     │       │  │
│  │                          │  │     │  mockup    │       │  │ ← Hero
│  │  Scan barcodes through   │  │     │  with scan │       │  │
│  │  tape, seals, and        │  │     │  glow)     │       │  │
│  │  shrink wrap. No         │  │     └────────────┘       │  │
│  │  peeling required.       │  │                          │  │
│  │                          │  │                          │  │
│  │  [App Store] [Google]    │  │                          │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│  "Codes get covered."     "We see through it."               │ ← Problem/Solution
│                                                              │
│  Every warehouse worker knows the frustration of peeling     │
│  tape to scan a barcode. PeekScan reads right through it.    │
├──────────────────────────────────────────────────────────────┤
│  HOW IT WORKS                                                │ ← 3 Steps
│                                                              │
│   ① Point         ② Process          ③ Done                 │
│   ┌──────────┐   ┌──────────┐       ┌──────────┐           │
│   │ Camera   │   │ AI       │       │ Decoded  │           │
│   │ at code  │──▶│ enhances │──────▶│ result   │           │
│   └──────────┘   │ & reads  │       │ copied   │           │
│                   └──────────┘       └──────────┘           │
├──────────────────────────────────────────────────────────────┤
│  FEATURES                                                    │ ← Features Grid
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │See   │ │Auto  │ │Multi-│ │Dark  │ │One-  │ │100%  │   │
│  │Through│ │Detect│ │Format│ │Mode  │ │Tap   │ │Local │   │
│  │Seals │ │      │ │      │ │      │ │Copy  │ │      │   │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   │
├──────────────────────────────────────────────────────────────┤
│  PRICING                                                     │ ← Pricing
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐              │
│  │  FREE    │  │  PRO     │  │  ENTERPRISE   │              │
│  │  $0      │  │  $4.99   │  │  $10/seat/mo  │              │
│  │          │  │          │  │               │              │
│  │ 5/day    │  │Unlimited │  │Team access    │              │
│  │Basic     │→│Advanced  │  │Dashboard      │              │
│  │          │  │No ads    │  │Priority       │              │
│  └──────────┘  └──────────┘  └──────────────┘              │
├──────────────────────────────────────────────────────────────┤
│  TESTIMONIAL                                                 │
│  "Saved us 30 seconds per scan — hours a week."             │
│  — Warehouse Manager, Midwest Logistics                     │
├──────────────────────────────────────────────────────────────┤
│  Ready to see through it?                                    │ ← CTA
│  [Download on App Store]  [Get it on Google Play]           │
├──────────────────────────────────────────────────────────────┤
│  © 2026 PeekScan  |  Privacy  |  Terms  |  Support           │ ← Footer
└──────────────────────────────────────────────────────────────┘
```

## Design Specs

| Element | Value |
|---------|-------|
| Background | #0D0D0D |
| Surface | #1A1A1A |
| Surface border | #262626 |
| Primary accent | #00D4FF |
| Text primary | #FFFFFF |
| Text secondary | #B3B3B3 |
| Text muted | #737373 |
| Success | #34D399 |
| Font | Inter (system sans-serif) |
| Max content width | 1200px |
| Tap targets (mobile) | 48px minimum |

## Copy

### Hero
- **Headline:** See Through It.
- **Subhead:** Scan barcodes through tape, seals, and shrink wrap. No peeling required.
- **CTA:** Download on the App Store / Get it on Google Play

### Problem/Solution
- **Problem:** "Codes get covered. Tape, seals, shrink wrap — barcodes buried under layers."
- **Solution:** "We see through it. PeekScan's AI reads right through the covering. No peeling. No delay."

### Features
1. **See Through Seals** — Advanced AI reads through tape, stickers, and shrink wrap
2. **Auto-Detect** — No tap needed. Point and scan instantly.
3. **Multi-Format** — UPC, EAN, QR, Code 128, Code 39, and more
4. **Dark Mode** — Easy on the eyes in dim warehouses
5. **One-Tap Copy** — Copy, share, or save in one tap
6. **100% Local** — All processing on-device. Nothing uploaded.