import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, RADIUS } from "../../constants/theme";
 
type Sae = {
  id: string | number;
  titre: string;
  module: string;
  statut: string;
  date?: string;
  technologies?: string[];
  description?: string;
};
 
type Props = {
  sae: Sae;
  onPress: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
};
 
function getStatutStyle(statut: string) {
  switch (statut) {
    case "Terminé":
      return { bg: COLORS.successBg, text: COLORS.success, dot: COLORS.success };
    case "En cours":
      return { bg: COLORS.accentBg, text: COLORS.accentLight, dot: COLORS.accentLight };
    case "Prévu":
      return { bg: COLORS.warningBg, text: COLORS.orange, dot: COLORS.orange };
    default:
      return { bg: COLORS.bgCardAlt, text: COLORS.textSub, dot: COLORS.textSub };
  }
}
 
export default function SaeCard({ sae, onPress, onDelete, showDelete }: Props) {
  const statutStyle = getStatutStyle(sae.statut);
 
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.titre} numberOfLines={2}>{sae.titre}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: statutStyle.bg }]}>
          <View style={[styles.dot, { backgroundColor: statutStyle.dot }]} />
          <Text style={[styles.badgeText, { color: statutStyle.text }]}>{sae.statut}</Text>
        </View>
      </View>
 
      {/* Module + Date */}
      <View style={styles.meta}>
        <View style={styles.metaTag}>
          <Text style={styles.metaIcon}>📚</Text>
          <Text style={styles.metaText}>{sae.module}</Text>
        </View>
        {sae.date && (
          <View style={styles.metaTag}>
            <Text style={styles.metaIcon}>📅</Text>
            <Text style={styles.metaText}>{sae.date}</Text>
          </View>
        )}
      </View>
 
      {/* Description */}
      {sae.description && (
        <Text style={styles.description} numberOfLines={2}>{sae.description}</Text>
      )}
 
      {/* Technologies */}
      {sae.technologies && sae.technologies.length > 0 && (
        <View style={styles.techRow}>
          {sae.technologies.slice(0, 3).map((tech, i) => (
            <View key={i} style={styles.techTag}>
              <Text style={styles.techText}>{tech}</Text>
            </View>
          ))}
          {sae.technologies.length > 3 && (
            <Text style={styles.techMore}>+{sae.technologies.length - 3}</Text>
          )}
        </View>
      )}
 
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.voir}>Voir →</Text>
        {showDelete && onDelete && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={onDelete}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.deleteText}>Supprimer</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 8,
  },
  titleRow: { flex: 1 },
  titre: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    gap: 5,
    flexShrink: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  meta: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  metaTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaIcon: { fontSize: 12 },
  metaText: {
    color: COLORS.textSub,
    fontSize: 12,
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  techTag: {
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  techText: {
    color: COLORS.textSub,
    fontSize: 11,
    fontWeight: "500",
  },
  techMore: {
    color: COLORS.textMuted,
    fontSize: 11,
    alignSelf: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  voir: {
    color: COLORS.accentLight,
    fontSize: 13,
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  deleteText: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: "600",
  },
});
 