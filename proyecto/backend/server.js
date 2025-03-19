const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [""], // URL del frontend
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());

let usuarios = {}; // Objeto para guardar usuarios con su socket ID

// Cuando un cliente se conecta
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado:", socket.id);

    // Guardar el usuario con su socket ID
    socket.on("setUsername", (username) => {
        usuarios[socket.id] = username;
        console.log("Usuarios conectados:", usuarios); // Verificar usuarios conectados
        io.emit("userList", Object.values(usuarios)); // Enviar la lista actualizada a todos
    });

    // Enviar mensaje privado
    socket.on("sendMessage", ({ text, to }) => {
        const destinatarioSocketId = Object.keys(usuarios).find(
            key => usuarios[key] === to
        );

        if (destinatarioSocketId) {
            const nuevoMensaje = { text, from: usuarios[socket.id] };
            io.to(destinatarioSocketId).emit("receiveMessage", nuevoMensaje);
            socket.emit("receiveMessage", nuevoMensaje); // También mostrar el mensaje al remitente
        }
    });

    // Manejar desconexión de usuario
    socket.on("disconnect", () => {
        delete usuarios[socket.id];

        // Actualizar lista de usuarios en todos los clientes
        io.emit("userList", Object.values(usuarios));
    });
});

// Iniciar el servidor
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
