import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import './App.css';

//const socket = io("http://localhost:5000");
const socket = io("https://1mb0kp0g-5000.use.devtunnels.ms")

function App() {
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        socket.on("mensajes", (data) => setMensajes(data));
        socket.on("mensaje", (nuevoMensaje) => {
            setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);
        });

        return () => {
            socket.off("mensajes");
            socket.off("mensaje");
        };
    }, []);

    const enviarMensaje = () => {
        if (!mensaje.trim()) return;
        socket.emit("mensaje", mensaje);
        setMensaje("");
    };

    return (
        <div className="chat-container">
            <h1>ExpressTalk</h1>
            <div className="chat-box">
                {mensajes.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.id % 2 === 0 ? "received" : ""}`}
                    >
                        {msg.texto}
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={enviarMensaje}>Enviar</button>
            </div>
        </div>
    );
}

export default App;
