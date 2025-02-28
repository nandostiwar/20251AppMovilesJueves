const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let pedidos = []; // Lista en memoria para almacenar los pedidos

// Ruta para obtener todos los pedidos
app.get("/pedidos", (req, res) => {
    res.json(pedidos);
});

// Ruta para agregar un pedido
app.post("/pedidos", (req, res) => {
    const { texto } = req.body;
    if (!texto) return res.status(400).json({ error: "El pedido no puede estar vacío" });

    const nuevoPedido = { id: pedidos.length + 1, texto };
    pedidos.push(nuevoPedido);

    res.status(201).json(nuevoPedido);
});

// Iniciar el servidor en el puerto 5000
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));