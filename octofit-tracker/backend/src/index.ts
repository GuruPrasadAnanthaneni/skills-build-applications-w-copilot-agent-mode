import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'OctoFit Tracker API is running.' });
});

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit';

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
