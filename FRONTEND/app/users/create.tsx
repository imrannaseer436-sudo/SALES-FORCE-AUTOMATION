import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionHeader } from '@/components/ui/Card';
import { Input, Button } from '@/components/ui';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { userCreateSchema, type UserCreateFormData } from '@/lib/validation';
import { useUserStore } from '@/store/userStore';
import { User, UserRole } from '@/types/schema';
import { userService } from '@/services/userService';

export default function CreateUserScreen() {
  const router = useRouter();
  const colorScheme = require('react-native').useColorScheme?.() || 'light';
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const { addUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const roles: UserRole[] = ['company_admin', 'rsm', 'sm'];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateFormData>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'company_admin',
      is_active: true,
    },
  });

  const onSubmit: SubmitHandler<UserCreateFormData> = async (data) => {
    try {
      setLoading(true);

      const response = await userService.create(data as Record<string, any>);

      if (response && response.success && response.data) {
        addUser(response.data as User);
        Alert.alert('Success', 'User created successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        const newUser: User = {
          id: BigInt(Date.now()),
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: data.role,
          is_active: data.is_active || true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        addUser(newUser);

        Alert.alert('Success', 'User created locally.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create user. Please try again.', [
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
  });

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
            <SectionHeader title="Create New User" />
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
                  error={errors.password?.message}
                  required
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
              title="Create"
              leftIcon={<Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />}
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
