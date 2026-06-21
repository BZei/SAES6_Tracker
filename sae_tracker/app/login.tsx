import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
 

// TODO: Remplacer la vérification locale par un appel API Spring Boot
// POST fetch("http://localhost:8080/api/auth/login", { body: JSON.stringify({ login, password }) })
 
const COLORS = {
  bg: "#080C1A",
  bgCard: "#0F1530",
  border: "#1E2A45",
  accent: "#6C47FF",
  accentGlow: "rgba(108, 71, 255, 0.25)",
  accentBg: "rgba(108, 71, 255, 0.15)",
  red: "#EF4444",
  text: "#FFFFFF",
  textSub: "#94A3B8",
  textMuted: "#475569",
};
 
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };
 
export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
 
  const handleLogin = () => {
    setError("");
    if (login === "admin" && password === "admin123") {
      router.replace("/admin");
    } else {
      setError("Identifiant ou mot de passe incorrect. Réessayez.");
    }
  };
 
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
          <Text style={styles.title}>Bienvenue !</Text>
          <Text style={styles.sub}>Connectez-vous pour gérer vos SAE</Text>
        </View>
 
        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>ADRESSE E-MAIL</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              placeholder="admin@univ.fr"
              placeholderTextColor={COLORS.textMuted}
              style={styles.input}
              value={login}
              onChangeText={(v) => { setLogin(v); setError(""); }}
              autoCapitalize="none"
            />
          </View>
 
          <Text style={styles.label}>MOT DE PASSE</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={COLORS.textMuted}
              style={styles.input}
              secureTextEntry={!showPwd}
              value={password}
              onChangeText={(v) => { setPassword(v); setError(""); }}
            />
            <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
              <Text style={styles.showPwd}>{showPwd ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
 
          {/* Message d'erreur inline */}
          {error !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
 
          <TouchableOpacity style={styles.btn} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.btnText}>Se connecter →</Text>
          </TouchableOpacity>
 
          <Text style={styles.orText}>ou continuer avec</Text>
 
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>🌐 Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>🍎 Apple</Text>
            </TouchableOpacity>
          </View>
 
          {/* Mode Université */}
          <TouchableOpacity style={styles.uniBtn}>
            <View style={styles.uniBtnInner}>
              <Text style={styles.uniIcon}>🏛️</Text>
              <View>
                <Text style={styles.uniBtnTitle}>Mode Université</Text>
                <Text style={styles.uniBtnSub}>Se connecter avec CAS universitaire</Text>
              </View>
            </View>
            <Text style={styles.uniArrow}>→</Text>
          </TouchableOpacity>
        </View>
 
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Retour à l'accueil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  logoWrap: { alignItems: "center", gap: 8, marginBottom: 10 },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: COLORS.accentBg,
    borderWidth: 1,
    borderColor: COLORS.accentGlow,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  logoEmoji: { fontSize: 32 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  sub: { color: COLORS.textSub, fontSize: 14 },
  form: { gap: 10 },
  label: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: -4,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 4,
    gap: 8,
  },
  inputIcon: { fontSize: 16 },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    paddingVertical: 12,
  },
  showPwd: { fontSize: 18, padding: 4 },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    padding: 12,
  },
  errorIcon: { fontSize: 16 },
  errorText: { color: COLORS.red, fontSize: 13, flex: 1, lineHeight: 18 },
  btn: {
    backgroundColor: COLORS.accent,
    padding: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    marginTop: 4,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  orText: { color: COLORS.textMuted, textAlign: "center", fontSize: 13, marginVertical: 4 },
  socialRow: { flexDirection: "row", gap: 10 },
  socialBtn: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: 14,
    alignItems: "center",
  },
  socialText: { color: COLORS.textSub, fontWeight: "600" },
  uniBtn: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  uniBtnInner: { flexDirection: "row", alignItems: "center", gap: 10 },
  uniIcon: { fontSize: 22 },
  uniBtnTitle: { color: COLORS.text, fontWeight: "600", fontSize: 13 },
  uniBtnSub: { color: COLORS.textMuted, fontSize: 11 },
  uniArrow: { color: COLORS.textMuted, fontSize: 18 },
  back: { color: COLORS.textMuted, textAlign: "center", fontSize: 13 },
});
 