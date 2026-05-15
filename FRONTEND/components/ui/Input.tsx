import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  required?: boolean;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      containerStyle,
      inputStyle,
      required,
      style,
      ...props
    },
    ref
  ) => {
    const colorScheme = require('react-native').useColorScheme?.() || 'light';
    const isDark = colorScheme === 'dark';
    const scheme = isDark ? colors.dark : colors.light;

    const styles = StyleSheet.create({
      container: {
        marginBottom: spacing.md,
      },
      labelContainer: {
        flexDirection: 'row',
        marginBottom: spacing.xs,
      },
      label: {
        fontSize: 14,
        fontWeight: '500',
        color: scheme.textPrimary,
      },
      required: {
        color: scheme.danger,
      },
      inputContainer: {
        position: 'relative',
      },
      input: {
        backgroundColor: scheme.surface,
        borderWidth: 1,
        borderColor: error ? scheme.danger : scheme.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        fontSize: 16,
        color: scheme.textPrimary,
        minHeight: 48,
      },
      inputFocused: {
        borderColor: scheme.primary,
      },
      helperText: {
        fontSize: 12,
        color: scheme.textSecondary,
        marginTop: spacing.xs,
      },
      errorText: {
        fontSize: 12,
        color: scheme.danger,
        marginTop: spacing.xs,
      },
    });

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
            {required && <Text style={styles.required}> *</Text>}
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            style={[styles.input, inputStyle, style]}
            placeholderTextColor={scheme.textSecondary}
            {...props}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

export default Input;