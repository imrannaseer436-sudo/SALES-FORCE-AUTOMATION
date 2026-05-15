import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const colorScheme = require('react-native').useColorScheme?.() || 'light';
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? scheme.textSecondary : scheme.primary,
          borderColor: scheme.primary,
        };
      case 'secondary':
        return {
          backgroundColor: scheme.surfaceSecondary,
          borderColor: scheme.border,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: scheme.primary,
          borderWidth: 1,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      case 'danger':
        return {
          backgroundColor: disabled ? scheme.textSecondary : scheme.danger,
          borderColor: scheme.danger,
        };
      default:
        return {
          backgroundColor: scheme.primary,
          borderColor: scheme.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          minHeight: 36,
        };
      case 'lg':
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          minHeight: 52,
        };
      default: // md
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          minHeight: 44,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return scheme.textSecondary;

    switch (variant) {
      case 'primary':
      case 'danger':
        return '#FFFFFF';
      case 'secondary':
        return scheme.textPrimary;
      case 'outline':
      case 'ghost':
        return scheme.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 18;
      default:
        return 16;
    }
  };

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.md,
      ...getVariantStyles(),
      ...getSizeStyles(),
    },
    text: {
      fontSize: getTextSize(),
      fontWeight: '600',
      color: getTextColor(),
      textAlign: 'center',
    },
    iconSpacing: {
      marginHorizontal: spacing.xs,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {leftIcon && !loading && <View style={styles.iconSpacing}>{leftIcon}</View>}
      {loading && <ActivityIndicator size="small" color={getTextColor()} style={styles.iconSpacing} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {rightIcon && !loading && <View style={styles.iconSpacing}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default Button;