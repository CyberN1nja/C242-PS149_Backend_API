const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('./authMiddleware');
const db = require('../../db');
require('dotenv').config(); // Menggunakan .env
const router = express.Router();

// Kunci rahasia untuk JWT
const SECRET_KEY = process.env.SECRET_KEY;

// Registrasi User (Membuat akun baru) REGISTER
router.post('/users', async (req, res) => {
  const { user_id, image, fullname, email, password, contact, gender } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (user_id, image, fullname, email, password, contact, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [user_id, image, fullname, email, hashedPassword, contact, gender], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: true, status: 'failure', message: 'Error memasukkan data 500.' });
      }

      res.status(201).json({
        error: false,
        status: 'success',
        message: 'User berhasil ditambahkan 201.',
        data: { userId: user_id },
      });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: true, status: 'failure', message: 'Error register user 500.' });
  }
});

// Login User (Mendapatkan token setelah login) LOGIN
router.post('/auth/users', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error mengambil pengguna:', err);
      return res.status(500).json({ error: true, status: 'failure', message: 'Error mengambil pengguna 500.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: true, status: 'failure', message: 'User tidak ditemukan 404.' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: true, status: 'failure', message: 'Kredensial tidak valid 401.' });
    }

    const token = jwt.sign({ userId: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Login berhasil 200.',
      data: { token: token },
    });
  });
});

// User Login Profile
router.post('/auth/profile', authenticate, (req, res) => {
  const userId = req.userId; // userId dari middleware authenticate

  const query = 'SELECT user_id, image, fullname, email, contact, gender FROM users WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      return res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error mendapatkan profil pengguna 500.',
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: true,
        status: 'failure',
        message: 'Profil pengguna tidak ditemukan 404.',
      });
    }

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Profil user berhasil diambil 200.',
      data: results[0], // Mengembalikan data profil pengguna
    });
  });
});

module.exports = router;
