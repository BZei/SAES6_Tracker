import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
 
const COLORS = {
  bg: "#080C1A",
  bgCard: "#0F1530",
  border: "#1E2A45",
  accent: "#6C47FF",
  accentGlow: "rgba(108, 71, 255, 0.25)",
  accentBg: "rgba(108, 71, 255, 0.15)",
  text: "#FFFFFF",
  textSub: "#94A3B8",
  textMuted: "#475569",
};
 
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };
 
export default function Index() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo + Branding */}
        <View style={styles.hero}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
          <Text style={styles.appName}>SAE Tracker</Text>
          <Text style={styles.sub}>
            Plateforme de consultation des SAE réalisées{"\n"}
            par les étudiants du BUT MMI.
          </Text>
        </View>
 
        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => router.push("/accueil")}
            activeOpacity={0.85}
          >
            <Text style={styles.btnPrimaryText}>Entrer comme visiteur →</Text>
          </TouchableOpacity>
 
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => router.push("/login")}
            activeOpacity={0.85}
          >
            <Text style={styles.btnOutlineText}>🔐 Connexion Admin</Text>
          </TouchableOpacity>
        </View>
 
        <Text style={styles.footer}>BUT MMI • Université</Text>
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  hero: { alignItems: "center", gap: 12 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.accentBg,
    borderWidth: 1,
    borderColor: COLORS.accentGlow,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 100,
  },
  logoEmoji: { fontSize: 36 },
  appName: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  sub: {
    color: COLORS.textSub,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 10,
  },
  actions: { gap: 12 },
  btnPrimary: {
    backgroundColor: COLORS.accent,
    padding: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  btnOutline: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    backgroundColor: COLORS.bgCard,
  },
  btnOutlineText: { color: COLORS.textSub, fontWeight: "600", fontSize: 15 },
  footer: { color: COLORS.textMuted, textAlign: "center", fontSize: 12 },
});
 