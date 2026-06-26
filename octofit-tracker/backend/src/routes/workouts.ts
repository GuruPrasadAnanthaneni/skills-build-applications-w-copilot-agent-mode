import { Router } from 'express';
import Workout from '../models/Workout.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(201).json({ message: 'Workout created', workout: newWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create workout', details: error instanceof Error ? error.message : undefined });
  }
});

export default router;
