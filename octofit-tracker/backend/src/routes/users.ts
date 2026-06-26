import { Router } from 'express';
import User from '../models/User.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().populate('team', 'name');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      joinedAt: new Date()
    });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user', details: error instanceof Error ? error.message : undefined });
  }
});

export default router;
