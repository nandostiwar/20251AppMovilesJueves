const app = require('./app');
const conectarDB = require('./config/db');
require('dotenv').config();

// Conectar a la base de datos
conectarDB().then(conectado => {
  if (conectado) {
    console.log('✅ Conexión a MongoDB Atlas establecida correctamente');
  }
});

// Ruta para verificar la conexión (opcional)
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: 'conectado',
    mensaje: 'El servidor está conectado a MongoDB Atlas'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});