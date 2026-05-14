import { useColorScheme } from 'react-native';
import { colors } from '@/lib/colors';

/**
 * Custom hook to use color scheme
 * Returns the appropriate color object based on light/dark mode
 */
export const useAppColors = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return isDark ? colors.dark : colors.light;
};

/**
 * Custom hook for role badge color and variant
 */
export const useRoleColors = (role: string): { color: string; variant: 'primary' | 'success' | 'warning' | 'danger' | 'info' } => {
  switch (role) {
    case 'rsm':
      return { color: colors.light.warning, variant: 'primary' };
    case 'salesman':
      return { color: colors.light.info, variant: 'info' };
    case 'sm':
      return { color: colors.light.success, variant: 'success' };
    case 'company_admin':
      return { color: colors.light.danger, variant: 'danger' };
    default:
      return { color: colors.light.primary, variant: 'primary' };
  }
};

/**
 * Custom hook for category badge color and variant
 */
export const useCategoryColors = (category: string): { color: string; variant: 'primary' | 'success' | 'warning' | 'danger' | 'info' } => {
  switch (category.toLowerCase()) {
    case 'agent':
      return { color: colors.light.primary, variant: 'primary' };
    case 'distributor':
      return { color: colors.light.success, variant: 'success' };
    case 'retailer':
      return { color: colors.light.info, variant: 'info' };
    default:
      return { color: colors.light.primary, variant: 'primary' };
  }
};
