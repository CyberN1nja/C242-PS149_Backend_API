// routes/user.js
const express = require('express');
const db = require('../../db');
const router = express.Router();

// Endpoint untuk mengambil semua data user
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: true, status: 'failure', message: 'Error mengambil data 500.' });
      return;
    }
    res.status(200).json({ error: false, status: 'success', message: 'Data berhasil diambil 200.', data: results });
  });
});

// Endpoint untuk mengambil data user berdasarkan ID
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: true, status: 'failure', message: 'Error mengambil data 500.' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: true, status: 'failure', message: 'User tidak ditemukan 404.' });
      return;
    }

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'User data berhasil diambil 200.',
      data: results[0],
    });
  });
});

// Endpoint untuk memperbarui data user
router.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  const { image, fullname, email, password, contact, gender } = req.body;
  const query = 'UPDATE users SET image = ?, fullname = ?, email = ?, password = ?, contact = ?, gender = ? WHERE user_id = ?';

  db.query(query, [image, fullname, email, password, contact, gender, userId], (err, result) => {
    if (err) {
      console.error('Error update data:', err);
      res.status(500).json({ error: true, status: 'failure', message: 'Error update data 500.' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: true, status: 'failure', message: 'User tidak ditemukan 404.' });
      return;
    }

    res.status(200).json({ error: false, status: 'success', message: 'User berhasil diupdate 200.' });
  });
});

// Endpoint untuk menghapus data user
router.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE user_id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error menghapus data:', err);
      res.status(500).json({ error: true, status: 'failure', message: 'Error menghapus data 500.' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: true, status: 'failure', message: 'User tidak ditemukan 404.' });
      return;
    }

    res.status(200).json({ error: false, status: 'success', message: 'User berhasil dihapus 200.' });
  });
});

router.delete('/users', (req, res) => {
  const query = 'DELETE FROM users'; // Menghapus seluruh data di tabel users

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error menghapus seluruh data user:', err);
      return res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error menghapus seluruh data user 500.',
      });
    }

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Seluruh data user berhasil dihapus 200.',
    });
  });
});


module.exports = router;
