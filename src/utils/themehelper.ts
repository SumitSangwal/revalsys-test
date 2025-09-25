import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

export const useAppTheme = () => {
  const systemTheme = useColorScheme();
  const theme = useSelector((state: RootState) => state.cameraSettings.theme);

  const isDark = theme === 'system' ? systemTheme === 'dark' : theme === 'dark';
  return { isDark };
};