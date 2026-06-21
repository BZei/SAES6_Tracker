const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/ac
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ac.*, domaine.nom AS domaine_nom 
      FROM ac 
      LEFT JOIN domaine ON ac.domaine_id = domaine.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/ac/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ac WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'AC non trouvé' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/ac
router.post('/', auth, async (req, res) => {
  const { nom, numero, description, valide, domaine_id } = req.body;
  if (!nom || !numero) return res.status(400).json({ message: 'Nom et numéro obligatoires' });

  try {
    const [result] = await db.query(
      'INSERT INTO ac (nom, numero, description, valide, domaine_id) VALUES (?, ?, ?, ?, ?)',
      [nom, numero, description, valide ?? false, domaine_id]
    );
    res.status(201).json({ message: 'AC créé', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PUT /api/ac/:id
router.put('/:id', auth, async (req, res) => {
  const { nom, numero, description, valide, domaine_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE ac SET nom=?, numero=?, description=?, valide=?, domaine_id=? WHERE id=?',
      [nom, numero, description, valide, domaine_id, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'AC non trouvé' });
    res.json({ message: 'AC mis à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// DELETE /api/ac/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM ac WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'AC non trouvé' });
    res.json({ message: 'AC supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PATCH /api/ac/:id/valider
router.patch('/:id/valider', auth, async (req, res) => {
  try {
    await db.query('UPDATE ac SET valide = NOT valide WHERE id = ?', [req.params.id]);
    res.json({ message: 'Statut de validation mis à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
