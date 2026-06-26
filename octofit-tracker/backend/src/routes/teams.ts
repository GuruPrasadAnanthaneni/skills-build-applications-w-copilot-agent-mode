import { Router } from 'express';
import Team from '../models/Team.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('memberIds', 'name email');
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTeam = await Team.create({
      ...req.body,
      createdAt: new Date()
    });
    res.status(201).json({ message: 'Team created', team: newTeam });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create team', details: error instanceof Error ? error.message : undefined });
  }
});

export default router;
