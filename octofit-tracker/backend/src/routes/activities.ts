import { Router } from 'express';
import Activity from '../models/Activity.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user', 'name email');
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newActivity = await Activity.create(req.body);
    res.status(201).json({ message: 'Activity logged', activity: newActivity });
  } catch (error) {
    res.status(400).json({ error: 'Unable to log activity', details: error instanceof Error ? error.message : undefined });
  }
});

export default router;
