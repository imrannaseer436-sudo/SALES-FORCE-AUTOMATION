import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Card, Badge, SectionHeader } from '@/components/ui/Card';
import { Avatar, StatusIndicator } from '@/components/ui/Avatar';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { Contact, User } from '@/types/schema';

// Mock contact detail data
const getMockContactDetail = (id: string): Contact & { user?: User } => {
  return {
    id: BigInt(id),
    contact_user_id: BigInt(id),
    user_id: BigInt(id),
    name: 'ABC Distribution Pvt Ltd',
    address_line_1: '123 Business Street',
    address_line_2: 'Floor 3, Business Plaza',
    phone_1: '9876543210',
    phone_2: '9876543211',
    city: 'Mumbai',
    district: 'Mumbai',
    pincode: '400001',
    state: 'Maharashtra',
    gst: '27AABCT1234H1Z0',
    category: 'distributor',
    is_active: true,
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2024-05-14T10:00:00Z',
    user: {
      id: BigInt(id),
      name: 'ABC Distribution Pvt Ltd',
      email: 'abc@dist.com',
      phone: '9876543210',
      password: 'hashed_password',
      role: 'distributor',
      is_active: true,
      created_at: '2023-01-15T10:00:00Z',
      updated_at: '2024-05-14T10:00:00Z',
    },
  };
};

export default function ContactDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const params = useLocalSearchParams();
  const id = params.id as string;
  const data = params.data as string;

  // Use passed data if available, otherwise fallback to mock data
  const contact: Contact & { user?: User } = data
    ? JSON.parse(data)
    : getMockContactDetail(id || '1');

  const user = contact.user;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getCategoryVariant = (category: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' => {
    switch (category.toLowerCase()) {
      case 'agent':
        return 'primary';
      case 'distributor':
        return 'success';
      case 'retailer':
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
    badge:{
      alignSelf: 'center',
    },
    category: {
      fontSize: 14,
      color: scheme.textSecondary,
      marginBottom: spacing.md,
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
    gstCard: {
      backgroundColor: scheme.surfaceSecondary,
      padding: spacing.md,
      borderRadius: radius.md,
      marginBottom: spacing.md,
    },
    gstLabel: {
      fontSize: 12,
      color: scheme.textSecondary,
      marginBottom: spacing.xs,
    },
    gstValue: {
      fontSize: 16,
      fontWeight: '600',
      color: scheme.textPrimary,
      fontFamily: 'monospace',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.heroCard}>
        <Avatar initials={getInitials(contact.name)} size="lg" />
        <View style={styles.nameSection}>
          <Text style={styles.name}>{contact.name}</Text>          
          <Badge
            label={contact.category?.toUpperCase() || 'N/A'}
            variant={getCategoryVariant(contact.category)}
            style={styles.badge}
          />
        </View>
      </Card>

      <Card style={{ marginBottom: spacing.lg }}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.infoRow}>
          <View style={styles.leftColumn}>
            <Text style={styles.infoLabel}>Phone 1</Text>
            <Text style={styles.infoValue}>{contact.phone_1}</Text>
          </View>
          {contact.phone_2 && (
            <View style={styles.rightColumn}>
              <Text style={styles.infoLabel}>Phone 2</Text>
              <Text style={styles.infoValue}>{contact.phone_2}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{contact.user?.email || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <StatusIndicator
            status={contact.is_active ? 'active' : 'inactive'}
            size="md"
          />
          <Text style={styles.statusText}>
            {contact.is_active ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </Card>

      <Card style={{ marginBottom: spacing.lg }}>
        <Text style={styles.sectionTitle}>Tax Information</Text>
        <View style={styles.gstCard}>
          <Text style={styles.gstLabel}>GST Number</Text>
          <Text style={styles.gstValue}>{contact.gst}</Text>
        </View>
      </Card>

      <Card style={{ marginBottom: spacing.lg }}>
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.addressBlock}>
          <Text style={styles.addressText}>{contact.address_line_1}</Text>
          {contact.address_line_2 && (
            <Text style={styles.addressText}>{contact.address_line_2}</Text>
          )}
          <Text style={styles.addressText}>
            {contact.city}, {contact.district}
          </Text>
          <Text style={styles.addressText}>
            {contact.state} - {contact.pincode}
          </Text>
        </View>
      </Card>
    </ScrollView>
  </SafeAreaView>
  );
}
