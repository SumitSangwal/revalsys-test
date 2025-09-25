import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  recordButton: {
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
  recordText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    bottom: 150,
    left: 20,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  resolutionContainer: {
    marginTop: 10,
  },
  resolutionButtons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  resButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#555',
    marginRight: 5,
  },
  resButtonSelected: {
    backgroundColor: '#f87171',
  },
  resButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  resButtonTextSelected: {
    fontWeight: 'bold',
  },
  locationBadge: {
    position: 'absolute',
    top: 80,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  locationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  permissionButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
});
