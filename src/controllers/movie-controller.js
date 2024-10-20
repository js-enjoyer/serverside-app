import express from 'express';
import formidable from 'formidable';

import moviesService from '../services/moviesService.js';

const router = express.Router();

router.use(express.urlencoded( {extended : false} ));

router.get('/create', (req, res) => {
    res.render('movie/create');
});

router.post('/create', async (req, res) => {
    await moviesService.create(req);

    res.redirect('/');
});

export default router;