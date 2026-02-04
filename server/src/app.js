const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
  res.send('API Portfolio Engine is Running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});