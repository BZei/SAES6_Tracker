import { deleteSae, getSaes } from "@/api/api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AdminNav } from "../components/navBar";
import SaeCard from "../components/saeCard";
 
// TODO: Remplacer mockSaes par appel API Spring Boot
// GET fetch("http://localhost:8080/api/saes")
// DELETE fetch(`http://localhost:8080/api/saes/${id}`, { method: 'DELETE' })


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
  red: "#EF4444",
};
 
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };
 
export default function AdminSaes() {
  
  const [saes, setSaes] = useState<any>([]);

  const load = async () => {
  const data = await getSaes();
  console.log("DATA API:", data);

  if (Array.isArray(data)) {
    setSaes(data);
  } else {
    setSaes([]);
  }
};

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Supprimer la SAE",
      "Cette action est irréversible. Confirmer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            await deleteSae(id);
            load();
          },
        },
      ]
    );
  };
  

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Mes SAE</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{saes.length}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/admin/ajouter")}
        >
          <Text style={styles.addBtnText}>+ Ajouter</Text>
        </TouchableOpacity>
      </View>
 
      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ padding: 20, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {saes.map((sae: any) => (
          <SaeCard
            key={sae.id}
            sae={sae}
            onPress={() =>
              router.push({ pathname: "/admin/details", params: { id: String(sae.id) } })
            }
            onDelete={() => handleDelete(sae.id)}
            showDelete
          />
        ))}
        <View style={{ height: 16 }} />
      </ScrollView>
 
      <AdminNav />
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
  addBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  list: { flex: 1 },
});
 