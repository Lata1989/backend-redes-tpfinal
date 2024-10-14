import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;

export const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db('REDESTP'); // Conectar a la base de datos REDESTP
  console.log('Conexión a la base de datos establecida');
};

export const getDB = () => {
  if (!db) {
    throw new Error('La conexión a la base de datos no está establecida');
  }
  return db;
};
