import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionHeader } from '@/components/ui/Card';
import { Input, Button } from '@/components/ui';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { userEditSchema, type UserEditFormData } from '@/lib/validation';
import { useUserStore } from '@/store/userStore';
import { User, UserRole } from '@/types/schema';
import { userService } from '@/services/userService';

const parseUserData = (rawData?: string) => {
  if (!rawData) return null;
  try {
    const parsed = JSON.parse(rawData) as any;
    if (parsed?.id && typeof parsed.id === 'string') {
      parsed.id = BigInt(parsed.id);
    }
    return parsed as User;
  } catch {
    return null;
  }
};

export default function EditUserScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = require('react-native').useColorScheme?.() || 'light';
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const { updateUser, getUserById } = useUserStore();
  const [loading, setLoading] = useState(false);

  const roles: UserRole[] = ['company_admin', 'rsm', 'sm'];

  const data = params.data as string | undefined;
  const user = useMemo(() => {
    const parsed = parseUserData(data);
    if (parsed) return parsed;
    if (params.id) {
      return getUserById(BigInt(params.id));
    }
    return null;
  }, [data, params.id, getUserById]);

  const hasInitialized = useRef(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'company_admin',
      is_active: true,
    },
  });

  useEffect(() => {
    if (user && !hasInitialized.current) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
        role: user.role || 'company_admin',
        is_active: user.is_active ?? true,
      });
      hasInitialized.current = true;
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<UserEditFormData> = async (formData) => {
    if (!user) return;

    try {
      setLoading(true);

      const payload: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        is_active: formData.is_active,
      };

      if (formData.password) payload.password = formData.password;

      const response = await userService.update(user.id, payload);

      if (response && response.success && response.data) {
        updateUser(user.id, response.data as Partial<User>);
        Alert.alert('Success', 'User updated successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        updateUser(user.id, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          is_active: formData.is_active,
          ...(formData.password ? { password: formData.password } : {}),
          updated_at: new Date().toISOString(),
        });

        Alert.alert('Success', 'User updated locally.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update user. Please try again.', [
        { text: 'OK' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: scheme.background,
    },
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
      paddingBottom: spacing.xl,
    },
    header: {
      marginBottom: spacing.lg,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: scheme.textPrimary,
      marginBottom: spacing.md,
    },
    choiceGroup: {
      marginBottom: spacing.md,
    },
    choiceLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: scheme.textPrimary,
      marginBottom: spacing.xs,
    },
    choiceRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    choiceChip: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: scheme.border,
      backgroundColor: scheme.surfaceSecondary,
    },
    choiceChipActive: {
      backgroundColor: scheme.primary,
      borderColor: scheme.primary,
    },
    choiceText: {
      color: scheme.textPrimary,
      fontWeight: '600',
    },
    choiceTextActive: {
      color: '#FFFFFF',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.lg,
    },
    actionButton: {
      flex: 1,
    },
    actionButtonLeft: {
      marginRight: spacing.md,
    },
    errorText: {
      fontSize: 12,
      color: scheme.danger,
      marginTop: spacing.xs,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
    },
  });

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={{ color: scheme.textPrimary, fontSize: 16, textAlign: 'center' }}>
            User not found
          </Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            style={{ marginTop: spacing.lg }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <SectionHeader title="Edit User" />
          </View>

          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>User Details</Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Full Name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email Address"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Phone Number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  error={errors.phone?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder="Leave blank to keep current password"
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <View style={styles.choiceGroup}>
                  <Text style={styles.choiceLabel}>Role</Text>
                  <View style={styles.choiceRow}>
                    {roles.map((role) => (
                      <TouchableOpacity
                        key={role}
                        style={[
                          styles.choiceChip,
                          value === role && styles.choiceChipActive,
                        ]}
                        onPress={() => onChange(role)}
                      >
                        <Text
                          style={[
                            styles.choiceText,
                            value === role && styles.choiceTextActive,
                          ]}
                        >
                          {role === 'company_admin' ? 'Admin' : role.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.role?.message && (
                    <Text style={styles.errorText}>{errors.role.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="is_active"
              render={({ field: { onChange, value } }) => (
                <View style={styles.choiceGroup}>
                  <Text style={styles.choiceLabel}>Status</Text>
                  <View style={styles.choiceRow}>
                    <TouchableOpacity
                      style={[
                        styles.choiceChip,
                        value && styles.choiceChipActive,
                      ]}
                      onPress={() => onChange(true)}
                    >
                      <Text
                        style={[
                          styles.choiceText,
                          value && styles.choiceTextActive,
                        ]}
                      >
                        Active
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.choiceChip,
                        !value && styles.choiceChipActive,
                      ]}
                      onPress={() => onChange(false)}
                    >
                      <Text
                        style={[
                          styles.choiceText,
                          !value && styles.choiceTextActive,
                        ]}
                      >
                        Inactive
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </Card>

          <View style={styles.buttonContainer}>
            <Button
              title="Update"
              leftIcon={<Ionicons name="save-outline" size={20} color="#FFFFFF" />}
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              size="lg"
              style={[styles.actionButton, styles.actionButtonLeft]}
            />
            <Button
              title="Cancel"
              leftIcon={<Ionicons name="close" size={20} color={scheme.primary} />}
              onPress={() => router.back()}
              variant="outline"
              size="lg"
              style={styles.actionButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
