import { getSaes } from "@/api/api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { mockSaes } from "../../data/mockSaes";
import { AdminNav } from "../components/navBar";
 

// TODO: Remplacer mockSaes par appel API Spring Boot
// GET fetch("http://localhost:8080/api/saes")
 
const COLORS = {
  bg: "#080C1A",
  bgCard: "#0F1530",
  border: "#1E2A45",
  accent: "#6C47FF",
  accentLight: "#8B6DFF",
  accentGlow: "rgba(108, 71, 255, 0.25)",
  accentBg: "rgba(108, 71, 255, 0.15)",
  red: "#EF4444",
  text: "#FFFFFF",
  textSub: "#94A3B8",
  textMuted: "#475569",
};
 
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };
 
export default function AdminHome() {
  const [saes, setSaes] = useState([]);
  const quickActions = [
    { icon: "📋", label: "Liste SAE", sub: "Voir & gérer", route: "/admin/saes" },
    { icon: "➕", label: "Ajouter", sub: "Nouvelle SAE", route: "/admin/ajouter" },
    { icon: "👤", label: "Profil", sub: "Mes infos", route: "/admin/profile" },
  ];
 
 useEffect(() => {
    const load = async () => {
      const data = await getSaes();
      setSaes(data);
    };
    load();
  }, []);



  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour, Admin 👋</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>ADMIN</Text>
          </View>
        </View>
 
        {/* Quick actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACTIONS RAPIDES</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((a) => (
              <TouchableOpacity
                key={a.route}
                style={styles.actionCard}
                onPress={() => router.push(a.route as any)}
                activeOpacity={0.75}
              >
                <Text style={styles.actionIcon}>{a.icon}</Text>
                <Text style={styles.actionLabel}>{a.label}</Text>
                <Text style={styles.actionSub}>{a.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
 
        {/* SAE récentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SAE RÉCENTES</Text>
            <TouchableOpacity onPress={() => router.push("/admin/saes")}>
              <Text style={styles.voir}>Voir tout →</Text>
            </TouchableOpacity>
          </View>
          {mockSaes.slice(0, 3).map((sae) => (
            <TouchableOpacity
              key={sae.id}
              style={styles.miniCard}
              onPress={() =>
                router.push({ pathname: "/admin/details", params: { id: String(sae.id) } })
              }
            >
              <View style={styles.miniLeft}>
                <Text style={styles.miniTitle} numberOfLines={1}>{sae.titre}</Text>
                <Text style={styles.miniSub}>{sae.module} • {sae.statut}</Text>
              </View>
              <Text style={styles.miniArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
 
        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>🚪 Se déconnecter</Text>
        </TouchableOpacity>
 
        <View style={{ height: 24 }} />
      </ScrollView>
 
      <AdminNav />
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
  },
  greeting: { color: COLORS.textSub, fontSize: 14, marginBottom: 2 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  adminBadge: {
    backgroundColor: COLORS.accentBg,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.accentGlow,
  },
  adminBadgeText: { color: COLORS.accentLight, fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
  },
  actionsGrid: { flexDirection: "row", gap: 10 },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 16,
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionIcon: { fontSize: 24, marginBottom: 4 },
  actionLabel: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  actionSub: { color: COLORS.textMuted, fontSize: 11 },
  voir: { color: COLORS.accentLight, fontSize: 13, fontWeight: "600" },
  miniCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  miniLeft: { flex: 1 },
  miniTitle: { color: COLORS.text, fontSize: 14, fontWeight: "600" },
  miniSub: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  miniArrow: { color: COLORS.textMuted, fontSize: 18, marginLeft: 8 },
  logoutBtn: {
    marginHorizontal: 24,
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.25)",
    borderRadius: RADIUS.lg,
    padding: 16,
    alignItems: "center",
  },
  logoutText: { color: COLORS.red, fontWeight: "700", fontSize: 15 },
});
 