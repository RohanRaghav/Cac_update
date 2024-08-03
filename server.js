const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BootCamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const contentSchema = new mongoose.Schema({
  username: String,
  content: String,
});

const Content = mongoose.model('Content', contentSchema);

app.post('/submit', async (req, res) => {
  const { username, content } = req.body;

  try {
    const newContent = new Content({ username, content });
    await newContent.save();
    res.status(201).send('Content saved successfully!');
  } catch (error) {
    res.status(400).send('Error saving content: ' + error.message);
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
