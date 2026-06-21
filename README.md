# 🚀 Lancer le projet

## 1. Cloner le projet

git clone [lien github]

---

## 2. Base de données (XAMPP)

* Ouvrir XAMPP
* Lancer Apache et MySQL
* Aller sur http://localhost/phpmyadmin
* Créer une base : `sae_db`
* Importer le fichier `database.sql`

---

## 3. Lancer le BACK

cd back-tracker
npm install
node server.js

➡️ Doit afficher :
Serveur démarré sur http://localhost:3000

---

## 4. Lancer le FRONT

cd front
npm install
npm start

---

## 5. Accès

* Front : http://localhost:19006
* API : http://localhost:3000/api/saes
