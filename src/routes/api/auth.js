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
router.post('/user', async (req, res) => {
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

// Edit Profile
router.put('/users', authenticate, async (req, res) => {
  const { image, fullname, email, contact, gender } = req.body;
  const userId = req.userId; // userId dari middleware authenticate

  // Validasi input
  if (!email || !fullname) {
    // 'email' dan 'fullname' wajib diisi
    return res.status(400).json({
      error: true,
      status: 'failure',
      message: 'Email dan fullname wajib diisi.',
    });
  }

  // Update data pengguna di database
  const query = 'UPDATE users SET image = ?, fullname = ?, email = ?, contact = ?, gender = ? WHERE user_id = ?';
  db.query(query, [image || null, fullname, email, contact || null, gender || null, userId], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error memperbarui profil pengguna 500.',
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        status: 'failure',
        message: 'User tidak ditemukan atau tidak ada perubahan.',
      });
    }

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Profil berhasil diperbarui',
    });
  });
});

// Update Access Token (Perbarui Token Akses)
router.put('/authentications', authenticate, (req, res) => {
  const { refreshToken } = req.body;

  // Validasi input refresh token
  if (!refreshToken) {
    return res.status(400).json({
      error: true,
      status: 'failure',
      message: 'Refresh token tidak boleh kosong.',
    });
  }

  // Proses pembaruan token (misalnya verifikasi refresh token dan buat access token baru)
  try {
    // Gantikan dengan logika untuk memperbarui access token menggunakan refresh token
    const accessToken = jwt.sign({ userId: req.userId }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: { accessToken },
    });
  } catch (error) {
    console.error('Error memperbarui access token:', error);
    res.status(500).json({
      error: true,
      status: 'failure',
      message: 'Error memperbarui access token 500.',
    });
  }
});

// Logout (Hapus Refresh Token)
router.delete('/authentications', authenticate, (req, res) => {
  const { refreshToken } = req.body;

  // Validasi input refresh token
  if (!refreshToken) {
    return res.status(400).json({
      error: true,
      status: 'failure',
      message: 'Refresh token tidak boleh kosong.',
    });
  }

  // Proses logout (misalnya menghapus refresh token dari database atau sesi)
  try {
    // Gantikan dengan logika untuk menghapus refresh token
    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  } catch (error) {
    console.error('Error saat logout:', error);
    res.status(500).json({
      error: true,
      status: 'failure',
      message: 'Error saat logout 500.',
    });
  }
});

// Delete Account (Hapus Akun Pengguna)
router.delete('/users', authenticate, (req, res) => {
  const userId = req.userId;

  // Hapus akun pengguna (menghapus dari database)
  const query = 'DELETE FROM users WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error menghapus akun:', err);
      return res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error menghapus akun 500.',
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        status: 'failure',
        message: 'Akun tidak ditemukan.',
      });
    }

    // Setelah menghapus akun, kita akan logout pengguna dengan menghapus refresh token
    const { refreshToken } = req.body;
    if (refreshToken) {
      // Hapus refresh token dari tempat penyimpanan (misalnya database atau cache)
      // Gantikan dengan logika untuk menghapus refresh token dari tempat penyimpanan
    }

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Akun berhasil dihapus',
    });
  });
});

module.exports = router;
