const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const auth = require('../middleware/auth');
require('dotenv').config();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email et mot de passe requis' });

  try {
    const [rows] = await db.query('SELECT * FROM admin WHERE email = ?', [email]);
    if (rows.length === 0)
      return res.status(401).json({ message: 'Identifiants incorrects' });

    const admin = rows[0];
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return res.status(401).json({ message: 'Identifiants incorrects' });

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, admin: { id: admin.id, nom: admin.nom, prenom: admin.prenom, statut: admin.statut } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/admin/logout (côté client on supprime le token, ici on confirme juste)
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
});

// GET /api/admin/liste (protégé)
router.get('/liste', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nom, prenom, statut, specialite, email FROM admin');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/admin/register (créer un admin)
router.post('/register', async (req, res) => {
  const { nom, prenom, statut, specialite, email, password } = req.body;
  if (!nom || !email || !password)
    return res.status(400).json({ message: 'Champs obligatoires manquants' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO admin (nom, prenom, statut, specialite, email, password) VALUES (?, ?, ?, ?, ?, ?)',
      [nom, prenom, statut, specialite, email, hashed]
    );
    res.status(201).json({ message: 'Admin créé avec succès' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ message: 'Email déjà utilisé' });
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
