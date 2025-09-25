import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setTimestampFormat } from "../../redux/actions/settingsActions";
import { useAppTheme } from "../../utils/themehelper";
interface Props {
  currentFormat: string;
}

const formats = ["DD/MM/YYYY HH:mm", "MM-DD-YYYY hh:mm A"];

export default function TimestampSelector({ currentFormat }: Props) {
  const dispatch = useDispatch();
  const {isDark} = useAppTheme();

  return (
    <View style={styles.row}>
      {formats.map(f => (
        <TouchableOpacity
          key={f}
          style={[styles.option, currentFormat === f && styles.selected]}
          onPress={() => dispatch(setTimestampFormat(f))}
        >
          <Text style={[styles.text, currentFormat === f && styles.textSelected, {color: isDark ? '#fff' : '#000'}]}>
            {f}
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
