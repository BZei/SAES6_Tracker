import { getSaes } from "@/api/api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { VisitorNav } from "./components/navBar";
import SaeCard from "./components/saeCard";
 
// TODO: Remplacer mockSaes par appel API Spring Boot
// GET fetch("http://localhost:8080/api/saes")
 
const COLORS = {
  bg: "#080C1A",
  bgCard: "#0F1530",
  border: "#1E2A45",
  accent: "#6C47FF",
  accentLight: "#8B6DFF",
  accentBg: "rgba(108, 71, 255, 0.15)",
  text: "#FFFFFF",
  textSub: "#94A3B8",
  textMuted: "#475569",
};
 
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };
 
export default function Saes() {
  const [saes, setSaes] = useState([]);

useEffect(() => {
    const load = async () => {
      const data = await getSaes();
      setSaes(data);
    };
    load();
  }, []);


  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Les SAE</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{saes.length}</Text>
          </View>
        </View>
      </View>
 
      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ padding: 20, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {saes.map((sae) => (
          <SaeCard
            key={sae.id}
            sae={sae}
            onPress={() =>
              router.push({ pathname: "/details", params: { id: String(sae.id) } })
            }
          />
        ))}
        <View style={{ height: 16 }} />
      </ScrollView>
 
      <VisitorNav />
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { color: COLORS.text, fontSize: 22, fontWeight: "800" },
  badge: {
    backgroundColor: COLORS.accentBg,
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { color: COLORS.accentLight, fontSize: 13, fontWeight: "700" },
  list: { flex: 1 },
});
 