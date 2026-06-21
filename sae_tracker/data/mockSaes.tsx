export type Personne = {
  nom?: string;
  prenom?: string;
  formation?: string;
  parcours?: string;
  matiere?: string;
};

export type SAE = {
  id: number;
  titre: string;
  description?: string;
  module?: string;
  date?: string;
  statut?: string;
  technologies?: string[];
  competences?: string[];
  matieres?: string[];
  ue?: string[];
  noteGlobale?: number;
  chefProjet?: Personne;
  membres?: Personne[];
  profs?: Personne[];
};

export const mockSaes: SAE[] = [
  {
    id: 1,
    titre: "Application Mobile",
    description: "Développement d'une application React Native",
    module: "Dev Mobile",
    date: "2025",
    statut: "Terminé",
    technologies: ["React Native", "Expo"],
    competences: ["Développement", "UI"],
    matieres: ["Mobile"],
    ue: ["UE3"],
    noteGlobale: 15,
    chefProjet: {
      nom: "Dupont",
      prenom: "Marie",
      formation: "BUT Info",
      parcours: "Dev",
    },
    membres: [
      {
        nom: "Martin",
        prenom: "Lucas",
        formation: "BUT Info",
        parcours: "Dev",
      },
    ],
    profs: [
      {
        nom: "Durand",
        prenom: "Paul",
        matiere: "Mobile",
      },
    ],
  },

{
    id: 2,
    titre: "Application Mobile",
    description: "Développement d'une application React Native",
    module: "Dev Mobile",
    date: "2025",
    statut: "Terminé",
    technologies: ["React Native", "Expo"],
    competences: ["Développement", "UI"],
    matieres: ["Mobile"],
    ue: ["UE3"],
    noteGlobale: 15,
    chefProjet: {
      nom: "Dupont",
      prenom: "Marie",
      formation: "BUT Info",
      parcours: "Dev",
    },
    membres: [
      {
        nom: "Martin",
        prenom: "Lucas",
        formation: "BUT Info",
        parcours: "Dev",
      },
    ],
    profs: [
      {
        nom: "Durand",
        prenom: "Paul",
        matiere: "Mobile",
      },
    ],
  },  

];