import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setTimezone } from "../../redux/actions/settingsActions";
import { useAppTheme } from "../../utils/themehelper";

interface Props {
  currentTimezone: string;
}

const timezones = ["UTC", "Asia/Kolkata", "America/New_York"];

export default function TimezoneSelector({ currentTimezone }: Props) {
  const dispatch = useDispatch();
  const {isDark} = useAppTheme();

  return (
    <View style={styles.row}>
      {timezones.map(tz => (
        <TouchableOpacity
          key={tz}
          style={[styles.option, currentTimezone === tz && styles.selected]}
          onPress={() => dispatch(setTimezone(tz))}
        >
          <Text style={[styles.text, {color: isDark ? '#fff' : '#000'}, currentTimezone === tz && styles.textSelected]}>
            {tz}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  option: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginRight: 10, marginBottom: 10 },
  selected: { backgroundColor: "#007bff", borderColor: "#007bff" },
  text: { fontSize: 14 },
  textSelected: { color: "#fff", fontWeight: "bold" },
});
