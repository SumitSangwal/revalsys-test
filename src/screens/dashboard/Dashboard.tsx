import Geolocation from '@react-native-community/geolocation';
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  NativeModules,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Text,
  Alert,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
  VideoFile,
} from 'react-native-vision-camera';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import {
  setResolution,
  toggleLocationTagging,
} from '../../redux/actions/settingsActions';
import RNFS from 'react-native-fs';
import moment from 'moment-timezone';

import { styles } from './Dashboard.styles';
import CameraOverlay from '../../components/CameraOverlay';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../utils/themehelper';

const { ManageExternalStorage } = NativeModules;

export default function Dashboard() {
  const camera = useRef<Camera>(null);
  const devices: CameraDevice[] = useCameraDevices() || [];
  const device = devices.find(d => d.position === 'back');

  const dispatch = useDispatch();
  const { resolution, timestampFormat, timezone, locationTagging } =
    useSelector((state: RootState) => state.cameraSettings);

  const [cameraPermission, setCameraPermission] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoFormat, setVideoFormat] = useState<any>(null);
  const navigation = useNavigation();
  const { isDark } = useAppTheme();

  const resolutionMap: any = {
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
  '4K': { width: 3840, height: 2160 },
  'Auto': null,
};


useEffect(() => {
  if (!device) return;

  const target = resolutionMap[resolution];

  let selectedFormat;
  if (target) {
    // Find closest matching format
    selectedFormat = device.formats.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.videoWidth - target.width) + Math.abs(prev.videoHeight - target.height);
      const currDiff = Math.abs(curr.videoWidth - target.width) + Math.abs(curr.videoHeight - target.height);
      return currDiff < prevDiff ? curr : prev;
    });
  } else {
    // Auto = pick the first supported format
    selectedFormat = device.formats[0];
  }

  setVideoFormat(selectedFormat);
}, [device, resolution]);

  // Permissions
  useEffect(() => {
    (async () => {
      const camGranted = await requestCameraPermissions();
      const locGranted = await requestLocationPermissions(); // optional
    })();
  }, []);
  async function requestCameraPermissions() {
    const camStatus: any = await Camera.getCameraPermissionStatus();
    const micStatus: any = await Camera.getMicrophonePermissionStatus();

    if (camStatus !== 'granted') {
      const camReq: any = await Camera.requestCameraPermission();
      setCameraPermission(camReq === 'granted');
    } else setCameraPermission(true);

    if (micStatus !== 'granted') {
      const micReq: any = await Camera.requestMicrophonePermission();
      setMicrophonePermission(micReq === 'granted');
    } else setMicrophonePermission(true);
  }

  const requestLocationPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!granted) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (result !== PermissionsAndroid.RESULTS.GRANTED) return;
      }
    }

    Geolocation.getCurrentPosition(
      pos =>
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      err => console.error(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const formatTimestamp = (
    date: Date,
    timezone: string,
    timestampFormat: string,
  ) => {
    return moment(date).tz(timezone).format(timestampFormat);
  };

  const onLocationBadgePress = async () => {
    dispatch(toggleLocationTagging());
    if (!locationTagging) await requestLocationPermissions();
  };

  const setResolutionHandler = (res: string) => {
    dispatch(setResolution(res));
  };

  const onRecordingPress = async () => {
    if (!camera.current) return;
    if (recording) {
      await camera.current.stopRecording();
      setRecording(false);
    } else {
      setRecording(true);
      setRecordingTime(0);
      const timer = setInterval(() => setRecordingTime(prev => prev + 1), 1000);

      camera.current.startRecording({
        onRecordingFinished: async (video: VideoFile) => {
          clearInterval(timer);
          setRecording(false);
          Alert.alert('Video saved at:', video.path);
        },
        onRecordingError: e => {
          console.error(e);
          clearInterval(timer);
          setRecording(false);
        },
        fileType: 'mp4',
        videoCodec: 'H264',
        qualityPrioritization: 'speed',
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
       <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000' : '#fff'}
      />
      {cameraPermission && microphonePermission && device ? (
        <>
          <Camera
            ref={camera}
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            video
            audio
            format={videoFormat}
          />

          <CameraOverlay
            currentTime={currentTime}
            timezone={timezone}
            timestampFormat={timestampFormat}
            resolution={resolution}
            recordingTime={recordingTime}
            recording={recording}
            locationTagging={locationTagging}
            location={location}
            onLocationBadgePress={onLocationBadgePress}
            onRecordingPress={onRecordingPress}
            onSettingsPress={() => navigation.navigate('settings')}
            formatTimestamp={formatTimestamp}
            setResolution={setResolutionHandler}
          />
        </>
      ) : (
        <View style={styles.center}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Waiting for camera permissions...
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestCameraPermissions}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Grant Permissions
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
