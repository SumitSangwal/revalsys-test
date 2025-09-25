import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useAppTheme } from "../../utils/themehelper";

interface Props {
  value: boolean;
  onToggle: () => void;
}

export default function LocationSwitch({ value, onToggle }: Props) {
  const {isDark} = useAppTheme();
  return (
    <View style={styles.row}>
      <Text style={[styles.text,{color: isDark ? '#fff' : '#000'}]}>Enable Location</Text>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  text: { fontSize: 14 },
});
