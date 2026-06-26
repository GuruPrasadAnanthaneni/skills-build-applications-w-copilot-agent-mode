import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).populate('user', 'name role');
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
