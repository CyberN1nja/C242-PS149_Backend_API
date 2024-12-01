const express = require('express');
const db = require('../../../db');
const router = express.Router();

// Create new article
router.post('/health', (req, res) => {
  const { title, content, image_url } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: true, message: 'Semua data artikel harus disediakan.' });
  }

  // Get current date and time
  const publishedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const query = `
    INSERT INTO article (title, content, published_date, image_url) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [title, content, publishedDate, image_url], (err, results) => {
    if (err) {
      console.error('Error memasukkan data artikel:', err);
      return res.status(500).json({ error: true, message: 'Error membuat artikel.' });
    }

    res.status(201).json({
      error: false,
      message: 'Artikel berhasil dibuat.',
      article_id: results.insertId,
    });
  });
});

// Get all articles
router.get('/health', (req, res) => {
  const query = 'SELECT * FROM article';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error mengambil data artikel:', err);
      return res.status(500).json({ error: true, message: 'Error mengambil data artikel.' });
    }

    res.status(200).json({
      error: false,
      message: 'Artikel berhasil diambil.',
      data: results,
    });
  });
});

// Get article by ID
router.get('/:article_id', (req, res) => {
  const articleId = req.params.article_id;

  const query = 'SELECT * FROM article WHERE article_id = ?';
  db.query(query, [articleId], (err, results) => {
    if (err) {
      console.error('Error mengambil data artikel:', err);
      return res.status(500).json({ error: true, message: 'Error mengambil data artikel.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: true, message: 'Artikel tidak ditemukan.' });
    }

    res.status(200).json({
      error: false,
      message: 'Artikel berhasil diambil.',
      data: results[0],
    });
  });
});

// Update article
router.put('/:article_id', (req, res) => {
  const articleId = req.params.article_id;
  const { title, content, published_date, image_url } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: true, message: 'Semua data artikel harus disediakan.' });
  }

  // Parse and format the date to match MySQL's DATETIME format
  const formattedDate = new Date(published_date).toISOString().slice(0, 19).replace('T', ' ');

  const query = `
    UPDATE article
    SET title = ?, content = ?, published_date = ?, image_url = ?
    WHERE article_id = ?
  `;
  db.query(query, [title, content, formattedDate, image_url, articleId], (err, results) => {
    if (err) {
      console.error('Error memperbarui data artikel:', err);
      return res.status(500).json({ error: true, message: 'Error memperbarui artikel.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Artikel tidak ditemukan.' });
    }

    res.status(200).json({
      error: false,
      message: 'Artikel berhasil diperbarui.',
    });
  });
});

// Delete article
router.delete('/:article_id', (req, res) => {
  const articleId = req.params.article_id;

  const query = 'DELETE FROM article WHERE article_id = ?';
  db.query(query, [articleId], (err, results) => {
    if (err) {
      console.error('Error menghapus data artikel:', err);
      return res.status(500).json({ error: true, message: 'Error menghapus artikel.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: true, message: 'Artikel tidak ditemukan.' });
    }

    res.status(200).json({
      error: false,
      message: 'Artikel berhasil dihapus.',
    });
  });
});

module.exports = router;
