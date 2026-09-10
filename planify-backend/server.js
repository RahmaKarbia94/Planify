const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

connectDB();

mongoose.connection.once('open', async () => {
  try {
    await mongoose.connection.db.collection('users').dropIndex('name_1');
    console.log('Successfully dropped old name_1 index.');
  } catch (err) {
    // Ignore error if the index has already been dropped
  }
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/', (req, res) => res.send('Planify API is running...'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));