import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RecordingButtonProps {
  recording: boolean;
  recordingTime: number;
  onPress: () => void;
}

const RecordingButton: React.FC<RecordingButtonProps> = ({ recording, recordingTime, onPress }) => {
  return (
    <View style={styles.container}>
      {recording && (
        <Text style={[styles.overlayText, { marginBottom: 5 }]}>
          {Math.floor(recordingTime / 60)}:
          {(recordingTime % 60).toString().padStart(2, '0')}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, recording ? styles.recordingActive : {}]}
        onPress={onPress}
      >
        <Text style={styles.text}>{recording ? 'Stop' : 'Rec'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f87171',
  },
  recordingActive: {
    backgroundColor: '#000',
    borderColor: '#f87171',
    borderWidth: 4,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecordingButton;
