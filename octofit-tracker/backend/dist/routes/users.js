import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        users: [
            { id: 'user-1', name: 'Ava Octane', email: 'ava@example.com', role: 'member' },
            { id: 'user-2', name: 'Luca Sprint', email: 'luca@example.com', role: 'coach' }
        ]
    });
});
router.post('/', (req, res) => {
    const newUser = { id: `user-${Date.now()}`, ...req.body };
    res.status(201).json({ message: 'User created', user: newUser });
});
export default router;
