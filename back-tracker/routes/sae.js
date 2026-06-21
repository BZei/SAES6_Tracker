const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/sae - Liste toutes les SAE
//router.get('/', auth, async (req, res) => {
  router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sae');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/sae/:id - Détail d'une SAE
// router.get('/:id', auth, async (req, res) => {
  router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // SAE
    const [[sae]] = await db.query('SELECT * FROM sae WHERE id = ?', [id]);
    if (!sae) return res.status(404).json({ message: 'SAE non trouvée' });

    // Technologies
    const [technologies] = await db.query(`
      SELECT t.nom FROM technologie t
      JOIN sae_technologie st ON st.technologie_id = t.id
      WHERE st.sae_id = ?
    `, [id]);

    // Compétences
    const [competences] = await db.query(`
      SELECT c.nom FROM competence c
      JOIN sae_competence sc ON sc.competence_id = c.id
      WHERE sc.sae_id = ?
    `, [id]);

    // Matières
    const [matieres] = await db.query(`
      SELECT m.nom FROM matiere m
      JOIN sae_matiere sm ON sm.matiere_id = m.id
      WHERE sm.sae_id = ?
    `, [id]);

    // UE
    const [ues] = await db.query(`
      SELECT u.nom FROM ue u
      JOIN sae_ue su ON su.ue_id = u.id
      WHERE su.sae_id = ?
    `, [id]);

    // Personnes
    const [personnes] = await db.query(`
      SELECT p.*, sp.role
      FROM personne p
      JOIN sae_personne sp ON sp.personne_id = p.id
      WHERE sp.sae_id = ?
    `, [id]);

    // Reconstruction format FRONT
    const result = {
      id: sae.id,
      titre: sae.titre,
      description: sae.description,
      module: sae.module,
      date: sae.date,
      statut: sae.statut,
      noteGlobale: sae.note_globale,

      technologies: technologies.map(t => t.nom),
      competences: competences.map(c => c.nom),
      matieres: matieres.map(m => m.nom),
      ue: ues.map(u => u.nom),

      chefProjet: personnes.find(p => p.role === 'chef') || null,
      membres: personnes.filter(p => p.role === 'membre'),
      profs: personnes.filter(p => p.role === 'prof'),
    };

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});
// POST /api/sae - Ajouter une SAE
// router.post('/', auth, async (req, res) => {
  router.post('/', async (req, res) => {
  const {
    titre,
    description,
    module,
    date,
    statut,
    noteGlobale,
    technologies,
    competences,
    matieres,
    ue,
    chefProjet,
    membres,
    profs
  } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO sae (titre, description, module, date, statut, note_globale) VALUES (?, ?, ?, ?, ?, ?)',
      [titre, description, module, date, statut, noteGlobale]
    );

    const saeId = result.insertId;

    // 👉 ici on peut ajouter technologies, personnes etc (je te le ferai si tu veux complet)

    res.status(201).json({ message: 'SAE créée', id: saeId });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/sae/:id - Modifier une SAE
// router.put('/:id', auth, async (req, res) => {
  router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    // 1. UPDATE SAE
    await db.query(
      'UPDATE sae SET titre=?, description=?, module=?, date=?, statut=?, note_globale=? WHERE id=?',
      [data.titre, data.description, data.module, data.date, data.statut, data.noteGlobale, id]
    );

    // 2. DELETE relations
    await db.query('DELETE FROM sae_technologie WHERE sae_id=?', [id]);
    await db.query('DELETE FROM sae_competence WHERE sae_id=?', [id]);
    await db.query('DELETE FROM sae_matiere WHERE sae_id=?', [id]);
    await db.query('DELETE FROM sae_ue WHERE sae_id=?', [id]);
    await db.query('DELETE FROM sae_personne WHERE sae_id=?', [id]);

    // 3. REINSERT (comme POST)
    req.body.id = id;
    req.params.id = id;

    return router.handle({ ...req, method: 'POST', url: '/' }, res);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/sae/:id - Supprimer une SAE
// router.delete('/:id', auth, async (req, res) => {
  router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM sae WHERE id = ?', [req.params.id]);
    res.json({ message: 'SAE supprimée ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
