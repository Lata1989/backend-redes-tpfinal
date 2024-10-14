import express from 'express';
import { createCar, getCarById, searchCars, recommendCar } from '../controllers/carController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createCar);
router.get('/:id', protect, getCarById);
router.get('/search', searchCars);
router.get('/recommend', recommendCar);

export default router;
