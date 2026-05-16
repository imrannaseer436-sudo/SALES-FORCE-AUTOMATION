import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionHeader } from '@/components/ui/Card';
import { Input, Button } from '@/components/ui';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { API_BASE_URL } from '@/lib/api';
import { employeeCreateSchema, type EmployeeCreateFormData } from '@/lib/validation';
import { useEmployeeStore } from '@/store/employeeStore';
import { useUserStore } from '@/store/userStore';
import { Employee, User, UserRole } from '@/types/schema';
import { employeeService } from '@/services/employeeService';

export default function CreateEmployeeScreen() {
  const router = useRouter();
  const colorScheme = require('react-native').useColorScheme?.() || 'light';
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const { addEmployee, setLoading, loading } = useEmployeeStore();
  const { addUser } = useUserStore();

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EmployeeCreateFormData>({
    resolver: zodResolver(employeeCreateSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'salesman',
      code: '',
      joining_date: new Date().toISOString().split('T')[0],
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

  const [imagePreviewUri, setImagePreviewUri] = useState<string | null>(null);

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

    // store the picked file in the form (will be sent with other data on submit)
    setValue('img_file', fileObj);
    setImagePreviewUri(selectedUri);
  };

  const onSubmit = async (data: EmployeeCreateFormData) => {
    try {
      setLoading(true);
      // Build FormData and send to backend
      const payload: Record<string, any> = { ...data } as any;
      const response = await employeeService.create(payload);

      if (response && response.success && response.data) {
        // Expecting backend to return created user and employee
        const created = response.data;
        if (created.user) addUser(created.user as User);
        if (created.employee) addEmployee(created.employee as Employee);

        Alert.alert('Success', 'Employee created successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        // fallback local add if backend not available
        const newUserId = BigInt(Date.now());
        const newUser: User = {
          id: newUserId,
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

        const newEmployee: Employee = {
          id: BigInt(Date.now()),
          employee_user_id: newUserId,
          user_id: newUserId,
          code: data.code,
          joining_date: data.joining_date,
          address: data.address,
          city: data.city,
          district: data.district,
          state: data.state,
          pincode: data.pincode,
          aadhar_no: data.aadhar_no || '',
          uan: data.uan,
          esi_no: data.esi_no,
          pf_no: data.pf_no,
          img_url: undefined,
          wages: data.wages,
          is_active: data.is_active || true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: newUser,
        };

        if ((data as any).img_file) {
          (newEmployee as any).img_file = (data as any).img_file;
        }

        addEmployee(newEmployee);

        Alert.alert('Success', 'Employee created locally (offline).', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to create employee. Please try again.',
        [{ text: 'OK' }]
      );
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
    errorText: {
      fontSize: 12,
      color: scheme.danger,
      marginTop: spacing.xs,
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
            <SectionHeader title="Create New Employee" />
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
                  error={errors.password?.message}
                  required
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
                          onValueChange={(_event, selectedDate) => {
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