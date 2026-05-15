import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Card, Badge } from '@/components/ui/Card';
import { Avatar, StatusIndicator } from '@/components/ui/Avatar';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { Employee, User } from '@/types/schema';

interface EmployeeCardProps {
  employee: Employee & { user?: User };
  onPress?: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

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
        return 'danger';
      case 'salesman':
        return 'info';
      case 'sm':
        return 'success';
      default:
        return 'primary';
    }
  };

  const styles = StyleSheet.create({
    cardContent: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    avatarSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatarContainer: {
      marginRight: spacing.md,
    },
    nameAndCode: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: scheme.textPrimary,
      marginBottom: spacing.xs,
    },
    code: {
      fontSize: 12,
      color: scheme.textSecondary,
    },
    statusSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: scheme.border,
    },
    cityLabel: {
      fontSize: 12,
      color: scheme.textSecondary,
      marginBottom: spacing.xs,
    },
    city: {
      fontSize: 14,
      fontWeight: '500',
      color: scheme.textPrimary,
    },
  });

  const user = employee.user;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card>
        <View style={styles.headerRow}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Avatar
                initials={getInitials(user?.name || 'Employee')}
                imageUrl={employee.img_url}
                size="lg"
              />
            </View>
            <View style={styles.nameAndCode}>
              <Text style={styles.name}>{user?.name || 'N/A'}</Text>
              <Text style={styles.code}>ID: {employee.code}</Text>
            </View>
          </View>
          <View style={styles.statusSection}>
            <StatusIndicator status={employee.is_active ? 'active' : 'inactive'} />
          </View>
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <Badge
            label={user?.role?.toUpperCase() || 'N/A'}
            variant={getRoleBadgeVariant(user?.role || '')}
          />
        </View>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.cityLabel}>Location</Text>
            <Text style={styles.city}>{employee.city || 'N/A'}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.cityLabel}>Joined</Text>
            <Text style={styles.city}>
              {new Date(employee.joining_date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
              })}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
