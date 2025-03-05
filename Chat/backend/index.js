const express = require("express");
const http = require("http");  // Necesario para Socket.io
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app); // Crear servidor HTTP
const io = new Server(server, {
    cors: {
        origin: [
            "https://1mb0kp0g-3000.use.devtunnels.ms", // Frontend
            "https://1mb0kp0g-5000.use.devtunnels.ms"  // Backend (opcional)
        ],
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());

let mensajes = []; // Lista en memoria para almacenar los mensajes

// Cuando un cliente se conecta
io.on("connection", (socket) => {
    console.log(" Nuevo usuario conectado:", socket.id);

    // Enviar historial de mensajes al nuevo usuario
    socket.emit("mensajes", mensajes);

    // Escuchar mensajes nuevos
    socket.on("mensaje", (data) => {
        const nuevoMensaje = { id: mensajes.length + 1, texto: data };
        mensajes.push(nuevoMensaje);

        // Enviar el mensaje a TODOS los clientes
        io.emit("mensaje", nuevoMensaje);
    });

    // Cuando un usuario se desconecta
    socket.on("disconnect", () => {
        console.log(" Usuario desconectado:", socket.id);
    });
});

// Iniciar el servidor
const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
