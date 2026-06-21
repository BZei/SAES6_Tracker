import { getSaeById, updateSae } from "@/api/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton } from "../components/backButton";
import { AdminNav } from "../components/navBar";
 
// TODO: Remplacer par appel API Spring Boot
// PUT fetch(`http://localhost:8080/api/saes/${id}`, { method: 'PUT', body: JSON.stringify(updatedSae) })



const COLORS = {
  bg: "#080C1A",
  bgCard: "#0F1530",
  bgCardAlt: "#141B2D",
  border: "#1E2A45",
  accent: "#6C47FF",
  accentLight: "#8B6DFF",
  text: "#FFFFFF",
  textSub: "#94A3B8",
  textMuted: "#475569",
};
 
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 };
 
const STATUTS = ["En cours", "Terminé", "Prévu"] as const;
type Statut = typeof STATUTS[number];
 
function InputField({ label, placeholder, value, onChangeText, multiline }: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMulti]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );
}
 
export default function Modifier() {
  const { id } = useLocalSearchParams();
 // const sae = mockSaes.find((s) => String(s.id) === String(id));
  const [sae, setSae] = useState<any>(null);

  const [step, setStep] = useState(1);
  const [titre, setTitre] = useState(sae?.titre ?? "");
  const [description, setDescription] = useState(sae?.description ?? "");
  const [module, setModule] = useState(sae?.module ?? "");
  const [date, setDate] = useState(sae?.date ?? "");
  const [technologies, setTechnologies] = useState((sae?.technologies ?? []).join(", "));
  const [competences, setCompetences] = useState((sae?.competences ?? []).join(", "));
  const [statut, setStatut] = useState<Statut>((sae?.statut as Statut) ?? "En cours");
  const [matieres, setMatieres] = useState((sae?.matieres ?? []).join(", "));
  const [ue, setUe] = useState((sae?.ue ?? []).join(", "));
  const [noteGlobale, setNoteGlobale] = useState(sae?.noteGlobale?.toString() ?? "");
  const [chefNom, setChefNom] = useState(sae?.chefProjet?.nom ?? "");
  const [chefPrenom, setChefPrenom] = useState(sae?.chefProjet?.prenom ?? "");
  const [chefFormation, setChefFormation] = useState(sae?.chefProjet?.formation ?? "");
  const [chefParcours, setChefParcours] = useState(sae?.chefProjet?.parcours ?? "");
  const [membreNom, setMembreNom] = useState(sae?.membres?.[0]?.nom ?? "");
  const [membrePrenom, setMembrePrenom] = useState(sae?.membres?.[0]?.prenom ?? "");
  const [membreFormation, setMembreFormation] = useState(sae?.membres?.[0]?.formation ?? "");
  const [membreParcours, setMembreParcours] = useState(sae?.membres?.[0]?.parcours ?? "");
  const [profNom, setProfNom] = useState(sae?.profs?.[0]?.nom ?? "");
  const [profPrenom, setProfPrenom] = useState(sae?.profs?.[0]?.prenom ?? "");
  const [profMatiere, setProfMatiere] = useState(sae?.profs?.[0]?.matiere ?? "");


 useEffect(() => {
    const load = async () => {
      const idNumber = Array.isArray(id) ? id[0] : id;
      const data = await getSaeById(Number(idNumber));
      setSae(data);
      setTitre(data.titre);
    };
    load();
  }, [id]);

  const handleUpdate = async () => {
    const idNumber = Array.isArray(id) ? id[0] : id;

    await updateSae(Number(idNumber), {
      ...sae,
      titre,
    });

    router.replace("/admin/saes");
  };

  if (!sae) return <Text>Chargement...</Text>;


  const handleSubmit = () => {
    const updatedSae = {
      id: sae.id,
      titre, description, module, date, statut,
      technologies: technologies.split(",").map((t: string) => t.trim()).filter(Boolean),
      competences: competences.split(",").map((c: string) => c.trim()).filter(Boolean),
      matieres: matieres.split(",").map((m: string) => m.trim()).filter(Boolean),
      ue: ue.split(",").map((u: string) => u.trim()).filter(Boolean),
      noteGlobale: parseFloat(noteGlobale) || 0,
      chefProjet: { nom: chefNom, prenom: chefPrenom, formation: chefFormation, parcours: chefParcours },
      membres: membreNom ? [{ nom: membreNom, prenom: membrePrenom, formation: membreFormation, parcours: membreParcours }] : [],
      profs: profNom ? [{ nom: profNom, prenom: profPrenom, matiere: profMatiere }] : [],
    };
    // TODO: PUT fetch(`http://localhost:8080/api/saes/${sae.id}`, { method: 'PUT', body: JSON.stringify(updatedSae) })
    console.log("SAE modifiée:", updatedSae);
    router.back();
  };
 
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <BackButton />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>Modifier la SAE</Text>
            <Text style={styles.stepLabel}>Étape {step} sur 2</Text>
          </View>
        </View>
 
        <View style={styles.progressWrap}>
          <View style={[styles.progressBar, { width: step === 1 ? "50%" : "100%" }]} />
        </View>
 
        {step === 1 ? (
          <View style={styles.form}>
            <InputField label="TITRE DE LA SAE" placeholder="ex : SAE 3.01 — Dév. Web" value={titre} onChangeText={setTitre} />
            <InputField label="DESCRIPTION" placeholder="Décrivez votre SAE..." value={description} onChangeText={setDescription} multiline />
            <View style={styles.row}>
              <View style={{ flex: 1 }}><InputField label="MODULE" placeholder="Dév. Web" value={module} onChangeText={setModule} /></View>
              <View style={{ flex: 1 }}><InputField label="DATE" placeholder="Nov 2024" value={date} onChangeText={setDate} /></View>
            </View>
            <InputField label="TECHNOLOGIES (séparées par des virgules)" placeholder="React, Node.js" value={technologies} onChangeText={setTechnologies} />
            <InputField label="COMPÉTENCES (séparées par des virgules)" placeholder="Frontend, API REST" value={competences} onChangeText={setCompetences} />
            <InputField label="MATIÈRES LIÉES (séparées par des virgules)" placeholder="Dév. Web, BDD" value={matieres} onChangeText={setMatieres} />
            <InputField label="UE ET AC (séparées par des virgules)" placeholder="UE 3.1, AC 3.1.01" value={ue} onChangeText={setUe} />
            <InputField label="NOTE GLOBALE" placeholder="ex : 16.5" value={noteGlobale} onChangeText={setNoteGlobale} />
 
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>STATUT</Text>
              <View style={styles.statutRow}>
                {STATUTS.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.statutBtn, statut === s && styles.statutBtnActive]}
                    onPress={() => setStatut(s)}
                  >
                    <Text style={[styles.statutBtnText, statut === s && styles.statutBtnTextActive]}>
                      {s === "En cours" ? "⏳" : s === "Terminé" ? "✅" : "📅"} {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
 
            <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(2)} activeOpacity={0.85}>
              <Text style={styles.nextBtnText}>Suivant →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.groupTitle}>CHEF DE PROJET</Text>
            <View style={styles.groupCard}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}><InputField label="NOM" placeholder="Dupont" value={chefNom} onChangeText={setChefNom} /></View>
                <View style={{ flex: 1 }}><InputField label="PRÉNOM" placeholder="Thomas" value={chefPrenom} onChangeText={setChefPrenom} /></View>
              </View>
              <InputField label="FORMATION" placeholder="BUT MMI" value={chefFormation} onChangeText={setChefFormation} />
              <InputField label="PARCOURS" placeholder="Dév. Web & Dispositifs Interactifs" value={chefParcours} onChangeText={setChefParcours} />
            </View>
 
            <Text style={styles.groupTitle}>MEMBRE DU GROUPE</Text>
            <View style={styles.groupCard}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}><InputField label="NOM" placeholder="Martin" value={membreNom} onChangeText={setMembreNom} /></View>
                <View style={{ flex: 1 }}><InputField label="PRÉNOM" placeholder="Lucas" value={membrePrenom} onChangeText={setMembrePrenom} /></View>
              </View>
              <InputField label="FORMATION" placeholder="BUT MMI" value={membreFormation} onChangeText={setMembreFormation} />
              <InputField label="PARCOURS" placeholder="Création Numérique" value={membreParcours} onChangeText={setMembreParcours} />
            </View>
 
            <Text style={styles.groupTitle}>PROFESSEUR LIÉ</Text>
            <View style={styles.groupCard}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}><InputField label="NOM" placeholder="Lefebvre" value={profNom} onChangeText={setProfNom} /></View>
                <View style={{ flex: 1 }}><InputField label="PRÉNOM" placeholder="Marie" value={profPrenom} onChangeText={setProfPrenom} /></View>
              </View>
              <InputField label="MATIÈRE" placeholder="Développement Web" value={profMatiere} onChangeText={setProfMatiere} />
            </View>
 
            <View style={styles.row}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
                <Text style={styles.backBtnText}>← Retour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
                <Text style={styles.submitBtnText}>✏️ Modifier la SAE</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
 
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
    gap: 14,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerInfo: { flex: 1 },
  title: { color: COLORS.text, fontSize: 20, fontWeight: "800" },
  stepLabel: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  progressWrap: {
    height: 3,
    backgroundColor: COLORS.border,
    marginHorizontal: 24,
    borderRadius: 2,
    marginBottom: 24,
    overflow: "hidden",
  },
  progressBar: { height: "100%", backgroundColor: COLORS.accentLight, borderRadius: 2 },
  form: { paddingHorizontal: 24, gap: 14 },
  row: { flexDirection: "row", gap: 12 },
  fieldWrap: { gap: 6 },
  fieldLabel: { color: COLORS.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  input: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: COLORS.text,
    fontSize: 14,
  },
  inputMulti: { minHeight: 90, textAlignVertical: "top", paddingTop: 13 },
  statutRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  statutBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statutBtnActive: { backgroundColor: COLORS.accentLight, borderColor: COLORS.accentLight },
  statutBtnText: { color: COLORS.textSub, fontSize: 13, fontWeight: "500" },
  statutBtnTextActive: { color: "#fff", fontWeight: "700" },
  nextBtn: { backgroundColor: COLORS.accent, padding: 16, borderRadius: RADIUS.lg, alignItems: "center", marginTop: 6 },
  nextBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  groupTitle: { color: COLORS.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: -4, marginTop: 6 },
  groupCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  backBtn: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  backBtnText: { color: COLORS.textSub, fontWeight: "600", fontSize: 14 },
  submitBtn: { flex: 2, backgroundColor: COLORS.accentLight, padding: 16, borderRadius: RADIUS.lg, alignItems: "center" },
  submitBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
 