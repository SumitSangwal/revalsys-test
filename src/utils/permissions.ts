import { PermissionsAndroid, Platform } from "react-native";

export async function requestLocationPermission() {
  if (Platform.OS !== "android") return true;

  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  if (granted) return true;

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Location Permission",
      message: "App needs access to your location",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  );

  return result === PermissionsAndroid.RESULTS.GRANTED;
}
