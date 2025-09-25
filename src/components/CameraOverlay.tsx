import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ResolutionSelector from './ResolutionSelector';
import LocationBadge from './LocationBadge';
import RecordingButton from './RecordingButton';
import Icon from '@react-native-vector-icons/fontawesome';

interface CameraOverlayProps {
  currentTime: Date;
  timezone: string;
  timestampFormat: string;
  resolution: string;
  recordingTime: number;
  recording: boolean;
  locationTagging: boolean;
  location: { lat: number; lon: number } | null;
  onLocationBadgePress: () => void;
  onRecordingPress: () => void;
  onSettingsPress: () => void;
  formatTimestamp: (date: Date, timezone: string, timestampFormat: string) => string;
  setResolution: (res: string) => void;
}

const CameraOverlay: React.FC<CameraOverlayProps> = ({
  currentTime,
  timezone,
  timestampFormat,
  resolution,
  recordingTime,
  recording,
  locationTagging,
  location,
  onLocationBadgePress,
  onRecordingPress,
  onSettingsPress,
  formatTimestamp,
  setResolution,
}) => {
  return (
    <View style={styles.overlayContainer}>
      {/* Top-left info */}
      <View style={styles.topLeft}>
         <Text style={styles.overlayText}>
          {formatTimestamp(currentTime, timezone, timestampFormat)}
        </Text>
        <Text style={styles.overlayText}>Timezone: {timezone}</Text>
        {locationTagging && location && (
          <Text style={styles.overlayText}>
            Lat: {location.lat.toFixed(5)}, Lon: {location.lon.toFixed(5)}
          </Text>
        )}
        <ResolutionSelector resolution={resolution} setResolution={setResolution} />
        <LocationBadge enabled={locationTagging} onPress={onLocationBadgePress} />
      </View>

      <TouchableOpacity style={styles.settingsIcon} onPress={onSettingsPress}>
        <Icon name="cog" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Bottom-center recording button */}
      <RecordingButton
        recording={recording}
        recordingTime={recordingTime}
        onPress={onRecordingPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: 'space-between',
  },
  topLeft: {
    position: 'absolute',
    top: 40,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    left: 20
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 20,
  },
});

export default CameraOverlay;
