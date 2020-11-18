import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
    res.json({ ok: true, status: 'hello world' });
});

export default router;
