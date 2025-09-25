import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setTheme } from "../../redux/actions/settingsActions";
import { useAppTheme } from "../../utils/themehelper";

interface Props {
  currentTheme: string;
}

const themes = ["system", "light", "dark"];

export default function ThemeSelector({ currentTheme }: Props) {
  const dispatch = useDispatch();
  const { isDark } = useAppTheme();

  return (
    <View style={styles.row}>
      {themes.map(t => (
        <TouchableOpacity
          key={t}
          style={[styles.option, currentTheme === t && styles.selected]}
          onPress={() => dispatch(setTheme(t))}
        >
          <Text style={[styles.text, currentTheme === t && styles.textSelected, {color: isDark ? '#fff' : '#000'}]}>
            {t}
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
