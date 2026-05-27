// Design Tokens for AIR Design System
// Based on 8pt grid system with Arabic-first typography

export const colors = {
    brand: {
        primary: '#2B6CF0',
        primaryHover: '#1D5BD6',
        primaryLight: '#EBF2FE',
        secondary: '#1E3A8A',
        secondaryHover: '#1E40AF',
    },
    neutral: {
        900: '#0F172A', // Headings
        800: '#1E293B',
        700: '#334155', // Body text
        600: '#475569',
        500: '#64748B', // Muted text
        400: '#94A3B8',
        300: '#CBD5E1', // Borders
        200: '#E2E8F0',
        100: '#F1F5F9', // Light backgrounds
        50: '#F8FAFC',  // Page background
    },
    semantic: {
        success: '#16A34A',
        successLight: '#DCFCE7',
        warning: '#F59E0B',
        warningLight: '#FEF3C7',
        error: '#DC2626',
        errorLight: '#FEE2E2',
        info: '#0EA5E9',
        infoLight: '#E0F2FE',
    },
} as const;

export const typography = {
    fontFamily: {
        arabic: ['Cairo', 'IBM Plex Sans Arabic', 'sans-serif'],
        latin: ['Inter', 'system-ui', 'sans-serif'],
    },
    fontSize: {
        h1: ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],      // 40px
        h2: ['2rem', { lineHeight: '1.3', fontWeight: '700' }],        // 32px
        h3: ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],      // 24px
        h4: ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],     // 20px
        body: ['1.125rem', { lineHeight: '1.8', fontWeight: '400' }],  // 18px
        bodySmall: ['1rem', { lineHeight: '1.7', fontWeight: '400' }], // 16px
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        small: ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],  // 12px
    },
} as const;

export const spacing = {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    24: '6rem',    // 96px
} as const;

export const borderRadius = {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem',   // 32px
    full: '9999px',
} as const;

export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// Component-specific tokens
export const components = {
    button: {
        minHeight: {
            sm: '36px',
            md: '44px',
            lg: '52px',
        },
        padding: {
            sm: '0.5rem 1rem',
            md: '0.75rem 1.5rem',
            lg: '1rem 2rem',
        },
        borderRadius: borderRadius.lg,
    },
    card: {
        padding: spacing[6],
        borderRadius: borderRadius.xl,
        borderColor: colors.neutral[200],
    },
    input: {
        minHeight: '44px',
        padding: '0.75rem 1rem',
        borderRadius: borderRadius.lg,
        borderColor: colors.neutral[300],
        focusRing: colors.brand.primary,
    },
} as const;

export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;
export type SpacingToken = typeof spacing;
