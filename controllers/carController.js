import { getDB } from '../config/db.js';
import { crearAuto } from '../models/carModel.js';
import { obtenerRecomendacion } from '../utils/chatGPT.js';
import { ObjectId } from 'mongodb';

// Crear un nuevo auto
export const createCarListing = async (req, res) => {
  const carData = req.body;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const newCar = crearAuto(carData);
  const result = await db.collection('cars').insertOne(newCar);

  res.status(201).json({ message: 'Auto agregado con éxito', carId: result.insertedId });
};

// Obtener un auto por ID
export const getCarById = async (req, res) => {
  const { id } = req.params;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const car = await db.collection('cars').findOne({ _id: new ObjectId(id) });
  
  if (!car) {
    return res.status(404).json({ message: 'Auto no encontrado' });
  }

  res.json(car);
};

// Búsqueda de autos por criterios
export const searchCars = async (req, res) => {
  const criteria = req.query;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const cars = await db.collection('cars').find(criteria).toArray();
  res.json(cars);
};

// Recomendación de auto usando ChatGPT
export const recommendCar = async (req, res) => {
  const { preferencias } = req.body; // Supongamos que pasas preferencias del cliente
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const cars = await db.collection('cars').find({}).toArray();
  
  const recomendacion = await obtenerRecomendacion(preferencias, cars);
  
  res.json(recomendacion);
};
