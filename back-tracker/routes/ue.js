const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/ue
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ue');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/ue/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ue WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'UE non trouvée' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/ue
router.post('/', auth, async (req, res) => {
  const { nom, numero, description, valide } = req.body;
  if (!nom || !numero) return res.status(400).json({ message: 'Nom et numéro obligatoires' });

  try {
    const [result] = await db.query(
      'INSERT INTO ue (nom, numero, description, valide) VALUES (?, ?, ?, ?)',
      [nom, numero, description, valide ?? false]
    );
    res.status(201).json({ message: 'UE créée', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PUT /api/ue/:id
router.put('/:id', auth, async (req, res) => {
  const { nom, numero, description, valide } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE ue SET nom=?, numero=?, description=?, valide=? WHERE id=?',
      [nom, numero, description, valide, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'UE non trouvée' });
    res.json({ message: 'UE mise à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// DELETE /api/ue/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM ue WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'UE non trouvée' });
    res.json({ message: 'UE supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PATCH /api/ue/:id/valider
router.patch('/:id/valider', auth, async (req, res) => {
  try {
    await db.query('UPDATE ue SET valide = NOT valide WHERE id = ?', [req.params.id]);
    res.json({ message: 'Statut de validation mis à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
