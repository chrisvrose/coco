/**
 * @file Test routes to ensure uptime
 */
import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
    res.json({ ok: true });
});

router.get('/teapot', (req, res, next) => {
    res.status(418).json({ ok: true, status: 'teapot' });
});

export default router;
