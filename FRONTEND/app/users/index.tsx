import React, { useState, useMemo } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, SectionHeader } from '@/components/ui/Card';
import { Avatar, StatusIndicator } from '@/components/ui/Avatar';
import { Button } from '@/components/ui';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { useUserStore } from '@/store/userStore';
import { User, UserRole } from '@/types/schema';

const MOCK_USERS: User[] = [
  {
    id: 1n,
    name: 'Asha Mehta',
    email: 'asha.mehta@example.com',
    phone: '9876543210',
    password: 'hashed_password',
    role: 'company_admin',
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-05-10T10:00:00Z',
  },
  {
    id: 2n,
    name: 'Neeraj Singh',
    email: 'neeraj.singh@example.com',
    phone: '9876501234',
    password: 'hashed_password',
    role: 'rsm',
    is_active: true,
    created_at: '2024-02-08T10:00:00Z',
    updated_at: '2024-05-12T10:00:00Z',
  },
  {
    id: 3n,
    name: 'Sunita Rao',
    email: 'sunita.rao@example.com',
    phone: '9876512345',
    password: 'hashed_password',
    role: 'sm',
    is_active: false,
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-05-14T10:00:00Z',
  },
];

const roles: UserRole[] = ['company_admin', 'rsm', 'sm'];

const UsersListScreen: React.FC = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const { users } = useUserStore();

  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | null>(null);

  const usersData = users.length > 0 ? users : MOCK_USERS;

  const filteredUsers = useMemo(
    () =>
      usersData.filter((user) => {
        const matchesSearch =
          user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = filterRole ? user.role === filterRole : true;
        return matchesSearch && matchesFilter;
      }),
    [usersData, searchText, filterRole]
  );

  const getRoleLabel = (role: UserRole) =>
    role === 'company_admin' ? 'Admin' : role.toUpperCase();

  const getRoleVariant = (role: UserRole) => {
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

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: scheme.background,
    },
    headerContainer: {
      backgroundColor: scheme.surface,
      borderBottomWidth: 1,
      borderBottomColor: scheme.border,
      paddingVertical: spacing.md,
    },
    createButton: {
      marginLeft: spacing.md,
      flexShrink: 0,
      width: 44,
      height: 44,
      borderRadius: 999,
      paddingHorizontal: 0,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
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
    contentContainer: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },
    userCard: {
      padding: spacing.md,
      marginBottom: spacing.md,
      borderRadius: radius['2xl'],
      backgroundColor: scheme.surface,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    userHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    avatarSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatarWrapper: {
      marginRight: spacing.md,
    },
    nameBlock: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: '700',
      color: scheme.textPrimary,
      marginBottom: spacing.xs,
    },
    userSubText: {
      fontSize: 13,
      color: scheme.textSecondary,
      marginBottom: spacing.xs,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: scheme.border,
      marginTop: spacing.md,
    },
    infoItem: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 12,
      color: scheme.textSecondary,
      marginBottom: spacing.xs,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: '600',
      color: scheme.textPrimary,
    },
    badgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
      flexWrap: 'wrap',
      marginTop: spacing.sm,
    },
    roleBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.xl,
      backgroundColor: scheme.surfaceSecondary,
    },
    roleBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: scheme.textPrimary,
    },
    arrowIcon: {
      fontSize: 24,
      color: scheme.textSecondary,
      marginLeft: spacing.sm,
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
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <SectionHeader
            title="Users"
            subtitle="Manage administrators and managers"
            action={
              <Button
                title=""
                leftIcon={<Ionicons name="add" size={22} color="#FFFFFF" />}
                onPress={() => router.push('/users/create')}
                size="sm"
                style={styles.createButton}
              />
            }
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email..."
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
                style={[
                  styles.filterButtonText,
                  filterRole === null && styles.filterButtonTextActive,
                ]}
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
                  {getRoleLabel(role)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {filteredUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No users found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: '/users/[id]',
                  params: {
                    id: item.id.toString(),
                    data: JSON.stringify(item, (_, value) =>
                      typeof value === 'bigint' ? value.toString() : value
                    ),
                  },
                })
              }
            >
              <Card style={styles.userCard}>
                <View style={styles.userHeader}>
                  <View style={styles.avatarSection}>
                    <View style={styles.avatarWrapper}>
                      <Avatar initials={getInitials(item.name)} size="md" />
                    </View>
                    <View style={styles.nameBlock}>
                      <Text style={styles.userName}>{item.name}</Text>
                      <Text style={styles.userSubText}>{item.email}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={22} color={scheme.textSecondary} />
                </View>

                <View style={styles.badgeRow}>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>{getRoleLabel(item.role)}</Text>
                  </View>
                  <View style={[{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }]}> 
                    <StatusIndicator status={item.is_active ? 'active' : 'inactive'} size="sm" />
                    {/* <Text style={styles.roleBadgeText}>{item.is_active ? 'Active' : 'Inactive'}</Text> */}
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Phone</Text>
                    <Text style={styles.infoValue}>{item.phone}</Text>
                  </View>
                  <View style={[styles.infoItem, { alignItems: 'flex-end' }]}> 
                    <Text style={styles.infoLabel}>Created</Text>
                    <Text style={styles.infoValue}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default UsersListScreen;
