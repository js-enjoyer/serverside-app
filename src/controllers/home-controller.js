import { Router } from 'express';
import moviesService from '../services/moviesService.js';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await moviesService.getAll()
    
    res.render('home/home', { movies });
});

export default router;