# PeekScan Design System

## 1. Color Palette

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `cyan-primary` | `#00D4FF` | Primary actions, active states, brand accent |
| `cyan-dark` | `#0099CC` | Pressed states, dark mode accent |
| `cyan-light` | `#66E5FF` | Hover states, scan glow |

### Background Colors (High-Contrast Mode)
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-dark` | `#0D0D0D` | Main app background (dark mode) |
| `bg-surface` | `#1A1A1A` | Card/surface backgrounds |
| `bg-surface-raised` | `#262626` | Modal, toolbar backgrounds |
| `bg-light` | `#F5F5F0` | Light mode main background |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#FFFFFF` | Primary text (dark mode) |
| `text-secondary` | `#B3B3B3` | Secondary text, labels |
| `text-muted` | `#737373` | Captions, hints |
| `text-light-primary` | `#1A1A1A` | Primary text (light mode) |
| `text-light-secondary` | `#595959` | Secondary text (light mode) |

### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#34D399` | Scan found, checkmark |
| `warning` | `#FBBF24` | Low battery, weak code |
| `error` | `#EF4444` | Scan failed, errors |
| `info` | `#60A5FA` | Tips, information |

### Functional Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `scan-frame` | `#00D4FF` | Viewfinder scan area border |
| `scan-corner` | `#00D4FF` | Corner brackets in viewfinder |
| `scan-glow` | `rgba(0, 212, 255, 0.15)` | Scan area glow effect |
| `overlay-bg` | `rgba(0, 0, 0, 0.65)` | Viewfinder overlay outside scan area |
| `flash-on` | `#FFD700` | Flash indicator |

## 2. Typography

### Font Stack
```
Primary:    Inter (sans-serif) — body, UI elements
Monospace:  JetBrains Mono — code values, barcode data display
```

### Type Scale
| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 32px | Bold (700) | 40px | Scan result value |
| `title-1` | 22px | Bold (700) | 28px | Screen titles |
| `title-2` | 18px | SemiBold (600) | 24px | Section headers |
| `body-1` | 16px | Regular (400) | 22px | Body text |
| `body-1-bold` | 16px | Bold (700) | 22px | Emphasis |
| `body-2` | 14px | Regular (400) | 20px | Secondary text |
| `caption` | 12px | Regular (400) | 16px | Labels, hints |
| `button` | 16px | SemiBold (600) | — | Button labels |
| `scan-count` | 48px | Bold (700) | 56px | Free tier scan count |

## 3. Spacing System

Based on 4px grid:
| Token | Pixels | Usage |
|-------|--------|-------|
| `space-1` | 4px | Micro spacing |
| `space-2` | 8px | Tight spacing |
| `space-3` | 12px | Element padding |
| `space-4` | 16px | Standard padding |
| `space-5` | 20px | Section spacing |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Large spacing |
| `space-10` | 40px | Screen margins |
| `space-12` | 48px | Section margins |

### Minimum Tap Target Size
All interactive elements: **48px × 48px** (glove-friendly)

## 4. Corner Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Small elements, chips |
| `radius-md` | 8px | Cards, input fields |
| `radius-lg` | 12px | Modals, sheets |
| `radius-full` | 999px | Buttons, badges |

## 5. Iconography

### Style
- Line icons, 2px stroke width
- 24×24px default size
- Rounded caps and joins
- Filled variant for active states

### Core Icons
| Icon | Usage |
|------|-------|
| `scan` | Viewfinder / scan action |
| `flash` | Flash toggle |
| `focus` | Manual focus toggle |
| `zoom-in/out` | Zoom controls |
| `history` | Scan history |
| `settings` | Settings gear |
| `star` | Pro/paid features |
| `check-circle` | Success |
| `x-circle` | Error / close |
| `chevron-left` | Back navigation |
| `lock` | Locked pro feature |
| `sun` | Light mode toggle |
| `info` | Information |

## 6. Shadows & Elevation
| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Small elements |
| `shadow-md` | `0 4px 8px rgba(0,0,0,0.4)` | Cards |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Modals |
| `shadow-glow` | `0 0 20px rgba(0,212,255,0.3)` | Scan area glow |

## 7. Animation
| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `fast` | 150ms | ease-out | Toggle, tap feedback |
| `normal` | 250ms | ease-in-out | Transitions, modals |
| `slow` | 400ms | ease-out | Scan found celebration |
| `scan-pulse` | 1.5s | ease-in-out infinite | Scan line animation |