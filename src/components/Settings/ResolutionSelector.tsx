import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setResolution } from "../../redux/actions/settingsActions";
import { useAppTheme } from "../../utils/themehelper";

interface Props {
  currentResolution: string;
}

const resolutions = ["Auto", "720p", "1080p", "4K"];

export default function ResolutionSelector({ currentResolution }: Props) {
  const dispatch = useDispatch();
  const { isDark } = useAppTheme();

  return (
    <View style={styles.row}>
      {resolutions.map(res => (
        <TouchableOpacity
          key={res}
          style={[styles.option, currentResolution === res && styles.selected]}
          onPress={() => dispatch(setResolution(res))}
        >
          <Text style={[styles.text, {color: isDark ? '#fff' : '#000'}, currentResolution === res && styles.textSelected]}>
            {res}
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
  text: { fontSize: 14},
  textSelected: { color: "#fff", fontWeight: "bold" },
});
