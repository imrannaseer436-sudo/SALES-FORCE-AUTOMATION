import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Card, Badge, SectionHeader } from '@/components/ui/Card';
import { Avatar, StatusIndicator } from '@/components/ui/Avatar';
import { Button } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { useUserStore } from '@/store/userStore';
import { User } from '@/types/schema';
import { userService } from '@/services/userService';
import { SafeAreaView } from 'react-native-safe-area-context';

const parseUserData = (data?: string) => {
  if (!data) return null;
  try {
    const parsed = JSON.parse(data) as any;
    if (parsed?.id && typeof parsed.id === 'string') {
      parsed.id = BigInt(parsed.id);
    }
    return parsed as User;
  } catch {
    return null;
  }
};

export default function UserDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const { getUserById, deleteUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const id = params.id as string;
  const data = params.data as string | undefined;

  const user = useMemo(() => {
    const parsed = parseUserData(data);
    if (parsed) return parsed;
    if (id) return getUserById(BigInt(id));
    return null;
  }, [data, getUserById, id]);

  const handleEdit = () => {
    if (!user) return;
    router.push({
      pathname: '/users/[id]/edit',
      params: {
        id: id,
        data: JSON.stringify(user, (_, value) =>
          typeof value === 'bigint' ? value.toString() : value
        ),
      },
    });
  };

  const handleDelete = () => {
    if (!user) return;

    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${user.name}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const response = await userService.delete(user.id);
              if (!response || response.success) {
                deleteUser(user.id);
                Alert.alert('Deleted', 'User deleted successfully.', [
                  { text: 'OK', onPress: () => router.back() },
                ]);
              } else {
                throw new Error('Delete failed');
              }
            } catch (error) {
              deleteUser(user.id);
              Alert.alert('Deleted', 'User deleted locally.', [
                { text: 'OK', onPress: () => router.back() },
              ]);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'company_admin':
        return 'danger';
      case 'rsm':
        return 'warning';
      case 'sm':
        return 'info';
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
      fontSize: 13,
      color: scheme.textSecondary,
      marginBottom: spacing.md,
    },
    badge: {
      alignSelf: 'center',
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
      justifyContent: 'space-between',
      marginBottom: spacing.md,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: scheme.border,
    },
    label: {
      fontSize: 12,
      color: scheme.textSecondary,
      marginBottom: spacing.xs,
    },
    value: {
      fontSize: 14,
      fontWeight: '500',
      color: scheme.textPrimary,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.lg,
      marginBottom: spacing.xl,
    },
    actionButton: {
      flex: 1,
      height: 48,
    },
    actionButtonLeft: {
      marginRight: spacing.md,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    emptyText: {
      fontSize: 16,
      color: scheme.textSecondary,
      textAlign: 'center',
    },
  });

  if (!user) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Avatar initials={getInitials(user.name)} size="lg" />
          <View style={styles.nameSection}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Badge style={styles.badge} label={user.role.toUpperCase()} variant={getRoleVariant(user.role)} />
          </View>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </View>
            <View style={styles.statusRow}>
              <StatusIndicator status={user.is_active ? 'active' : 'inactive'} size="md" />
              <Text style={styles.value}>{user.is_active ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View>
              <Text style={styles.label}>Created</Text>
              <Text style={styles.value}>{new Date(user.created_at).toLocaleDateString()}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Edit"
            leftIcon={<Ionicons name="pencil" size={18} color={scheme.primary} />}
            onPress={handleEdit}
            variant="outline"
            size="sm"
            style={[styles.actionButton, styles.actionButtonLeft]}
          />
          <Button
            title="Delete"
            leftIcon={<Ionicons name="trash" size={18} color="#FFFFFF" />}
            onPress={handleDelete}
            variant="danger"
            size="sm"
            loading={loading}
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
