import { Router } from 'express';
import moviesService from '../services/moviesService.js';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await moviesService.getAll()
    console.log(movies);
    res.render('home', { movies });
});

export default router;