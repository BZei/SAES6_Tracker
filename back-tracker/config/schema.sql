-- Base de données SAE
CREATE DATABASE IF NOT EXISTS sae_db;
USE sae_db;

-- Table Admin
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  statut VARCHAR(50),
  specialite VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Domaine
CREATE TABLE IF NOT EXISTS domaine (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT
);

-- Table AC (Apprentissage Critique)
CREATE TABLE IF NOT EXISTS ac (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  numero VARCHAR(20) NOT NULL,
  description TEXT,
  valide BOOLEAN DEFAULT FALSE,
  domaine_id INT,
  FOREIGN KEY (domaine_id) REFERENCES domaine(id) ON DELETE SET NULL
);

-- TABLE SAE
CREATE TABLE sae (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  description TEXT,
  module VARCHAR(100),
  date VARCHAR(50),
  statut VARCHAR(50),
  note_globale FLOAT
);

-- TABLE PERSONNE
CREATE TABLE personne (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  prenom VARCHAR(100),
  formation VARCHAR(100),
  parcours VARCHAR(100),
  matiere VARCHAR(100)
);

-- LIEN SAE PERSONNE
CREATE TABLE sae_personne (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sae_id INT,
  personne_id INT,
  role ENUM('chef', 'membre', 'prof'),
  FOREIGN KEY (sae_id) REFERENCES sae(id) ON DELETE CASCADE,
  FOREIGN KEY (personne_id) REFERENCES personne(id) ON DELETE CASCADE
);

-- TECHNOLOGIES
CREATE TABLE technologie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100)
);

CREATE TABLE sae_technologie (
  sae_id INT,
  technologie_id INT,
  FOREIGN KEY (sae_id) REFERENCES sae(id) ON DELETE CASCADE
);

-- COMPETENCES
CREATE TABLE competence (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100)
);

CREATE TABLE sae_competence (
  sae_id INT,
  competence_id INT,
  FOREIGN KEY (sae_id) REFERENCES sae(id) ON DELETE CASCADE
);

-- MATIERES
CREATE TABLE matiere (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100)
);

CREATE TABLE sae_matiere (
  sae_id INT,
  matiere_id INT,
  FOREIGN KEY (sae_id) REFERENCES sae(id) ON DELETE CASCADE
);

-- UE
CREATE TABLE ue (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100)
);

CREATE TABLE sae_ue (
  sae_id INT,
  ue_id INT,
  FOREIGN KEY (sae_id) REFERENCES sae(id) ON DELETE CASCADE
);