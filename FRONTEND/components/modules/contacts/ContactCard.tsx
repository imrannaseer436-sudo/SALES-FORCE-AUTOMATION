import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Card, Badge } from '@/components/ui/Card';
import { Avatar, StatusIndicator } from '@/components/ui/Avatar';
import { colors } from '@/lib/colors';
import { spacing } from '@/lib/spacing';
import { Contact, User } from '@/types/schema';

interface ContactCardProps {
  contact: Contact & { user?: User };
  onPress?: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

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
    nameAndCategory: {
      flex: 1,
      marginLeft: spacing.md,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: scheme.textPrimary,
      marginBottom: spacing.xs,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: scheme.border,
    },
    infoItem: {
      flex: 1,
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
    phoneRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    gstSection: {
      paddingTop: spacing.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      borderRadius: 8,
      backgroundColor: scheme.surfaceSecondary,
    },
    gstLabel: {
      fontSize: 11,
      color: scheme.textSecondary,
      marginBottom: spacing.xs,
    },
    gstValue: {
      fontSize: 13,
      fontWeight: '600',
      color: scheme.textPrimary,
      fontFamily: 'monospace',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card>
        <View style={styles.headerRow}>
          <View style={styles.avatarSection}>
            <Avatar initials={getInitials(contact.name)} size="lg" />
            <View style={styles.nameAndCategory}>
              <Text style={styles.name}>{contact.name}</Text>
              <Badge
                label={contact.category?.toUpperCase() || 'N/A'}
                variant={getCategoryVariant(contact.category)}
              />
            </View>
          </View>
          <StatusIndicator status={contact.is_active ? 'active' : 'inactive'} />
        </View>

        <View style={styles.infoRow}>
          <View style={[styles.infoItem, { marginRight: spacing.md }]}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>{contact.city || 'N/A'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>District</Text>
            <Text style={styles.value}>{contact.district || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.phoneRow}>
          <View style={[styles.infoItem, { marginRight: spacing.md }]}>
            <Text style={styles.label}>Phone 1</Text>
            <Text style={styles.value}>{contact.phone_1 || 'N/A'}</Text>
          </View>
          {contact.phone_2 && (
            <View style={styles.infoItem}>
              <Text style={styles.label}>Phone 2</Text>
              <Text style={styles.value}>{contact.phone_2}</Text>
            </View>
          )}
        </View>

        {contact.gst && (
          <View style={styles.gstSection}>
            <Text style={styles.gstLabel}>GST</Text>
            <Text style={styles.gstValue}>{contact.gst}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};
