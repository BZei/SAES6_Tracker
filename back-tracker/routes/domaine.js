const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/domaine
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM domaine');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/domaine/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM domaine WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Domaine non trouvé' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/domaine
router.post('/', auth, async (req, res) => {
  const { nom, description } = req.body;
  if (!nom) return res.status(400).json({ message: 'Le nom est obligatoire' });

  try {
    const [result] = await db.query(
      'INSERT INTO domaine (nom, description) VALUES (?, ?)',
      [nom, description]
    );
    res.status(201).json({ message: 'Domaine créé', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PUT /api/domaine/:id
router.put('/:id', auth, async (req, res) => {
  const { nom, description } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE domaine SET nom=?, description=? WHERE id=?',
      [nom, description, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Domaine non trouvé' });
    res.json({ message: 'Domaine mis à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// DELETE /api/domaine/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM domaine WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Domaine non trouvé' });
    res.json({ message: 'Domaine supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
