import { router, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
 
const VISITOR_TABS = [
  { label: "Accueil", icon: "🏠", route: "/accueil" },
  { label: "SAE", icon: "📋", route: "/saes" },
];
 
export function VisitorNav() {
  const path = usePathname();
  return (
    <View style={styles.nav}>
      {VISITOR_TABS.map((tab) => {
        const active = path === tab.route || path.startsWith(tab.route + "/");
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
          >
            <Text style={[styles.icon, active && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
            {active && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
 
const ADMIN_TABS = [
  { label: "Dashboard", icon: "⚡", route: "/admin" },
  { label: "SAE", icon: "📋", route: "/admin/saes" },
  { label: "Ajouter", icon: "➕", route: "/admin/ajouter" },
  { label: "Profil", icon: "👤", route: "/admin/profile" },
];

export default VisitorNav;
 
export function AdminNav() {
  const path = usePathname();
  return (
    <View style={styles.nav}>
      {ADMIN_TABS.map((tab) => {
        const active = path === tab.route || (tab.route !== "/admin" && path.startsWith(tab.route));
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
          >
            <Text style={[styles.icon, active && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
            {active && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.icon}>🚪</Text>
        <Text style={styles.label}>Quitter</Text>
      </TouchableOpacity>
    </View>
  );
}




const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    backgroundColor: COLORS.bgCard,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 3,
    position: "relative",
    paddingTop: 4,
  },
  icon: { fontSize: 18, opacity: 0.4 },
  iconActive: { opacity: 1 },
  label: { color: COLORS.textMuted, fontSize: 10, fontWeight: "500" },
  labelActive: { color: COLORS.accentLight, fontWeight: "700" },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.accentLight,
    marginTop: 2,
  },
});

 