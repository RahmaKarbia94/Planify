
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Initialize Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get('/', (req, res) => res.send('Planify API is running...'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));