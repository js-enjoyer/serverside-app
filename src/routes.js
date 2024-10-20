import { Router } from 'express';
import homeController from './controllers/home-controller.js'
import createController from './controllers/movie-controller.js'

const router = Router();

router.use(homeController);
router.use('/movie', createController)

export default router;