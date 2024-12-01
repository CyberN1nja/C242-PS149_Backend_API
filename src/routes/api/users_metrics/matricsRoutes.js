const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();
const db = require('../../../db');

// POST: Menambahkan data baru
router.post('/user', authenticate, (req, res) => {
  const { age, height, weight, fats } = req.body;
  const userId = req.userId; // Gunakan req.userId untuk akses userId dari middleware

  console.log('User ID:', userId); // Pastikan userId ada di sini

  if (!userId) {
    return res.status(400).json({ error: true, message: 'User ID tidak ditemukan' });
  }

  const query = 'INSERT INTO user_physical_metrics (user_id, age, height, weight, fats) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [userId, age, height, weight, fats], (err, result) => {
    if (err) {
      console.error('Error memasukkan data:', err);
      return res.status(500).send('Error memasukkan data');
    }
    res.status(201).send('User berhasil ditambahkan');
  });
});

// GET: Mengambil semua data
router.get('/all', (req, res) => {
  const query = 'SELECT * FROM user_physical_metrics';

  // Menjalankan query untuk mengambil semua data
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }

    // Cek apakah ada hasil dari query
    if (results.length === 0) {
      console.log('No data found');
      return res.status(404).send('No metrics found');
    }

    // Kirimkan hasil jika ada
    console.log('Query Results:', results);
    return res.status(200).json(results);
  });
});

// GET: Mengambil data berdasarkan user_id
router.get('/:user_id', authenticate, (req, res) => {
  const userId = req.params.user_id; // Ambil user_id dari parameter URL
  const query = 'SELECT * FROM user_physical_metrics WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error mengambil data:', err);
      res.status(500).send('Error mengambil data');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('User tidak ditemukan');
      return;
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;
