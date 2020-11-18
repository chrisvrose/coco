import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
    res.json({ ok: true });
});

router.get('/teapot', async (req, res, next) => {
    res.status(418).json({ ok: true, status: 'teapot' });
});

export default router;
