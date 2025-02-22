require('dotenv').config(); // 👈 Esto va arriba de todo
const express = require('express'); 
const { urlencoded, json } = require('express');
const router = require('./routes/calculadora.routes.js');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// 👉 Conexión usando la variable del .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar:', err));

app.use('/v1/calculadora', router);

app.listen(3500, () => {
  console.log("Listening at port 3500");
});
