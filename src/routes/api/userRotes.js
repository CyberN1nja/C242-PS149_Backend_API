const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../../db');

// Kunci rahasia untuk JWT (Ganti dengan kunci yang lebih aman)
const SECRET_KEY = 'Sorong123barat';

// Registrasi User (Membuat akun baru)
router.post('/register', async (req, res) => {
  const { user_id, image, fullname, email, password, contact, gender } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const query = 'INSERT INTO user (user_id, image, fullname, email, password, contact, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [user_id, image, fullname, email, hashedPassword, contact, gender], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({
          error: true,
          status: 'failure',
          message: 'Error inserting data',
        });
      }

      res.status(201).json({
        error: false,
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId: user_id, // ID pengguna yang baru dibuat
        },
      });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({
      error: true,
      status: 'failure',
      message: 'Error registering user',
    });
  }
});

// Login User (Mendapatkan token setelah login)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Cek email di database
  const query = 'SELECT * FROM user WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error fetching user',
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: true,
        status: 'failure',
        message: 'User not found',
      });
    }

    const user = results[0];

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        status: 'failure',
        message: 'Invalid credentials',
      });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    // Kirim token sebagai response
    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Login berhasil',
      data: {
        token: token,
      },
    });
  });
});

// Endpoint untuk menambahkan data user
router.post('/user', (req, res) => {
  const { user_id, image, fullname, email, password, contact, gender } = req.body;
  const query = 'INSERT INTO user (user_id, image, fullname, email, password, contact, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [user_id, image, fullname, email, password, contact, gender], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error inserting data',
      });
      return;
    }
    res.status(201).json({
      error: false,
      status: 'success',
      message: 'User added successfully',
      data: {
        userId: user_id, // ID pengguna yang baru dibuat
      },
    });
  });
});

// Endpoint untuk mengambil semua data user
router.get('/user', (req, res) => {
  const query = 'SELECT * FROM user';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error fetching data',
      });
      return;
    }
    res.status(200).json({
      error: false,
      status: 'success',
      message: 'Data fetched successfully',
      data: results,
    });
  });
});

// Endpoint untuk mengambil data user berdasarkan ID
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM user WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error fetching data',
      });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({
        error: true,
        status: 'failure',
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'User data fetched successfully',
      data: results[0],
    });
  });
});

// Endpoint untuk memperbarui data user
router.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  const { image, fullname, email, password, contact, gender } = req.body;
  const query = 'UPDATE user SET image = ?, fullname = ?, email = ?, password = ?, contact = ?, gender = ? WHERE user_id = ?';

  db.query(query, [image, fullname, email, password, contact, gender, userId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error updating data',
      });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: true,
        status: 'failure',
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'User successfully updated',
    });
  });
});

// Endpoint untuk menghapus data user
router.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM user WHERE user_id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({
        error: true,
        status: 'failure',
        message: 'Error deleting data',
      });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: true,
        status: 'failure',
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      error: false,
      status: 'success',
      message: 'User successfully deleted',
    });
  });
});

// Middleware untuk autentikasi menggunakan JWT
router.use('/user', (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      error: true,
      status: 'failure',
      message: 'Token is required',
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: true,
        status: 'failure',
        message: 'Invalid or expired token',
      });
    }

    req.userId = decoded.userId;
    next();
  });
});

module.exports = router;
