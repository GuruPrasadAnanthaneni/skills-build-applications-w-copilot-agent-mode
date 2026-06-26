import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        leaderboard: [
            { rank: 1, name: 'Ava Octane', score: 1540 },
            { rank: 2, name: 'Luca Sprint', score: 1380 },
            { rank: 3, name: 'Mia Flex', score: 1290 }
        ]
    });
});
export default router;
