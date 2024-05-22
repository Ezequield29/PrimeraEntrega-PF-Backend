import { Router } from 'express';
import __dirname from '../utils.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default router;