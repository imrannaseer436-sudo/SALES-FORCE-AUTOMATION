import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SectionHeader } from '@/components/ui/Card';
import { EmployeeCard } from '@/components/modules/employees/EmployeeCard';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { Employee, User } from '@/types/schema';

// Mock data for demonstration
const MOCK_EMPLOYEES: (Employee & { user?: User })[] = [
  {
    id: 1n,
    employee_user_id: 1n,
    user_id: 1n,
    code: 'EMP001',
    joining_date: '2023-01-15',
    address: '123 Main Street',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    aadhar_no: '1234-5678-9012',
    img_url: undefined,
    uan: 'UAN123456',
    esi_no: 'ESI123456',
    pf_no: 'PF123456',
    wages: 50000,
    is_active: true,
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2024-05-14T10:00:00Z',
    user: {
      id: 1n,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '9876543210',
      password: 'hashed_password',
      role: 'salesman',
      is_active: true,
      created_at: '2023-01-15T10:00:00Z',
      updated_at: '2024-05-14T10:00:00Z',
    },
  },
  {
    id: 2n,
    employee_user_id: 2n,
    user_id: 2n,
    code: 'EMP002',
    joining_date: '2023-02-20',
    address: '456 Oak Avenue',
    city: 'Bangalore',
    district: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    aadhar_no: '2345-6789-0123',
    img_url: undefined,
    uan: 'UAN234567',
    esi_no: 'ESI234567',
    pf_no: 'PF234567',
    wages: 55000,
    is_active: true,
    created_at: '2023-02-20T10:00:00Z',
    updated_at: '2024-05-14T10:00:00Z',
    user: {
      id: 2n,
      name: 'Priya Singh',
      email: 'priya@example.com',
      phone: '9876543211',
      password: 'hashed_password',
      role: 'rsm',
      is_active: true,
      created_at: '2023-02-20T10:00:00Z',
      updated_at: '2024-05-14T10:00:00Z',
    },
  },
  {
    id: 3n,
    employee_user_id: 3n,
    user_id: 3n,
    code: 'EMP003',
    joining_date: '2023-03-10',
    address: '789 Pine Road',
    city: 'Delhi',
    district: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    aadhar_no: '3456-7890-1234',
    img_url: undefined,
    uan: 'UAN345678',
    esi_no: 'ESI345678',
    pf_no: 'PF345678',
    wages: 60000,
    is_active: false,
    created_at: '2023-03-10T10:00:00Z',
    updated_at: '2024-05-14T10:00:00Z',
    user: {
      id: 3n,
      name: 'Arjun Patel',
      email: 'arjun@example.com',
      phone: '9876543212',
      password: 'hashed_password',
      role: 'sm',
      is_active: false,
      created_at: '2023-03-10T10:00:00Z',
      updated_at: '2024-05-14T10:00:00Z',
    },
  },
];

interface EmployeesListScreenProps {
  onEmployeePress?: (employee: Employee & { user?: User }) => void;
}

const EmployeesListScreen: React.FC<EmployeesListScreenProps> = ({
  onEmployeePress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.user?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.code?.toLowerCase().includes(searchText.toLowerCase());

    const matchesFilter = filterRole ? emp.user?.role === filterRole : true;

    return matchesSearch && matchesFilter;
  });

  const roles = ['salesman', 'rsm', 'sm'];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: scheme.background,
    },
    scrollContent: {
      paddingBottom: spacing.lg,
    },
    searchContainer: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      backgroundColor: scheme.surface,
      borderBottomWidth: 1,
      borderBottomColor: scheme.border,
    },
    searchInput: {
      backgroundColor: scheme.surfaceSecondary,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      color: scheme.textPrimary,
      fontSize: 14,
      marginBottom: spacing.md,
    },
    filterContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    filterButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: scheme.border,
    },
    filterButtonActive: {
      backgroundColor: scheme.primary,
      borderColor: scheme.primary,
    },
    filterButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: scheme.textSecondary,
    },
    filterButtonTextActive: {
      color: '#FFFFFF',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    emptyText: {
      fontSize: 16,
      color: scheme.textSecondary,
      textAlign: 'center',
    },
    contentContainer: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <SectionHeader title="Employees" subtitle="Manage your sales team" />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or ID..."
          placeholderTextColor={scheme.textMuted}
          value={searchText}
          onChangeText={setSearchText}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filterRole === null && styles.filterButtonActive]}
              onPress={() => setFilterRole(null)}
            >
              <Text
                style={[styles.filterButtonText, filterRole === null && styles.filterButtonTextActive]}
              >
                All
              </Text>
            </TouchableOpacity>

            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                style={[styles.filterButton, filterRole === role && styles.filterButtonActive]}
                onPress={() => setFilterRole(role === filterRole ? null : role)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterRole === role && styles.filterButtonTextActive,
                  ]}
                >
                  {role.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {filteredEmployees.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No employees found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEmployees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contentContainer}>
              <EmployeeCard
                employee={item}
                onPress={() => onEmployeePress?.(item)}
              />
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default EmployeesListScreen;

