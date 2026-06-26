import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        teams: [
            { id: 'team-1', name: 'Ocean Runners', members: 12 },
            { id: 'team-2', name: 'Mountain Climbers', members: 9 }
        ]
    });
});
router.post('/', (req, res) => {
    const newTeam = { id: `team-${Date.now()}`, ...req.body };
    res.status(201).json({ message: 'Team created', team: newTeam });
});
export default router;
