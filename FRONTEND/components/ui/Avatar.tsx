import React from 'react';
import { Image, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { colors } from '@/lib/colors';
import { spacing, radius } from '@/lib/spacing';

interface AvatarProps {
  initials?: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  backgroundColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials = '?',
  imageUrl,
  size = 'md',
  backgroundColor,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scheme = isDark ? colors.dark : colors.light;

  const sizeMap = {
    sm: { width: 36, height: 36, fontSize: 12 },
    md: { width: 48, height: 48, fontSize: 14 },
    lg: { width: 64, height: 64, fontSize: 16 },
  };

  const sizeConfig = sizeMap[size];

  const styles = StyleSheet.create({
    avatar: {
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.width / 2,
      backgroundColor: backgroundColor || scheme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    avatarImage: {
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.width / 2,
      resizeMode: 'cover',
    },
    text: {
      color: '#FFFFFF',
      fontSize: sizeConfig.fontSize,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.avatar}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.text}>{initials}</Text>
      )}
    </View>
  );
};

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'away';
  size?: 'sm' | 'md';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, size = 'md' }) => {
  const statusColors = {
    active: colors.light.success,
    inactive: colors.light.textMuted,
    away: colors.light.warning,
  };

  const sizeMap = {
    sm: { width: 8, height: 8 },
    md: { width: 12, height: 12 },
  };

  const sizeConfig = sizeMap[size];

  const styles = StyleSheet.create({
    indicator: {
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.width / 2,
      backgroundColor: statusColors[status],
    },
  });

  return <View style={styles.indicator} />;
};
