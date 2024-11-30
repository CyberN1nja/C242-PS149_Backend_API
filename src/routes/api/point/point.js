const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../users/authMiddleware');
const db = require('../../../db'); 
const router = express.Router();

/**
 * GET /user_points - Mendapatkan semua entri poin
 */
router.get('/user', (req, res) => {
  const query = 'SELECT * FROM user_poin';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.status(200).json(results);
  });
});

/**
 * GET /user_points/:user_id - Mendapatkan semua poin berdasarkan user_id
 */
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM user_poin WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.status(200).json(results);
  });
});


router.get('/total/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT SUM(points) AS total_points FROM user_poin WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.status(200).json(results[0]); // Mengembalikan total poin
  });
});

/**
 * POST /user_points - Menambahkan poin untuk pengguna
 */
router.post('/user', authenticate, (req, res) => {
  const { points, reason } = req.body;
  const user_id = req.userId; // Ambil userId yang didekodekan dari token

  if (!points || !reason) {
    return res.status(400).json({ error: 'Missing required fields: points, reason' });
  }

  // Query untuk menambahkan poin
  const query = 'INSERT INTO user_poin (user_id, points, reason, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
  db.query(query, [user_id, points, reason], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.status(201).json({ message: 'Point added successfully', insertId: result.insertId });
  });
});

/**
 * PUT /user_points/:id - Memperbarui entri poin berdasarkan id
 */
router.put('/:user_id', (req, res) => {
  const { user_id } = req.params; // Menggunakan user_id dari params
  const { points, reason } = req.body;

  if (!points || !reason) {
    return res.status(400).json({ error: 'Missing required fields: points, reason' });
  }

  // Pastikan nama tabel dan kolom sesuai dengan yang ada di database Anda
  const query = 'UPDATE user_poin SET points = ?, reason = ?, updated_at = NOW() WHERE user_id = ?';
  db.query(query, [points, reason, user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }

    // Cek apakah ada data yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No point entry found for the specified user_id' });
    }

    res.status(200).json({ message: 'Point updated successfully' });
  });
});

/**
 * DELETE /user_points/:id - Menghapus entri poin berdasarkan id
 */
router.delete('/:user_id', (req, res) => {
  const { user_id } = req.params; // Mengambil parameter user_id dari URL

  const query = 'DELETE FROM user_poin WHERE user_id = ?'; // Menggunakan user_id untuk filter
  db.query(query, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }

    // Jika tidak ada data yang terhapus
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Point not found for the specified user_id' });
    }

    res.status(200).json({ message: 'Point deleted successfully' });
  });
});

module.exports = router;
