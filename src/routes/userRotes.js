const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint untuk mengirim data
router.post('/addUser', (req, res) => {
  const { name, email, password, number, gender, age, height, weight, fat } = req.body;
  const query = 'INSERT INTO user (name, email, password, number, gender, age, height, weight, fat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [name, email, password, number, gender, age, height, weight, fat], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(201).send('User added successfully');
  });
});

// get all users
router.get('/getUser', (req, res) => {
  const query = 'SELECT * FROM user'; // Query untuk mengambil semua data dari tabel 'user'

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.status(200).json(results); // Mengirimkan hasil query sebagai JSON
  });
});

// get by id
router.get('/getUser/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM user WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error mengambil data:', err);
      res.status(500).send('Error mengabil data');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('User tidak ditemukan'); // Mengirimkan response 404 jika user tidak ditemukan
      return;
    }

    res.status(200).json(results[0]); // Mengirimkan hasil query sebagai JSON untuk satu user
  });
});

// edit
module.exports = router;
