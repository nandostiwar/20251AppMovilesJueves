// src/Chat.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://nsmgw1df-5000.use2.devtunnels.ms/', {
    transports: ['websocket'], // Asegúrate de usar WebSocket
});

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Escuchar mensajes entrantes
    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Enviar un mensaje
    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('sendMessage', newMessage);
            setNewMessage('');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Chat en Tiempo Real</h2>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje"
                    style={{ padding: '10px', marginRight: '10px', width: '300px' }}
                />
                <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
                    Enviar
                </button>
            </div>
            <div>
                <h3>Mensajes</h3>
                {messages.length === 0 ? (
                    <p>No hay mensajes disponibles.</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {messages.map((msg, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '10px',
                                    margin: '5px 0',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                }}
                            >
                                <strong>[{msg.id.slice(0, 5)}]:</strong> {msg.message}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Chat;