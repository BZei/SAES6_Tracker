import { getSaeById } from "@/api/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BackButton } from "./components/backButton";
import { VisitorNav } from "./components/navBar";
 
// TODO: Remplacer par appel API Spring Boot
// GET fetch(`http://localhost:8080/api/saes/${id}`)
 
const COLORS = {
  bg: "#080C1A",
  bgCard: "#0F1530",
  bgCardAlt: "#141B2D",
  border: "#1E2A45",
  accent: "#6C47FF",
  accentLight: "#8B6DFF",
  accentGlow: "rgba(108, 71, 255, 0.25)",
  accentBg: "rgba(108, 71, 255, 0.15)",
  blue: "#4F8EF7",
  green: "#22C55E",
  text: "#FFFFFF",
  textSub: "#94A3B8",
  textMuted: "#475569",
  success: "#10B981",
  orange: "#F59E0B",
};
 
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };
 
function Tag({ text, color }: { text: string; color?: string }) {
  return (
    <View style={[styles.tag, color ? { backgroundColor: color + "22", borderColor: color + "44" } : {}]}>
      <Text style={[styles.tagText, color ? { color } : {}]}>{text}</Text>
    </View>
  );
}
 
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}
 
export default function Details() {
  const { id } = useLocalSearchParams();
  const [sae, setSae] = useState<any>(null);

useEffect(() => {
  const load = async () => {
    const idNumber = Array.isArray(id) ? id[0] : id;

    const data = await getSaeById(Number(idNumber));
    setSae(data);
  };
  load();
}, [id]);

  if (!sae) return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 24 }}>
        <BackButton />
        <Text style={{ color: COLORS.textSub, marginTop: 20 }}>SAE introuvable.</Text>
      </View>
      <VisitorNav />
    </SafeAreaView>
  );
 
  const statutColor =
    sae.statut === "Terminé" ? COLORS.success :
    sae.statut === "En cours" ? COLORS.accentLight :
    COLORS.orange;
 
  // Sécurisation des champs pouvant être undefined
  const technologies = sae.technologies ?? [];
  const competences = sae.competences ?? [];
  const matieres = sae.matieres ?? [];
  const ue = sae.ue ?? [];
  const membres = sae.membres ?? [];
  const profs = sae.profs ?? [];
 
 
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.pageTitle}>Détail SAE</Text>
        </View>
 
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.saeIdBadge}>
              <Text style={styles.saeIdText}>SAE</Text>
            </View>
            <View style={[styles.statutBadge, { backgroundColor: statutColor + "22" }]}>
              <View style={[styles.dot, { backgroundColor: statutColor }]} />
              <Text style={[styles.statutText, { color: statutColor }]}>{sae.statut}</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{sae.titre}</Text>
          <View style={styles.heroMeta}>
            <Text style={styles.heroMetaText}>📚 {sae.module}</Text>
            <Text style={styles.heroMetaDot}>•</Text>
            <Text style={styles.heroMetaText}>📅 {sae.date}</Text>
          </View>
          {sae.noteGlobale !== undefined && (
            <View style={styles.noteRow}>
              <Text style={styles.noteLabel}>Note globale</Text>
              <View style={styles.noteBadge}>
                <Text style={styles.noteValue}>{sae.noteGlobale}/20</Text>
              </View>
            </View>
          )}
        </View>
 
        {/* Description */}
        {sae.description ? (
          <Section title="DESCRIPTION">
            <Text style={styles.bodyText}>{sae.description}</Text>
          </Section>
        ) : null}
 
        {/* Compétences */}
        {competences.length > 0 && (
          <Section title="COMPÉTENCES DÉVELOPPÉES">
            <View style={styles.tagRow}>
              {competences.map((c: string, i: number) => (
                <Tag key={i} text={"⚡ " + c} color={COLORS.accentLight} />
              ))}
            </View>
          </Section>
        )}
 
        {/* Technologies */}
        {technologies.length > 0 && (
          <Section title="TECHNOLOGIES">
            <View style={styles.tagRow}>
              {technologies.map((t: string, i: number) => (
                <Tag key={i} text={t} />
              ))}
            </View>
          </Section>
        )}
 
        {/* Matières & UE */}
        {(matieres.length > 0 || ue.length > 0) && (
          <Section title="MATIÈRES & UE ASSOCIÉES">
            {matieres.length > 0 && (
              <View style={styles.tagRow}>
                {matieres.map((m: string, i: number) => (
                  <Tag key={i} text={m} color={COLORS.blue} />
                ))}
              </View>
            )}
            {ue.length > 0 && (
              <View style={[styles.tagRow, matieres.length > 0 && { marginTop: 8 }]}>
                {ue.map((u: string, i: number) => (
                  <Tag key={i} text={u} color={COLORS.green} />
                ))}
              </View>
            )}
          </Section>
        )}
 
        {/* Chef de projet */}
        {sae.chefProjet && (
          <Section title="CHEF DE PROJET">
            <View style={styles.personCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {sae.chefProjet.prenom?.[0]}{sae.chefProjet.nom?.[0]}
                </Text>
              </View>
              <View>
                <Text style={styles.personName}>{sae.chefProjet.prenom} {sae.chefProjet.nom}</Text>
                <Text style={styles.personSub}>{sae.chefProjet.formation}</Text>
                <Text style={styles.personSub}>{sae.chefProjet.parcours}</Text>
              </View>
            </View>
          </Section>
        )}
 
        {/* Membres */}
        {membres.length > 0 && (
          <Section title={`MEMBRES DU GROUPE (${membres.length})`}>
            {membres.map((m, i: number) => (
              <View key={i} style={[styles.personCard, i < membres.length - 1 && { marginBottom: 10 }]}>
                <View style={[styles.avatar, { backgroundColor: COLORS.accentBg }]}>
                  <Text style={styles.avatarText}>{m.prenom?.[0]}{m.nom?.[0]}</Text>
                </View>
                <View>
                  <Text style={styles.personName}>{m.prenom} {m.nom}</Text>
                  <Text style={styles.personSub}>{m.formation}</Text>
                  <Text style={styles.personSub}>{m.parcours}</Text>
                </View>
              </View>
            ))}
          </Section>
        )}
 
        {/* Professeurs */}
        {profs.length > 0 && (
          <Section title="PROFESSEURS LIÉS">
            {profs.map((p, i: number) => (
              <View key={i} style={[styles.personCard, i < profs.length - 1 && { marginBottom: 10 }]}>
                <View style={[styles.avatar, { backgroundColor: "rgba(34,197,94,0.15)" }]}>
                  <Text style={styles.avatarText}>{p.prenom?.[0]}{p.nom?.[0]}</Text>
                </View>
                <View>
                  <Text style={styles.personName}>{p.prenom} {p.nom}</Text>
                  <Text style={styles.personSub}>{p.matiere}</Text>
                </View>
              </View>
            ))}
          </Section>
        )}
 
        <View style={{ height: 24 }} />
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
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  pageTitle: { color: COLORS.text, fontSize: 18, fontWeight: "700" },
  heroCard: {
    marginHorizontal: 24,
    backgroundColor: COLORS.accentBg,
    borderRadius: RADIUS.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.accentGlow,
    marginBottom: 20,
  },
  heroTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  saeIdBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  saeIdText: { color: "#fff", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  statutBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  statutText: { fontSize: 12, fontWeight: "700" },
  heroTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 10,
  },
  heroMeta: { flexDirection: "row", gap: 6, alignItems: "center", marginBottom: 14 },
  heroMetaText: { color: COLORS.textSub, fontSize: 13 },
  heroMetaDot: { color: COLORS.textMuted },
  noteRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  noteLabel: { color: COLORS.textSub, fontSize: 13 },
  noteBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  noteValue: { color: "#fff", fontWeight: "800", fontSize: 14 },
  section: { paddingHorizontal: 24, marginBottom: 20 },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
  },
  sectionBody: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bodyText: { color: COLORS.textSub, fontSize: 14, lineHeight: 22 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  tagText: { color: COLORS.textSub, fontSize: 12, fontWeight: "500" },
  personCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(108,71,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: COLORS.accentLight, fontWeight: "700", fontSize: 14 },
  personName: { color: COLORS.text, fontWeight: "600", fontSize: 14 },
  personSub: { color: COLORS.textMuted, fontSize: 12 },
});
 