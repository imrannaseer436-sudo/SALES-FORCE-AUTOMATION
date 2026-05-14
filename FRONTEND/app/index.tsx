import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SectionHeader, Card } from '@/components/ui/Card';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

  const modules = [
    {
      id: 'employees',
      title: 'Employees',
      subtitle: 'Manage Sales Team',
      icon: '👥',
      description: 'View and manage all employees with their details',
      route: '/employees',
    },
    {
      id: 'contacts',
      title: 'Contacts',
      subtitle: 'Agents & Distributors',
      icon: '📋',
      description: 'Business profiles and contact information',
      route: '/contacts',
    },
    {
      id: 'network',
      title: 'Hierarchy',
      subtitle: 'Organization Structure',
      icon: '🌳',
      description: 'View reporting relationships and team structure',
      route: '/network',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: scheme.background,
    },
    scrollContent: {
      paddingBottom: spacing.xl,
    },
    greetingCard: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
    },
    greeting: {
      fontSize: 28,
      fontWeight: '700',
      color: scheme.textPrimary,
      marginBottom: spacing.sm,
    },
    subGreeting: {
      fontSize: 14,
      color: scheme.textSecondary,
    },
    modulesSection: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
    },
    moduleCard: {
      backgroundColor: scheme.surface,
      borderRadius: radius['2xl'],
      padding: spacing.lg,
      marginBottom: spacing.md,
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    moduleHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    moduleIcon: {
      fontSize: 32,
      marginRight: spacing.md,
    },
    moduleTitleSection: {
      flex: 1,
    },
    moduleTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: scheme.textPrimary,
    },
    moduleSubtitle: {
      fontSize: 12,
      color: scheme.textSecondary,
      marginTop: spacing.xs,
    },
    moduleDescription: {
      fontSize: 13,
      color: scheme.textSecondary,
      lineHeight: 18,
      marginBottom: spacing.md,
    },
    ctaButton: {
      backgroundColor: scheme.primary,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      alignSelf: 'flex-start',
    },
    ctaButtonText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '600',
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.greetingCard}>
        <Text style={styles.greeting}>Welcome Back</Text>
        <Text style={styles.subGreeting}>
          Field Force Management System
        </Text>
      </View>

      <View style={styles.modulesSection}>
        <SectionHeader title="Modules" subtitle="Access key features" />

        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            activeOpacity={0.7}
            onPress={() => router.push(module.route as any)}
          >
            <View style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleIcon}>{module.icon}</Text>
                <View style={styles.moduleTitleSection}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
                </View>
              </View>
              <Text style={styles.moduleDescription}>{module.description}</Text>
              <View style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Open →</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
