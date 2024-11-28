// db.js
const mysql = require('mysql2');
require('dotenv').config();

// Konfigurasi koneksi ke Cloud SQL
const db = mysql.createConnection({
  host: '34.101.127.61', // ke env
  user: 'root',
  password: 'admin123',
  database: 'catloris',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to Cloud SQL database.');
});

module.exports = db; 
