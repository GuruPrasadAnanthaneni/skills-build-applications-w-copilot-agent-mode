import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
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
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit';
const codespaceName = process.env.CODESPACE_NAME;
const localUrl = `http://localhost:${port}`;
const codespaceUrl = codespaceName ? `https://${port}-${codespaceName}.githubpreview.dev` : null;
mongoose
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, host, () => {
        console.log(`Server listening on ${localUrl}`);
        if (codespaceUrl) {
            console.log(`Codespaces API URL: ${codespaceUrl}`);
        }
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
