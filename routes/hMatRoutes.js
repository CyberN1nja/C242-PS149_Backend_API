const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/addHm', (req, res) => {
  const {user_id, tinggi, berat, lemak } = req.body;
  const query = 'INSERT INTO hmetrics (user_id, tinggi, berat, lemak) VALUES (?, ?, ?, ?)';

  db.query(query, [user_id, tinggi, berat, lemak], (err, result) => {
    if (err) {
      console.error('Error memasukkan data:', err);
      res.status(500).send('Error memasukkan data');
      return;
    }
    res.status(201).send('User berhasil ditambahkan');
  });
});

module.exports = router;
