import express from 'express';
import usersRouter from './routes/users.ts';
import teamsRouter from './routes/teams.ts';
import activitiesRouter from './routes/activities.ts';
import leaderboardRouter from './routes/leaderboard.ts';
import workoutsRouter from './routes/workouts.ts';
import connectDb, { mongoUri } from './db.ts';

const app = express();
const port = 8000;
const host = '0.0.0.0';

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running.' });
});

const codespaceName = process.env.CODESPACE_NAME;
const backendUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

connectDb()
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, host, () => {
      console.log(`Server listening on ${backendUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
