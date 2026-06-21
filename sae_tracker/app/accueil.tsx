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
import { mockSaes } from "../data/mockSaes";
import { VisitorNav } from "./components/navBar";

// TODO: Remplacer mockSaes par appel API Spring Boot
// GET fetch("http://localhost:8080/api/saes?limit=2")
 
const COLORS = {
  bg: "#080C1A",
  bgCard: "#0F1530",
  border: "#1E2A45",
  accent: "#6C47FF",
  accentLight: "#8B6DFF",
  accentGlow: "rgba(108, 71, 255, 0.25)",
  accentBg: "rgba(108, 71, 255, 0.15)",
  text: "#FFFFFF",
  textSub: "#94A3B8",
  textMuted: "#475569",
};
 
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };
 
export default function AccueilVisiteur() {
  const saesRecentes = mockSaes.slice(0, 2);
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
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour 👋</Text>
            <Text style={styles.heroSub}>
              Suivez les projets académiques, compétences d'étudiants en BUT MMI.
            </Text>
          </View>
          <View style={styles.logoSmall}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
        </View>
 
        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BUT MMI</Text>
          <Text style={styles.sectionText}>
            Le BUT Métiers du Multimédia et de l'Internet forme aux métiers du web,
            du développement, du design, de la communication et de l'audiovisuel.
            Les SAE sont des projets réalisés par les étudiants durant leur formation.
          </Text>
        </View>
 
        {/* SAE récentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SAE récentes</Text>
            <TouchableOpacity onPress={() => router.push("/saes")}>
              <Text style={styles.voir}>Voir tout →</Text>
            </TouchableOpacity>
          </View>
          {saesRecentes.map((sae) => (
            <TouchableOpacity
              key={sae.id}
              style={styles.miniCard}
              onPress={() =>
                router.push({ pathname: "/details", params: { id: String(sae.id) } })
              }
            >
              <View style={styles.miniCardLeft}>
                <Text style={styles.miniTitle} numberOfLines={1}>{sae.titre}</Text>
                <Text style={styles.miniSub}>{sae.module} • {sae.statut}</Text>
              </View>
              <Text style={styles.miniArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
 
        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => router.push("/saes")}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Voir toutes les SAE</Text>
        </TouchableOpacity>
 
        <View style={{ height: 20 }} />
      </ScrollView>
 
      <VisitorNav />
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
    gap: 12,
  },
  greeting: { color: COLORS.textSub, fontSize: 14, marginTop: 20 },
  heroSub: {
    color: COLORS.textSub,
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 38,
    letterSpacing: -0.5,
    marginTop: 20,
    marginBottom: 25,
  },
  logoSmall: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.accentBg,
    borderWidth: 1,
    borderColor: COLORS.accentGlow,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  logoEmoji: { fontSize: 24 },
  section: { paddingHorizontal: 24, marginBottom: 40 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700", marginBottom: 10 },
  sectionText: { color: COLORS.textSub, fontSize: 14, lineHeight: 22 },
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
  miniCardLeft: { flex: 1 },
  miniTitle: { color: COLORS.text, fontSize: 14, fontWeight: "600" },
  miniSub: { color: COLORS.textMuted, fontSize: 12, marginTop: 3 },
  miniArrow: { color: COLORS.textMuted, fontSize: 18, marginLeft: 8 },
  ctaBtn: {
    backgroundColor: COLORS.accent,
    marginHorizontal: 24,
    padding: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
 