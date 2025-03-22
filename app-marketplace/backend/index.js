import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import ventaRoutes from './routes/ventaRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('🟢 MongoDB conectado correctamente'))
.catch((error) => {
    console.error('🔴 Error conectando a MongoDB:', error.message);
    process.exit(1); // Detiene la app si no se puede conectar
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/ventas', ventaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🟢 Servidor corriendo en el puerto ${PORT}`);
});
