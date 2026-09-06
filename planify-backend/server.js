const express = require('express');
const cors = require('cors');

const app = express();

// Must be registered before any app.use('/api', ...) routes
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());


const connectDB = require('./config/db');


// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
// Initialize Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get('/', (req, res) => res.send('Planify API is running...'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));