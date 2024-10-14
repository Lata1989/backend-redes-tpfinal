import { getDB } from '../config/db.js';
import { crearUsuario } from '../models/userModel.js';
import { generarJWT } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { nombre, apellido, dni, email, password } = req.body;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  // Verificar si el email o el dni ya existen
  const existingUser = await db.collection('users').findOne({ $or: [{ email }, { dni }] });
  if (existingUser) {
    return res.status(400).json({ message: 'El email o el DNI ya están registrados' });
  }

  // Crear usuario
  const newUser = crearUsuario(nombre, apellido, dni, email, password);
  const result = await db.collection('users').insertOne(newUser);

  const token = generarJWT(result.insertedId);
  res.status(201).json({ message: 'Usuario registrado con éxito', token });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const db = getDB(); // Obtenemos la conexión a la base de datos

  // Verificar si el usuario existe
  const user = await db.collection('users').findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // Generar token JWT
  const token = generarJWT(user._id);
  res.json({ token });
};
