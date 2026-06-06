export const Colors = {
  background: '#0D0D0D', // bg-dark
  surface: '#1A1A1A', // bg-surface
  surfaceRaised: '#262626', // bg-surface-raised
  primary: '#00D4FF', // cyan-primary
  primaryDark: '#0099CC',
  primaryLight: '#66E5FF',
  secondary: '#FBBF24', // warning
  success: '#34D399',
  error: '#EF4444',
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textMuted: '#737373',
  border: '#262626',
  scanGlow: 'rgba(0, 212, 255, 0.15)',
  overlayBg: 'rgba(0, 0, 0, 0.65)',
  flashOn: '#FFD700',
};

export const Spacing = {
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space5: 20,
  space6: 24,
  space8: 32,
  space10: 40,
  space12: 48,
  
  // Aliases for convenience
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 999,
};

export const Typography = {
  display: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  title1: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  title2: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  body1Bold: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 22,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  scanCount: {
    fontSize: 48,
    fontWeight: '700' as const,
    lineHeight: 56,
  },
};
