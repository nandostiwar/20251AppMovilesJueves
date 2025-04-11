const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/calculadora.routes.js');
const cors = require('cors');

const app = express();

// Middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Rutas
app.use('/v1/calculadora', router);

// Puerto dinámico para producción (Render, Railway, etc.)
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
