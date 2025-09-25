import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ResolutionSelectorProps {
  resolution: string;
  setResolution: (res: string) => void;
}

const resolutions = ['720p', '1080p', '4K', 'Auto'];

const ResolutionSelector: React.FC<ResolutionSelectorProps> = ({ resolution, setResolution }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Resolution: {resolution}</Text>
      <View style={styles.buttonsContainer}>
        {resolutions.map(res => (
          <TouchableOpacity
            key={res}
            style={[styles.button, resolution === res && styles.selectedButton]}
            onPress={() => setResolution(res)}
          >
            <Text style={[styles.buttonText, resolution === res && styles.selectedButtonText]}>{res}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#555',
    marginRight: 5,
  },
  selectedButton: {
    backgroundColor: '#f87171',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
});

export default ResolutionSelector;
