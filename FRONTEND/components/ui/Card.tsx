import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: scheme.surface,
      borderRadius: radius['2xl'],
      padding: spacing.lg,
      marginBottom: spacing.md,
      shadowColor: isDark ? '#000000' : '#000000',
      shadowOpacity: isDark ? 0.3 : 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: isDark ? 5 : 2,
    },
  });

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  style?: any;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', style }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

  const variantColors = {
    primary: { bg: scheme.primarySoft, text: scheme.primary },
    success: { bg: '#D1FAE5', text: colors.light.success },
    warning: { bg: '#FEF3C7', text: colors.light.warning },
    danger: { bg: '#FEE2E2', text: colors.light.danger },
    info: { bg: '#DBEAFE', text: colors.light.info },
  };

  const variantColor = variantColors[variant];

  const styles = StyleSheet.create({
    badge: {
      backgroundColor: variantColor.bg,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.md,
      alignSelf: 'flex-start',
    },
    text: {
      color: variantColor.text,
      fontSize: 12,
      fontWeight: '600',
    },
  });

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.md,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: scheme.textPrimary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: 14,
      color: scheme.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {action}
    </View>
  );
};
