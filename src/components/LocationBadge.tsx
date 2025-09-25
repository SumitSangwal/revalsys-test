import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface LocationBadgeProps {
  enabled: boolean;
  onPress: () => void;
}

const LocationBadge: React.FC<LocationBadgeProps> = ({ enabled, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.badge, { backgroundColor: enabled ? 'green' : 'red' }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{enabled ? 'Location ON' : 'Location OFF'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    top: 20,
    left: 20,
    width: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default LocationBadge;
