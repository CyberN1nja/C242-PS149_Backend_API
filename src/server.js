const express = require('express');
const userRoutes = require('./routes/api/userRotes'); // Impor rute
const hMatRoutes = require('./routes/api/hMatRoutes'); // Impor rute
const userAuth = require('./routes/api/auth');

const app = express();
app.use(express.json()); // Untuk parsing JSON body

// Rute root utama untuk memastikan API bekerja
app.get('/', (req, res) => {
  try {
    // Jika API dalam keadaan baik
    res.send('Request success :)');
  } catch (error) {
    // Jika terjadi kesalahan
    res.status(500).json({
      error: true,
      message: 'API belum benar atau ada masalah saat mengaksesnya 505.',
    });
  }
});

// Menangani error lain yang tidak terduga
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Terjadi kesalahan internal di server 505.',
  });
});

app.use('/', userAuth);
app.use('/', userRoutes);
app.use('/', hMatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
