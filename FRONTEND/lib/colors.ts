// Color Palette - Light & Dark Mode

export const colors = {
  light: {
    // Primary
    primary: '#4F46E5', // Indigo 600
    primarySoft: '#F5F3FF', // Indigo 50

    // Background & Surface
    background: '#FAFAF9', // Slate 50
    surface: '#FFFFFF',
    surfaceSecondary: '#F1F5F9', // Slate 100

    // Text
    textPrimary: '#1E293B', // Slate 900
    textSecondary: '#64748B', // Slate 500
    textMuted: '#94A3B8', // Slate 400

    // Border
    border: '#E2E8F0', // Slate 200

    // Status colors
    success: '#10B981', // Emerald 500
    warning: '#F59E0B', // Amber 500
    danger: '#EF4444', // Rose 500
    info: '#0EA5E9', // Sky 500
  },

  dark: {
    // Background & Surface
    background: '#020617', // Slate 950
    surface: '#1E293B', // Slate 900
    surfaceSecondary: '#334155', // Slate 700

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8', // Slate 400
    textMuted: '#64748B', // Slate 500

    // Border
    border: '#334155', // Slate 800

    // Primary
    primary: '#4F46E5', // Indigo 600
    primarySoft: '#1E1B4B', // Indigo 950

    // Status colors
    success: '#10B981', // Emerald 500
    warning: '#F59E0B', // Amber 500
    danger: '#EF4444', // Rose 500
    info: '#0EA5E9', // Sky 500
  },
};

export type ColorScheme = keyof typeof colors;
