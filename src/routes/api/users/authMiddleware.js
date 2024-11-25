const jwt = require('jsonwebtoken');
require('dotenv').config(); // Menggunakan .env untuk menyimpan SECRET_KEY

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY tidak ditemukan di environment variables!');
}

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      error: true,
      status: 'failure',
      message: 'Token diperlukan atau format salah 403.',
    });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token);

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).json({
        error: true,
        status: 'failure',
        message: 'Token tidak valid atau kedaluwarsa 401.',
      });
    }

    req.userId = decoded.userId; // Simpan userId dari token
    console.log('Decoded User ID:', decoded.userId);
    next();
  });
};

module.exports = authenticate;
