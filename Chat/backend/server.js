// backend/server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

const PORT = 3001;

// Array para almacenar mensajes en memoria
let messages = [];

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Enviar historial de mensajes al conectar
  socket.emit('chatHistory', messages);

  // Escuchar mensajes del cliente
  socket.on('sendMessage', (message) => {
    const newMessage = { id: Date.now(), text: message };
    messages.push(newMessage);
    
    // Enviar mensaje a todos los clientes
    io.emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
