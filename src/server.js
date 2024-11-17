const express = require('express');
const userRoutes = require('./routes/userRotes'); // Impor rute
const hMatRoutes = require('./routes/hMatRoutes'); // Impor rute

const app = express();
app.use(express.json()); // Untuk parsing JSON body

// Gunakan rute yang diimpor

// rute user dari var userRoutes
app.use('/', userRoutes);
// rute healt matrics dari var hMatRoutes
app.use('/', hMatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
