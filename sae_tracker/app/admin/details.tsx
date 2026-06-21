import { deleteSae, getSaeById } from "@/api/api";
import { router, useLocalSearchParams } from "expo-router";
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
import { SAE } from "../../data/mockSaes";
import { BackButton } from "../components/backButton";
import { AdminNav } from "../components/navBar";

// TODO: Remplacer par appel API Spring Boot
// GET fetch(`http://localhost:8080/api/saes/${id}`)
// DELETE fetch(`http://localhost:8080/api/saes/${id}`, { method: 'DELETE' })



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
  red: "#EF4444",
  orange: "#F59E0B",
  text: "#FFFFFF",
  textSub: "#94A3B8",
  textMuted: "#475569",
  success: "#10B981",
};

const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };

type TagProps = {
  text: string;
  color?: string;
};

function Tag({ text, color }: TagProps) {
  return (
    <View
      style={[
        styles.tag,
        color
          ? { backgroundColor: color + "22", borderColor: color + "44" }
          : {},
      ]}
    >
      <Text style={[styles.tagText, color ? { color } : {}]}>
        {text}
      </Text>
    </View>
  );
}

export default function AdminDetails() {
  const { id } = useLocalSearchParams();
  const idNumber = Number(Array.isArray(id) ? id[0] : id);
  const [sae, setSae] = useState<SAE | null>(null);

useEffect(() => {
  const load = async () => {
    const data = await getSaeById(idNumber);
    setSae(data);
  };
  load();
}, []);
  if (!sae)

    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ padding: 24 }}>
          <BackButton />
          <Text style={{ color: COLORS.textSub, marginTop: 20 }}>
            SAE introuvable.
          </Text>
        </View>
        <AdminNav />
      </SafeAreaView>
    );

  const handleDelete = () => {
  Alert.alert(
    "Supprimer la SAE",
    `Voulez-vous vraiment supprimer "${sae?.titre}" ?`,
    [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          await deleteSae(sae!.id);
          router.replace("/admin/saes");
        },
      },
    ]
  );
};

  

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
          <TouchableOpacity
            style={styles.editHeaderBtn}
            onPress={() =>
              router.push({
                pathname: "/admin/modifier",
                params: { id: sae.id },
              })
            }
          >
            <Text style={styles.editHeaderText}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.saeIdBadge}>
              <Text style={styles.saeIdText}>SAE</Text>
            </View>
            </View>

          <Text style={styles.heroTitle}>{sae.titre}</Text>

          <View style={styles.heroMeta}>
            <Text style={styles.heroMetaText}>📚 {sae.module}</Text>
            <Text style={styles.sep}>•</Text>
            <Text style={styles.heroMetaText}>📅 {sae.date}</Text>
          </View>

          {sae.noteGlobale !== undefined && (
            <View style={styles.noteRow}>
              <Text style={styles.noteLabel}>Note globale</Text>
              <View style={styles.noteBadge}>
                <Text style={styles.noteValue}>
                  {sae.noteGlobale}/20
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Description */}
        {sae.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DESCRIPTION</Text>
            <View style={styles.card}>
              <Text style={styles.bodyText}>{sae.description}</Text>
            </View>
          </View>
        )}

        {/* Compétences */}
        {competences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              COMPÉTENCES DÉVELOPPÉES
            </Text>
            <View style={styles.card}>
              <View style={styles.tagRow}>
                {competences.map((c, i) => (
                  <Tag
                    key={i}
                    text={"⚡ " + c}
                    color={COLORS.accentLight}
                  />
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TECHNOLOGIES</Text>
            <View style={styles.card}>
              <View style={styles.tagRow}>
                {technologies.map((t, i) => (
                  <Tag key={i} text={t} />
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Matières & UE */}
        {(matieres.length > 0 || ue.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              MATIÈRES & UE ASSOCIÉES
            </Text>
            <View style={styles.card}>
              {matieres.length > 0 && (
                <View style={styles.tagRow}>
                  {matieres.map((m, i) => (
                    <Tag key={i} text={m} color={COLORS.blue} />
                  ))}
                </View>
              )}

              {ue.length > 0 && (
                <View
                  style={[
                    styles.tagRow,
                    matieres.length > 0 && { marginTop: 8 },
                  ]}
                >
                  {ue.map((u, i) => (
                    <Tag key={i} text={u} color={COLORS.green} />
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Équipe */}
        {(sae.chefProjet || membres.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ÉQUIPE</Text>
            <View style={styles.card}>
              {sae.chefProjet && (
                <>
                  <Text style={styles.subLabel}>Chef de projet</Text>
                  <View style={styles.personRow}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {sae.chefProjet.prenom?.[0]}
                        {sae.chefProjet.nom?.[0]}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.personName}>
                        {sae.chefProjet.prenom} {sae.chefProjet.nom}
                      </Text>
                      <Text style={styles.personSub}>
                        {sae.chefProjet.parcours}
                      </Text>
                    </View>
                  </View>
                </>
              )}

              {membres.length > 0 && (
                <>
                  <Text style={[styles.subLabel, { marginTop: 12 }]}>
                    Membres
                  </Text>
                  {membres.map((m, i) => (
                    <View
                      key={i}
                      style={[
                        styles.personRow,
                        i < membres.length - 1 && { marginBottom: 8 },
                      ]}
                    >
                      <View
                        style={[
                          styles.avatar,
                          { backgroundColor: COLORS.accentBg },
                        ]}
                      >
                        <Text style={styles.avatarText}>
                          {m.prenom?.[0]}
                          {m.nom?.[0]}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.personName}>
                          {m.prenom} {m.nom}
                        </Text>
                        <Text style={styles.personSub}>
                          {m.parcours}
                        </Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        )}

        {/* Professeurs */}
        {profs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PROFESSEURS LIÉS
            </Text>
            <View style={styles.card}>
              {profs.map((p, i) => (
                <View
                  key={i}
                  style={[
                    styles.personRow,
                    i < profs.length - 1 && { marginBottom: 8 },
                  ]}
                >
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: "rgba(34,197,94,0.15)" },
                    ]}
                  >
                    <Text style={styles.avatarText}>
                      {p.prenom?.[0]}
                      {p.nom?.[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.personName}>
                      {p.prenom} {p.nom}
                    </Text>
                    <Text style={styles.personSub}>{p.matiere}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() =>
              router.push({
                pathname: "/admin/modifier",
                params: { id: sae.id },
              })
            }
          >
            <Text style={styles.editBtnText}>
              ✏️ Modifier la SAE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
          >
            <Text style={styles.deleteBtnText}>
              🗑️ Supprimer
            </Text>
          </TouchableOpacity>
        </View>

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
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  pageTitle: { flex: 1, color: COLORS.text, fontSize: 18, fontWeight: "700" },
  editHeaderBtn: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editHeaderText: { fontSize: 18 },
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
  sep: { color: COLORS.textMuted },
  noteRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  noteLabel: { color: COLORS.textSub, fontSize: 13 },
  noteBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  noteValue: { color: "#fff", fontWeight: "800", fontSize: 14 },
  section: { paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  card: {
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
  subLabel: { color: COLORS.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 0.5, marginBottom: 8 },
  personRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(108,71,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: COLORS.accentLight, fontWeight: "700", fontSize: 13 },
  personName: { color: COLORS.text, fontWeight: "600", fontSize: 13 },
  personSub: { color: COLORS.textMuted, fontSize: 11 },
  actions: { paddingHorizontal: 24, gap: 10 },
  editBtn: {
    backgroundColor: COLORS.accent,
    padding: 16,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  editBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  deleteBtn: {
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.25)",
    padding: 16,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  deleteBtnText: { color: COLORS.red, fontWeight: "700", fontSize: 15 },
});
 