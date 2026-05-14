import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Card, Badge, SectionHeader } from '@/components/ui/Card';
import { Avatar, StatusIndicator } from '@/components/ui/Avatar';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { Employee, User } from '@/types/schema';

// Mock employee detail data
const getMockEmployeeDetail = (id: string): Employee & { user?: User } => {
  return {
    id: BigInt(id),
    employee_user_id: BigInt(id),
    user_id: BigInt(id),
    code: `EMP${id.padStart(3, '0')}`,
    joining_date: '2023-01-15',
    address: '123 Main Street, Floor 5',
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
      id: BigInt(id),
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '9876543210',
      password: 'hashed_password',
      role: 'salesman',
      is_active: true,
      created_at: '2023-01-15T10:00:00Z',
      updated_at: '2024-05-14T10:00:00Z',
    },
  };
};

export default function EmployeeDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const params = useLocalSearchParams();
  const id = params.id as string;

  const employee = getMockEmployeeDetail(id || '1');
  const user = employee.user;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'rsm':
        return 'primary';
      case 'salesman':
        return 'info';
      case 'sm':
        return 'success';
      default:
        return 'primary';
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
    heroCard: {
      marginBottom: spacing.lg,
      alignItems: 'center',
      paddingVertical: spacing.xl,
    },
    nameSection: {
      marginTop: spacing.lg,
      alignItems: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      color: scheme.textPrimary,
      marginBottom: spacing.sm,
    },
    email: {
      fontSize: 14,
      color: scheme.textSecondary,
      marginBottom: spacing.md,
    },
    infoSection: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: scheme.textPrimary,
      marginBottom: spacing.md,
      marginTop: spacing.lg,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: spacing.md,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: scheme.border,
    },
    infoLabel: {
      flex: 1,
      fontSize: 12,
      color: scheme.textSecondary,
      marginBottom: spacing.xs,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: '500',
      color: scheme.textPrimary,
    },
    leftColumn: {
      flex: 1,
      marginRight: spacing.md,
    },
    rightColumn: {
      flex: 1,
    },
    addressBlock: {
      backgroundColor: scheme.surfaceSecondary,
      padding: spacing.md,
      borderRadius: radius.md,
      marginBottom: spacing.md,
    },
    addressText: {
      fontSize: 14,
      color: scheme.textPrimary,
      lineHeight: 20,
      marginBottom: spacing.sm,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    statusText: {
      fontSize: 14,
      fontWeight: '500',
      color: scheme.textPrimary,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.heroCard}>
        <Avatar initials={getInitials(user?.name || 'N/A')} size="lg" />
        <View style={styles.nameSection}>
          <Text style={styles.name}>{user?.name || 'N/A'}</Text>
          <Text style={styles.email}>{user?.email || 'N/A'}</Text>
          <Badge
            label={user?.role?.toUpperCase() || 'N/A'}
            variant={getRoleBadgeVariant(user?.role || '')}
          />
        </View>
      </Card>

      <Card style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Employment Information</Text>

        <View style={styles.infoRow}>
          <View style={styles.leftColumn}>
            <Text style={styles.infoLabel}>Employee Code</Text>
            <Text style={styles.infoValue}>{employee.code}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.infoLabel}>Joining Date</Text>
            <Text style={styles.infoValue}>
              {new Date(employee.joining_date).toLocaleDateString('en-IN')}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.leftColumn}>
            <Text style={styles.infoLabel}>Monthly Wages</Text>
            <Text style={styles.infoValue}>₹{employee.wages?.toLocaleString('en-IN') || 'N/A'}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.statusRow}>
              <StatusIndicator
                status={employee.is_active ? 'active' : 'inactive'}
                size="md"
              />
              <Text style={styles.statusText}>
                {employee.is_active ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.addressBlock}>
          <Text style={styles.addressText}>{employee.address || 'N/A'}</Text>
          <Text style={styles.addressText}>
            {employee.city}, {employee.district}
          </Text>
          <Text style={styles.addressText}>
            {employee.state} - {employee.pincode}
          </Text>
        </View>
      </Card>

      <Card style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Government IDs</Text>

        <View style={styles.infoRow}>
          <View style={styles.leftColumn}>
            <Text style={styles.infoLabel}>Aadhar Number</Text>
            <Text style={styles.infoValue}>{employee.aadhar_no || 'N/A'}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.infoLabel}>UAN</Text>
            <Text style={styles.infoValue}>{employee.uan || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.leftColumn}>
            <Text style={styles.infoLabel}>ESI Number</Text>
            <Text style={styles.infoValue}>{employee.esi_no || 'N/A'}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.infoLabel}>PF Number</Text>
            <Text style={styles.infoValue}>{employee.pf_no || 'N/A'}</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
