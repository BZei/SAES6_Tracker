import { router } from "expo-router";
import React from "react";
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
 

// TODO: Remplacer par appel API Spring Boot
// GET fetch("http://localhost:8080/api/auth/me")
 
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
 
export default function Profil() {
  const infoRows = [
    { icon: "👤", label: "Nom", value: "Admin" },
    { icon: "✉️", label: "Email", value: "admin@mmi.fr" },
    { icon: "🎓", label: "Formation", value: "BUT MMI" },
    { icon: "📍", label: "Parcours", value: "Dév. Web & Dispositifs Interactifs" },
    { icon: "🏫", label: "Promotion", value: "S4" },
  ];
 
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Mon Profil</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
 
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={styles.adminPill}>
              <Text style={styles.adminPillText}>ADMIN</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Admin</Text>
            <Text style={styles.profileSub}>BUT MMI — S4</Text>
            <Text style={styles.profileEmail}>admin@mmi.fr</Text>
          </View>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>✏️ Modifier le profil</Text>
          </TouchableOpacity>
        </View>
 
        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMATIONS</Text>
          <View style={styles.infoCard}>
            {infoRows.map((row, i) => (
              <View
                key={i}
                style={[styles.infoRow, i < infoRows.length - 1 && styles.infoRowBorder]}
              >
                <Text style={styles.infoIcon}>{row.icon}</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>{row.label}</Text>
                  <Text style={styles.infoValue}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
 
        {/* SAE récentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>MES SAE</Text>
            <TouchableOpacity onPress={() => router.push("/admin/saes")}>
              <Text style={styles.voir}>Voir tout →</Text>
            </TouchableOpacity>
          </View>
          {mockSaes.slice(0, 2).map((sae) => (
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
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 16,
  },
  pageTitle: { color: COLORS.text, fontSize: 24, fontWeight: "800" },
  settingsBtn: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  settingsIcon: { fontSize: 20 },
  profileCard: {
    marginHorizontal: 24,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.accentBg,
    borderWidth: 2,
    borderColor: COLORS.accentGlow,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: COLORS.accentLight, fontSize: 28, fontWeight: "800" },
  adminPill: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  adminPillText: { color: "#fff", fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  profileInfo: { alignItems: "center", gap: 2 },
  profileName: { color: COLORS.text, fontSize: 20, fontWeight: "800" },
  profileSub: { color: COLORS.textSub, fontSize: 13 },
  profileEmail: { color: COLORS.textMuted, fontSize: 12 },
  editProfileBtn: {
    backgroundColor: COLORS.accentBg,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.accentGlow,
  },
  editProfileText: { color: COLORS.accentLight, fontSize: 13, fontWeight: "600" },
  section: { paddingHorizontal: 24, marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
  },
  voir: { color: COLORS.accentLight, fontSize: 13, fontWeight: "600" },
  infoCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  infoIcon: { fontSize: 18, width: 24, textAlign: "center" },
  infoContent: { flex: 1 },
  infoLabel: { color: COLORS.textMuted, fontSize: 11, fontWeight: "600" },
  infoValue: { color: COLORS.text, fontSize: 14, fontWeight: "500", marginTop: 1 },
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
 