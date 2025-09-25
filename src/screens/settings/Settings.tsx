import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useNavigation } from "@react-navigation/native";
import Icon from "@react-native-vector-icons/fontawesome";

import ThemeSelector from "../../components/Settings/ThemeSelector";
import ResolutionSelector from "../../components/Settings/ResolutionSelector";
import TimestampSelector from "../../components/Settings/TimestampSelector";
import TimezoneSelector from "../../components/Settings/TimezoneSelector";
import LocationSwitch from "../../components/Settings/LocationSwitch";

import { styles } from "./Settings.styles";
import { useAppTheme } from "../../utils/themehelper";
import { toggleLocationTagging } from "../../redux/actions/settingsActions";

export default function SettingsScreen() {
  const settings = useSelector((state: RootState) => state.cameraSettings);
  const navigation = useNavigation();
  const { isDark } = useAppTheme();
  const dispatch = useDispatch();
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: isDark ? '#fff' : '#000'}]}>Settings</Text>
      </View>

      <Text style={[styles.sectionTitle,{color: isDark ? '#fff' : '#000'}]}>Theme</Text>
      <ThemeSelector currentTheme={settings.theme} />

      <Text style={[styles.sectionTitle, {color: isDark ? '#fff' : '#000'}]}>Video Resolution</Text>
      <ResolutionSelector currentResolution={settings.resolution} />

      <Text style={[styles.sectionTitle, {color: isDark ? '#fff' : '#000'}]}>Timestamp Format</Text>
      <TimestampSelector currentFormat={settings.timestampFormat} />

      <Text style={[styles.sectionTitle, {color: isDark ? '#fff' : '#000'}]}>Timezone</Text>
      <TimezoneSelector currentTimezone={settings.timezone} />

      <Text style={[styles.sectionTitle, {color: isDark ? '#fff' : '#000'}]}>Location Tagging</Text>
      <LocationSwitch
        value={settings.locationTagging}
        onToggle={() => dispatch(toggleLocationTagging())}
      />
    </ScrollView>
  );
}
