import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
 
type Props = {
  label?: string;
};
 
export function BackButton({ label = "Retour" }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
      <Text style={styles.arrow}>←</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
 
export default BackButton;
 
const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#141B2D",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#1E2A45",
  },
  arrow: { color: "#FFFFFF", fontSize: 16 },
  label: { color: "#94A3B8", fontSize: 13, fontWeight: "600" },
});
 