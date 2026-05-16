import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SectionHeader, Card } from '@/components/ui/Card';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;
  const headerShadowColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.16)';
  const headerShadowOpacity = isDark ? 0.18 : 0.14;

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
      id: 'users',
      title: 'Users',
      subtitle: 'Managers & Admins',
      icon: '🧑‍💼',
      description: 'Create and manage company admins, RSMs, and SMs',
      route: '/users',
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
    headerSection: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
      backgroundColor: scheme.surfaceSecondary,
      borderBottomLeftRadius: radius['2xl'],
      borderBottomRightRadius: radius['2xl'],
      shadowColor: headerShadowColor,
      shadowOpacity: headerShadowOpacity,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
      elevation: 6,
      zIndex: 10,
    },
    greetingContainer: {
      marginBottom: spacing.md,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    timeGreeting: {
      fontSize: 14,
      color: scheme.textSecondary,
      fontWeight: '500',
      marginBottom: spacing.xs,
    },
    greeting: {
      fontSize: 32,
      fontWeight: '700',
      color: scheme.textPrimary,
      marginBottom: spacing.xs,
    },
    subGreeting: {
      fontSize: 14,
      color: scheme.textSecondary,
    },
    kpiGrid: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.lg,
    },
    kpiCard: {
      flex: 1,
      backgroundColor: scheme.surfaceSecondary,
      borderRadius: radius.lg,
      padding: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 100,
    },
    kpiValue: {
      fontSize: 20,
      fontWeight: '700',
      color: scheme.primary,
      marginBottom: spacing.xs,
    },
    kpiLabel: {
      fontSize: 11,
      color: scheme.textSecondary,
      textAlign: 'center',
    },
    quickActionsContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    quickActionButton: {
      flex: 1,
      backgroundColor: scheme.primary,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quickActionButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    modulesSection: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
      backgroundColor: scheme.background,
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

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const kpiData = [
    { label: 'Visits', value: '12' },
    { label: 'Completed', value: '8' },
    { label: 'Pending', value: '4' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with KPIs and Quick Actions */}
        <View style={styles.headerSection}>
          <View style={styles.greetingContainer}>
            <Text style={styles.timeGreeting}>{getTimeGreeting()}</Text>
            <Text style={styles.greeting}>Welcome Back</Text>
            <Text style={styles.subGreeting}>Sales Force Management System</Text>
          </View>                  
        </View>

        {/* Modules Section */}
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
    </SafeAreaView>
  );
}
