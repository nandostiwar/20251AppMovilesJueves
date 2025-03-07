const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Permitir peticiones del frontend
app.use(express.json()); // Permitir JSON en las solicitudes

let pedidos = []; // Lista temporal de pedidos

// Ruta para obtener los pedidos
app.get("/pedidos", (req, res) => {
    res.json(pedidos);
});

// Ruta para agregar un pedido
app.post("/pedidos", (req, res) => {
    const { texto } = req.body;
    if (!texto) {
        return res.status(400).json({ error: "El pedido no puede estar vacío" });
    }
    const nuevoPedido = { id: Date.now(), texto };
    pedidos.push(nuevoPedido);
    res.status(201).json(nuevoPedido);
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

