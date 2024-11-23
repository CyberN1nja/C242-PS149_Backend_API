const express = require('express');
const router = express.Router();
const db = require('../../db');

// POST: Menambahkan data baru
router.post('/addHm', (req, res) => {
  const { id, user_id, age, height, weight, fats } = req.body;
  const query = 'INSERT INTO user_physical_metrics (id, user_id, age, height, weight, fats) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [id, user_id, age, height, weight, fats], (err, result) => {
    if (err) {
      console.error('Error memasukkan data:', err);
      res.status(500).send('Error memasukkan data');
      return;
    }
    res.status(201).send('User berhasil ditambahkan');
  });
});

// GET: Mengambil semua data
router.get('/getHm', (req, res) => {
  const query = 'SELECT * FROM user_physical_metrics';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.status(200).json(results);
  });
});

// GET: Mengambil data berdasarkan user_id
router.get('/getHm/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM user_physical_metrics WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error mengambil data:', err);
      res.status(500).send('Error mengabil data');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('User tidak ditemukan');
      return;
    }

    res.status(200).json(results[0]);
  });
});

// PUT: Memperbarui data berdasarkan user_id
router.put('/updateHm/:id', (req, res) => {
  const userId = req.params.id;
  const { age, height, weight, fats } = req.body;
  const query = 'UPDATE user_physical_metrics SET age = ?, height = ?, weight = ?, fats = ? WHERE user_id = ?';

  db.query(query, [age, height, weight, fats, userId], (err, result) => {
    if (err) {
      console.error('Error memperbarui data:', err);
      res.status(500).send('Error memperbarui data');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('User tidak ditemukan');
      return;
    }

    res.status(200).send('Data user berhasil diperbarui');
  });
});

// DELETE: Menghapus data berdasarkan user_id
router.delete('/deleteHm/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM user_physical_metrics WHERE user_id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error menghapus data:', err);
      res.status(500).send('Error menghapus data');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('User tidak ditemukan');
      return;
    }

    res.status(200).send('Data user berhasil dihapus');
  });
});

module.exports = router;
