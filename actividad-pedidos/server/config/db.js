const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;

    if (!dbURI) {
      console.error("❌ Error: La variable de entorno MONGO_URI no está definida.");
      process.exit(1);
    }

    const conexion = await mongoose.connect(dbURI);

    console.log(`✅ MongoDB Atlas conectado: ${conexion.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = conectarDB;
