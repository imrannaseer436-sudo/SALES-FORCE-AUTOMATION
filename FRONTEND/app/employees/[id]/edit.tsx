import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionHeader } from '@/components/ui/Card';
import { Input, Button } from '@/components/ui';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { API_BASE_URL } from '@/lib/api';
import { employeeEditSchema, type EmployeeEditFormData } from '@/lib/validation';
import { useEmployeeStore } from '@/store/employeeStore';
import { useUserStore } from '@/store/userStore';
import { Employee, User, UserRole } from '@/types/schema';
import { employeeService } from '@/services/employeeService';

export default function EditEmployeeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = require('react-native').useColorScheme?.() || 'light';
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const { updateEmployee, setLoading, loading } = useEmployeeStore();
  const { updateUser } = useUserStore();

  const roles: UserRole[] = ['salesman'];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
  };

  const data = params.data as string;
  const employee = useMemo(() => {
    return data ? JSON.parse(data) : null;
  }, [data]);
  const hasInitialized = useRef(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EmployeeEditFormData>({
    resolver: zodResolver(employeeEditSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'salesman',
      code: '',
      joining_date: '',
      address: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
      aadhar_no: '',
      uan: '',
      esi_no: '',
      pf_no: '',
      wages: 0,
      is_active: true,
    },
  });

  useEffect(() => {
    if (employee && !hasInitialized.current) {
      reset({
        name: employee.user?.name || '',
        email: employee.user?.email || '',
        phone: employee.user?.phone || '',
        password: '',
        role: employee.user?.role || 'salesman',
        code: employee.code || '',
        joining_date: employee.joining_date || '',
        address: employee.address || '',
        city: employee.city || '',
        district: employee.district || '',
        state: employee.state || '',
        pincode: employee.pincode || '',
        aadhar_no: employee.aadhar_no || '',
        img_url: employee.img_url || '',
        uan: employee.uan || '',
        esi_no: employee.esi_no || '',
        pf_no: employee.pf_no || '',
        wages: employee.wages || 0,
        is_active: employee.is_active ?? true,
      });
      hasInitialized.current = true;
    }
  }, [employee, reset]);
  const [imagePreviewUri, setImagePreviewUri] = useState<string | null>(null);

  const imageUrl = watch('img_url');

  const handleUploadImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    const selectedUri = (result as any).assets?.[0]?.uri || (result as any).uri;
    if (!selectedUri || (result as any).canceled) return;

    const filename = selectedUri.split('/').pop() || 'image.jpg';
    const match = filename.match(/\.([a-zA-Z0-9]+)$/);
    const fileType = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';

    const fileObj = {
      uri: selectedUri,
      name: filename,
      type: fileType,
    } as any;

    setValue('img_file', fileObj);
    setImagePreviewUri(selectedUri);
  };

  const onSubmit: SubmitHandler<EmployeeEditFormData> = async (formData) => {
    try {
      setLoading(true);

      const payload: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        is_active: formData.is_active,
        code: formData.code,
        joining_date: formData.joining_date,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        aadhar_no: formData.aadhar_no || '',
        uan: formData.uan,
        esi_no: formData.esi_no,
        pf_no: formData.pf_no,
        wages: formData.wages,
      };

      if (formData.password) payload.password = formData.password;
      if ((formData as any).img_file) payload.img_file = (formData as any).img_file;

      const response = await employeeService.update(employee.id, payload);

      if (response && response.success && response.data) {
        const updated = response.data;
        if (updated.employee) updateEmployee(employee.id, updated.employee as Partial<Employee>);
        if (updated.user) updateUser(employee.employee_user_id, updated.user as Partial<User>);

        Alert.alert('Success', 'Employee updated successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        // Fallback local update
        const updatedEmployee = {
          ...employee,
          code: formData.code,
          joining_date: formData.joining_date,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode,
          aadhar_no: formData.aadhar_no || '',
          ...(formData.img_file ? { img_file: formData.img_file } : {}),
          uan: formData.uan,
          esi_no: formData.esi_no,
          pf_no: formData.pf_no,
          wages: formData.wages,
          is_active: formData.is_active,
          updated_at: new Date().toISOString(),
          user: {
            ...employee.user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            is_active: formData.is_active,
            updated_at: new Date().toISOString(),
            ...(formData.password ? { password: formData.password } : {}),
          },
        };

        updateEmployee(employee.id, updatedEmployee);
        updateUser(employee.employee_user_id, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          is_active: formData.is_active,
          updated_at: new Date().toISOString(),
          ...(formData.password ? { password: formData.password } : {}),
        });

        Alert.alert('Success', 'Employee updated locally.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update employee. Please try again.', [{ text: 'OK' }]);
      setImagePreviewUri(employee.img_url || null);
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
    row: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    halfWidth: {
      flex: 1,
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
    dateField: {
      padding: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: scheme.border,
      backgroundColor: scheme.surfaceSecondary,
    },
    dateFieldText: {
      color: scheme.textPrimary,
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
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
    },
    errorText: {
      fontSize: 16,
      textAlign: 'center',
    },
    helperText: {
      fontSize: 12,
      color: scheme.textSecondary,
      marginTop: spacing.xs,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      marginTop: spacing.md,
      backgroundColor: scheme.surfaceSecondary,
      alignSelf: 'center',
    },
  });

  if (!employee) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: scheme.textPrimary }]}>
            Employee not found
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
            <SectionHeader title="Edit Employee" />
          </View>

          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Authentication Details</Text>

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

            <View style={styles.choiceGroup}>
              <Text style={styles.choiceLabel}>Employee Photo</Text>
              <Button
                title="Select Image"
                onPress={handleUploadImage}
                variant="outline"
                size="sm"
                style={{ marginTop: spacing.sm }}
              />
              {imagePreviewUri ? (
                <Image source={{ uri: imagePreviewUri }} style={styles.avatar} />
              ) : null}
            </View>

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
                          {role.toUpperCase()}
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

          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Employment Details</Text>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Controller
                  control={control}
                  name="code"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Employee Code"
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="characters"
                      error={errors.code?.message}
                      required
                    />
                  )}
                />
              </View>
              <View style={styles.halfWidth}>
                <Controller
                  control={control}
                  name="joining_date"
                  render={({ field: { value } }) => (
                    <View>
                      <Text style={styles.choiceLabel}>Joining Date</Text>
                      <TouchableOpacity
                        style={styles.dateField}
                        onPress={() => setShowDatePicker(true)}
                      >
                        <Text style={styles.dateFieldText}>{formatDate(value) || 'Select joining date'}</Text>
                      </TouchableOpacity>
                      {errors.joining_date?.message && (
                        <Text style={styles.errorText}>{errors.joining_date.message}</Text>
                      )}
                      {showDatePicker && (
                        <DateTimePicker
                          value={value ? new Date(value) : new Date()}
                          mode="date"
                          display="default"
                          onValueChange={(_: any, selectedDate?: Date) => {
                            if (selectedDate) {
                              setValue('joining_date', selectedDate.toISOString().split('T')[0]);
                            }
                          }}
                          onDismiss={() => setShowDatePicker(false)}
                        />
                      )}
                    </View>
                  )}
                />
              </View>
            </View>

            <Controller
              control={control}
              name="wages"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Monthly Wages"
                  value={value?.toString() || ''}
                  onChangeText={(text) => onChange(text ? parseFloat(text) : 0)}
                  keyboardType="numeric"
                  error={errors.wages?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Address"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={3}
                  error={errors.address?.message}
                  required
                />
              )}
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Controller
                  control={control}
                  name="city"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="City"
                      value={value}
                      onChangeText={onChange}
                      error={errors.city?.message}
                      required
                    />
                  )}
                />
              </View>
              <View style={styles.halfWidth}>
                <Controller
                  control={control}
                  name="district"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="District"
                      value={value}
                      onChangeText={onChange}
                      error={errors.district?.message}
                      required
                    />
                  )}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Controller
                  control={control}
                  name="state"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="State"
                      value={value}
                      onChangeText={onChange}
                      error={errors.state?.message}
                      required
                    />
                  )}
                />
              </View>
              <View style={styles.halfWidth}>
                <Controller
                  control={control}
                  name="pincode"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Pincode"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      maxLength={6}
                      error={errors.pincode?.message}
                      required
                    />
                  )}
                />
              </View>
            </View>
          </Card>

          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Government IDs</Text>

            <Controller
              control={control}
              name="aadhar_no"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Aadhar Number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  maxLength={12}
                  error={errors.aadhar_no?.message}
                />
              )}
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Controller
                  control={control}
                  name="uan"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="UAN"
                      value={value}
                      onChangeText={onChange}
                      error={errors.uan?.message}
                      required
                    />
                  )}
                />
              </View>
              <View style={styles.halfWidth}>
                <Controller
                  control={control}
                  name="esi_no"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="ESI Number"
                      value={value}
                      onChangeText={onChange}
                      error={errors.esi_no?.message}
                      required
                    />
                  )}
                />
              </View>
            </View>

            <Controller
              control={control}
              name="pf_no"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="PF Number"
                  value={value}
                  onChangeText={onChange}
                  error={errors.pf_no?.message}
                  required
                />
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