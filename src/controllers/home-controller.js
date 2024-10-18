import { Router } from 'express';
import movies from '../movie-database/movies.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { movies });
});

export default router;