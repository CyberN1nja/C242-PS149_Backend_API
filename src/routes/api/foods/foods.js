const express = require('express');
const db = require('../../../db'); // Koneksi database

const router = express.Router();

/**
 * GET all user foods
 * Endpoint: GET /user_foods
 */
router.get('/user', (req, res) => {
  const query = 'SELECT * FROM user_foods';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user foods:', err);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }

    res.status(200).json({
      error: false,
      message: 'User foods fetched successfully',
      data: results,
    });
  });
});

/**
 * GET user food by ID
 * Endpoint: GET /user_foods/:food_id
 */
router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id; // Ambil user_id dari parameter URL
  const query = 'SELECT * FROM user_foods WHERE user_id = ?'; // Gunakan user_id dalam query

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user food by user_id:', err);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'No foods found for the specified user_id',
      });
    }

    res.status(200).json({
      error: false,
      message: 'User foods fetched successfully',
      data: results, // Mengembalikan semua makanan untuk user_id
    });
  });
});


/**
 * POST a new user food
 * Endpoint: POST /user_foods
 */
router.post('/user', (req, res) => {
  const { user_id, food_name, calories, protein, fats, crabs } = req.body;

  if (!user_id || !food_name || !calories || !protein || !fats || !crabs) {
    return res.status(400).json({
      error: true,
      message: 'All fields (user_id, food_name, calories, protein, fats, crabs) are required',
    });
  }

  const query = `
    INSERT INTO user_foods (user_id, food_name, calories, protein, fats, crabs)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [user_id, food_name, calories, protein, fats, crabs];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding new user food:', err);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }

    res.status(201).json({
      error: false,
      message: 'User food added successfully',
      data: {
        food_id: results.insertId,
        user_id,
        food_name,
        calories,
        protein,
        fats,
        crabs,
      },
    });
  });
});

module.exports = router;
