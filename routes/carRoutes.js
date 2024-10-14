import express from 'express';
import { createCarListing, getCarById, searchCars, updateCarListing, deleteCarListing, insertCarsInBulk, getAllCarListings, recommendCar } from '../controllers/carController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createCarListing);       // Insertar un auto
router.post('/create-bulk', protect, insertCarsInBulk);  // Insertar varios autos
router.get('/', protect, getAllCarListings);             // Obtener todos los autos
router.get('/:id', protect, getCarById);                 // Obtener un auto por ID
router.get('/search', searchCars);                       // Búsqueda por criterios
router.put('/:id', protect, updateCarListing);           // Modificar un auto
router.delete('/:id', protect, deleteCarListing);        // Borrar un auto
router.post('/recommend', protect, recommendCar);        // Obtener recomendación de auto

export default router;
