import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { Card, Badge, SectionHeader } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';
import { Employee, User, RSMEmployee } from '@/types/schema';

// Mock hierarchy data
const MOCK_HIERARCHY = {
  admin: {
    id: 1n,
    name: 'Company Admin',
    role: 'company_admin',
    children: [
      {
        id: 2n,
        name: 'Sales Manager',
        role: 'sm',
        children: [
          {
            id: 3n,
            name: 'Regional Sales Manager',
            role: 'rsm',
            children: [
              {
                id: 4n,
                name: 'Rajesh Kumar',
                role: 'salesman',
                children: [],
              },
              {
                id: 5n,
                name: 'Priya Singh',
                role: 'salesman',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
};

interface HierarchyNode {
  id: bigint;
  name: string;
  role: string;
  children: HierarchyNode[];
}

interface NodeRendererProps {
  node: HierarchyNode;
  level: number;
  scheme: any;
}

const NodeRenderer: React.FC<NodeRendererProps> = ({ node, level, scheme }) => {
  const [expanded, setExpanded] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'company_admin':
        return colors.light.danger;
      case 'sm':
        return colors.light.primary;
      case 'rsm':
        return colors.light.warning;
      case 'salesman':
        return colors.light.success;
      default:
        return colors.light.textSecondary;
    }
  };

  const styles = StyleSheet.create({
    nodeContainer: {
      marginLeft: level === 0 ? 0 : spacing.lg,
      marginBottom: spacing.md,
    },
    nodeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      backgroundColor: scheme.surface,
      borderRadius: radius.md,
      borderLeftWidth: 4,
      borderLeftColor: getRoleColor(node.role),
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      elevation: 1,
    },
    avatar: {
      marginRight: spacing.md,
    },
    content: {
      flex: 1,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      color: scheme.textPrimary,
      marginBottom: spacing.xs,
    },
    role: {
      fontSize: 12,
      color: scheme.textSecondary,
    },
    expandButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
    },
    expandButtonText: {
      fontSize: 16,
      color: scheme.primary,
    },
    childrenContainer: {
      marginTop: spacing.md,
    },
    connectorLine: {
      width: 2,
      height: spacing.md,
      backgroundColor: scheme.border,
      marginLeft: spacing.lg + 24, // Avatar size / 2 + spacing
      marginTop: -spacing.md,
    },
  });

  return (
    <View style={styles.nodeContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => node.children.length > 0 && setExpanded(!expanded)}
      >
        <View style={styles.nodeCard}>
          <View style={styles.avatar}>
            <Avatar initials={getInitials(node.name)} size="md" backgroundColor={getRoleColor(node.role)} />
          </View>
          <View style={styles.content}>
            <Text style={styles.name}>{node.name}</Text>
            <Text style={styles.role}>{node.role}</Text>
          </View>
          {node.children.length > 0 && (
            <TouchableOpacity style={styles.expandButton}>
              <Text style={styles.expandButtonText}>{expanded ? '▼' : '▶'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {expanded && node.children.length > 0 && (
        <View style={styles.childrenContainer}>
          {node.children.map((child) => (
            <NodeRenderer
              key={child.id.toString()}
              node={child}
              level={level + 1}
              scheme={scheme}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default function NetworkScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

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
    infoCard: {
      marginBottom: spacing.lg,
    },
    description: {
      fontSize: 14,
      color: scheme.textSecondary,
      lineHeight: 20,
      marginBottom: spacing.md,
    },
    legend: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    legendColor: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: spacing.sm,
    },
    legendLabel: {
      fontSize: 12,
      color: scheme.textSecondary,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="Hierarchy" subtitle="Organizational Structure" />

      <Card style={styles.infoCard}>
        <Text style={styles.description}>
          View the hierarchical structure of your sales organization. Each level shows the reporting relationships between managers and their team members.
        </Text>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.light.danger }]} />
            <Text style={styles.legendLabel}>Admin</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.light.primary }]} />
            <Text style={styles.legendLabel}>SM</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.light.warning }]} />
            <Text style={styles.legendLabel}>RSM</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.light.success }]} />
            <Text style={styles.legendLabel}>Salesman</Text>
          </View>
        </View>
      </Card>

      <View>
        <NodeRenderer
          node={MOCK_HIERARCHY.admin}
          level={0}
          scheme={scheme}
        />
      </View>
    </ScrollView>
  );
}
