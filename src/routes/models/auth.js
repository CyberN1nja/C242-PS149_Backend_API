const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db');

const SECRET_KEY = 'your_secret_key'; // Ganti dengan kunci rahasia yang aman

// Registrasi User
router.post('/register', async (req, res) => {
  const { user_id, image, fullname, email, password, contact, gender } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const query = 'INSERT INTO user (user_id, image, fullname, email, password, contact, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [user_id, image, fullname, email, hashedPassword, contact, gender], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Error inserting user');
        return;
      }
      res.status(201).send('User registered successfully');
    });
  } catch (error) {
    res.status(500).send('Error hashing password');
  }
});

// Login User
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Cek email di database
  const query = 'SELECT * FROM user WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Error fetching user');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    const user = results[0];

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send('Invalid credentials');
      return;
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  });
});
