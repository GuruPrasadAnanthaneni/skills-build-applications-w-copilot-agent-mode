import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        activities: [
            { id: 'activity-1', type: 'running', durationMinutes: 40, calories: 420 },
            { id: 'activity-2', type: 'cycling', durationMinutes: 65, calories: 620 }
        ]
    });
});
router.post('/', (req, res) => {
    const newActivity = { id: `activity-${Date.now()}`, ...req.body };
    res.status(201).json({ message: 'Activity logged', activity: newActivity });
});
export default router;
