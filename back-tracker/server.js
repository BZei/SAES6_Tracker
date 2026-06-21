const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// CONNEXION DB 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sae_db",
});

// const db = mysql.createConnection({
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASSWORD,
//   database: process.env.MYSQLDATABASE,
// });

// Routes
app.use('/api/admin',   require('./routes/admin'));
app.use('/api/sae',     require('./routes/sae'));
app.use('/api/ue',      require('./routes/ue'));
app.use('/api/domaine', require('./routes/domaine'));
app.use('/api/ac',      require('./routes/ac'));

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API SAE opérationnelle ✅' });
});

db.connect((err) => {
  if (err) {
    console.error("Erreur connexion MySQL :", err);
  } else {
    console.log("Connecté à MySQL ✅");
  }
});

// ✅ GET ALL SAE
app.get("/api/saes", (req, res) => {
  db.query("SELECT * FROM sae", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});


// ✅ GET BY ID
app.get("/api/saes/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM sae WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});


// ✅ CREATE
app.post("/api/saes", (req, res) => {
  console.log("DATA RECUE :", req.body);

  const { titre, description, module, date, noteGlobale } = req.body;

  db.query(
    "INSERT INTO sae (titre, description, module, date, note_globale) VALUES (?, ?, ?, ?, ?)",
    [titre, description, module, date, noteGlobale],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


// ✅ DELETE
app.delete("/api/saes/:id", (req, res) => {
  const id = req.params.id;

console.log("SUPPRESSION ID :", id);

  db.query("DELETE FROM sae WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});



// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
