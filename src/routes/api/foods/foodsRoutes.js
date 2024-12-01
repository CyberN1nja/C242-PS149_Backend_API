const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authMiddleware');
const db = require('../../../db');

const router = express.Router();

// GET semua makanan pengguna (admin route)
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

// GET makanan pengguna berdasarkan autentikasi
router.get('/user', authenticate, (req, res) => {
  const userId = req.userId;

  const query = 'SELECT * FROM user_foods WHERE user_id = ? ORDER BY created_at DESC';

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
        message: 'No foods found for the specified user',
      });
    }

    res.status(200).json({
      error: false,
      message: 'User foods fetched successfully',
      data: results,
    });
  });
});

// POST makanan pengguna
router.post('/user', authenticate, (req, res) => {
  const { food_name, calories, protein, fats, crabs } = req.body;
  const userId = req.userId;

  if (!food_name || !calories || !protein || !fats || !crabs) {
    return res.status(400).json({
      error: true,
      message: 'All fields (food_name, calories, protein, fats, crabs) are required',
    });
  }

  const query = `
    INSERT INTO user_foods (user_id, food_name, calories, protein, fats, crabs)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [userId, food_name, calories, protein, fats, crabs];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding new user food:', err);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }

    // Fetch the newly inserted record to include `created_at`
    const fetchQuery = 'SELECT * FROM user_foods WHERE food_id = ?';
    db.query(fetchQuery, [results.insertId], (fetchErr, fetchResults) => {
      if (fetchErr) {
        console.error('Error fetching newly inserted food:', fetchErr);
        return res.status(500).json({
          error: true,
          message: 'Internal server error',
        });
      }

      res.status(201).json({
        error: false,
        message: 'User food added successfully',
        data: fetchResults[0],
      });
    });
  });
});

// DELETE semua makanan pengguna berdasarkan autentikasi
router.delete('/user', authenticate, (req, res) => {
  const userId = req.userId;

  const deleteQuery = 'DELETE FROM user_foods WHERE user_id = ?';

  db.query(deleteQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user food:', err);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: 'No food found for the specified user or you do not have permission to delete it',
      });
    }

    res.status(200).json({
      error: false,
      message: 'User food deleted successfully',
    });
  });
});

module.exports = router;
