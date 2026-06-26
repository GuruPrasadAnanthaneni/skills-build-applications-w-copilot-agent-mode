import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        workouts: [
            { id: 'workout-1', title: 'Full Body Blast', durationMinutes: 45, level: 'intermediate' },
            { id: 'workout-2', title: 'Cardio Charge', durationMinutes: 30, level: 'beginner' }
        ]
    });
});
router.post('/', (req, res) => {
    const newWorkout = { id: `workout-${Date.now()}`, ...req.body };
    res.status(201).json({ message: 'Workout created', workout: newWorkout });
});
export default router;
