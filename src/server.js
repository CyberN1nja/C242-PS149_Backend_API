const express = require('express');
const userRoutes = require('./routes/api/userRotes'); // Impor rute
const hMatRoutes = require('./routes/api/hMatRoutes'); // Impor rute
// const userAuth = require('./routes/models/auth');

const app = express();
app.use(express.json()); // Untuk parsing JSON body

// Gunakan rute yang diimpor

// rute user dari var userRoutes
app.use('/', userRoutes);
// rute healt matrics dari var hMatRoutes
app.use('/', hMatRoutes);

// app.use('/auth', userAuth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
