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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SectionHeader } from '@/components/ui/Card';
import { ContactCard } from '@/components/modules/contacts/ContactCard';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { Contact, User } from '@/types/schema';

// Mock data for demonstration
const MOCK_CONTACTS: (Contact & { user?: User })[] = [
  {
    id: 1n,
    contact_user_id: 1n,
    user_id: 1n,
    name: 'ABC Distribution',
    address_line_1: '123 Business Street',
    address_line_2: 'Floor 3',
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
      id: 1n,
      name: 'ABC Distribution',
      email: 'abc@dist.com',
      phone: '9876543210',
      password: 'hashed_password',
      role: 'distributor',
      is_active: true,
      created_at: '2023-01-15T10:00:00Z',
      updated_at: '2024-05-14T10:00:00Z',
    },
  },
  {
    id: 2n,
    contact_user_id: 2n,
    user_id: 2n,
    name: 'XYZ Retail',
    address_line_1: '456 Market Road',
    phone_1: '9876543212',
    city: 'Bangalore',
    district: 'Bangalore',
    pincode: '560001',
    state: 'Karnataka',
    gst: '29AABCT5678H2Z0',
    category: 'agent',
    is_active: true,
    created_at: '2023-02-20T10:00:00Z',
    updated_at: '2024-05-14T10:00:00Z',
    user: {
      id: 2n,
      name: 'XYZ Retail',
      email: 'xyz@retail.com',
      phone: '9876543212',
      password: 'hashed_password',
      role: 'agent',
      is_active: true,
      created_at: '2023-02-20T10:00:00Z',
      updated_at: '2024-05-14T10:00:00Z',
    },
  },
  {
    id: 3n,
    contact_user_id: 3n,
    user_id: 3n,
    name: 'Metro Store',
    address_line_1: '789 Shopping Mall',
    phone_1: '9876543213',
    city: 'Delhi',
    district: 'Delhi',
    pincode: '110001',
    state: 'Delhi',
    gst: '07AABCT9012H3Z0',
    category: 'retailer',
    is_active: false,
    created_at: '2023-03-10T10:00:00Z',
    updated_at: '2024-05-14T10:00:00Z',
    user: {
      id: 3n,
      name: 'Metro Store',
      email: 'metro@store.com',
      phone: '9876543213',
      password: 'hashed_password',
      role: 'agent',
      is_active: false,
      created_at: '2023-03-10T10:00:00Z',
      updated_at: '2024-05-14T10:00:00Z',
    },
  },
];

interface ContactsListScreenProps {
  onContactPress?: (contact: Contact & { user?: User }) => void;
}

const ContactsListScreen: React.FC<ContactsListScreenProps> = ({
  onContactPress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [contacts, setContacts] = useState(MOCK_CONTACTS);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.gst?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.phone_1?.includes(searchText) ||
      contact.phone_2?.includes(searchText);

    const matchesFilter = filterCategory ? contact.category === filterCategory : true;

    return matchesSearch && matchesFilter;
  });

  const categories = ['agent', 'distributor', 'retailer'];

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
    <SafeAreaView style={styles.container}>
      <SectionHeader title="Contacts" subtitle="Agents, Distributors & Retailers" />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, GST, or phone..."
          placeholderTextColor={scheme.textMuted}
          value={searchText}
          onChangeText={setSearchText}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filterCategory === null && styles.filterButtonActive]}
              onPress={() => setFilterCategory(null)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterCategory === null && styles.filterButtonTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterButton,
                  filterCategory === category && styles.filterButtonActive,
                ]}
                onPress={() => setFilterCategory(category === filterCategory ? null : category)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterCategory === category && styles.filterButtonTextActive,
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {filteredContacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No contacts found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contentContainer}>
              <ContactCard
                contact={item}
                onPress={() => router.push({
                  pathname: '/contacts/[id]',
                  params: { id: item.id.toString(), data: JSON.stringify(item, (key, value) => typeof value === 'bigint' ? value.toString() : value) }
                })}
              />
            </View>
          )}
          scrollEnabled={true}
          contentContainerStyle={styles.scrollContent}
        />
      )}
    </SafeAreaView>
  );
};

export default ContactsListScreen;
