const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let mensajes = []; // Aquí se almacenan los mensajes temporalmente

// Obtener todos los mensajes
app.get("/mensajes", (req, res) => {
    res.json(mensajes);
});

// Enviar un mensaje
app.post("/mensajes", (req, res) => {
    const { texto, remitente } = req.body;
    if (!texto || !remitente) return res.status(400).json({ error: "Mensaje y remitente son obligatorios" });

    const nuevoMensaje = { remitente, texto };
    mensajes.push(nuevoMensaje);
    res.json(nuevoMensaje);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

