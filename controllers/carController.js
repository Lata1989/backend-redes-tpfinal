import { getDB } from '../config/db.js';
import { crearAuto } from '../models/carModel.js';
import { ObjectId } from 'mongodb';
import { getChatGPTRecommendation } from '../utils/chatGPT.js';

// Crear un nuevo auto
export const createCarListing = async (req, res) => {
  const carData = req.body;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const newCar = crearAuto(carData);
  const result = await db.collection('cars').insertOne(newCar);

  res.status(201).json({ message: 'Auto agregado con éxito', carId: result.insertedId });
};

// Insertar varios autos
export const insertCarsInBulk = async (req, res) => {
  const carsData = req.body;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const cars = carsData.map(car => crearAuto(car));
  const result = await db.collection('cars').insertMany(cars);

  res.status(201).json({ message: 'Autos agregados con éxito', insertedCount: result.insertedCount });
};

// Obtener todos los autos
export const getAllCarListings = async (req, res) => {
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const cars = await db.collection('cars').find({}).toArray();
  res.json(cars);
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

// Modificar un auto
export const updateCarListing = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const updatedCar = await db.collection('cars').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateData },
    { returnDocument: 'after' }
  );

  if (!updatedCar.value) {
    return res.status(404).json({ message: 'Auto no encontrado' });
  }

  res.json({ message: 'Auto actualizado con éxito', updatedCar: updatedCar.value });
};

// Borrar un auto
export const deleteCarListing = async (req, res) => {
  const { id } = req.params;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const deletedCar = await db.collection('cars').deleteOne({ _id: new ObjectId(id) });
  
  if (deletedCar.deletedCount === 0) {
    return res.status(404).json({ message: 'Auto no encontrado' });
  }

  res.json({ message: 'Auto eliminado con éxito' });
};

// Recomendación de auto usando ChatGPT
export const recommendCar = async (req, res) => {
  const { preferencias } = req.body; // Supongamos que pasas preferencias del cliente
  const db = getDB(); // Obtenemos la conexión a la base de datos

  const cars = await db.collection('cars').find({}).toArray();
  
  const recomendacion = await getChatGPTRecommendation(preferencias, cars);
  
  res.json(recomendacion);
};
