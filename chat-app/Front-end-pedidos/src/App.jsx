import { useState, useEffect } from "react";

function App() {
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    // Recuperar IDs de mensajes enviados por este usuario desde localStorage
    const obtenerMensajesGuardados = () => {
        return JSON.parse(localStorage.getItem("mensajesEnviados")) || [];
    };

    const guardarMensajeLocalmente = (id) => {
        const mensajesGuardados = obtenerMensajesGuardados();
        localStorage.setItem("mensajesEnviados", JSON.stringify([...mensajesGuardados, id]));
    };

    // Obtener mensajes al cargar la página
    useEffect(() => {
        fetch("https://dkx5r8fm-5000.use2.devtunnels.ms/pedidos")
            .then((res) => res.json())
            .then((data) => setMensajes(data));
    }, []);

    // Función para enviar un mensaje
    const enviarMensaje = () => {
        if (!mensaje.trim()) return;

        fetch("https://dkx5r8fm-5000.use2.devtunnels.ms/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto: mensaje }),
        })
            .then((res) => res.json())
            .then((nuevoMensaje) => {
                setMensajes([...mensajes, nuevoMensaje]);
                guardarMensajeLocalmente(nuevoMensaje.id); // Guardar ID en localStorage
            });

        setMensaje(""); // Limpiar input después de enviar
    };

    // Obtener los mensajes guardados para mantener la alineación
    const mensajesEnviados = obtenerMensajesGuardados();

    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>💬 Chat en Tiempo Real</h1>
            <div style={styles.chatBox}>
                {mensajes.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            ...styles.mensaje,
                            alignSelf: mensajesEnviados.includes(msg.id) ? "flex-end" : "flex-start",
                            backgroundColor: mensajesEnviados.includes(msg.id) ? "#ffb6c1" : "#ffffff",
                        }}
                    >
                        {msg.texto}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    style={styles.input}
                />
                <button onClick={enviarMensaje} style={styles.button}>Enviar</button>
            </div>
        </div>
    );
}

// Estilos en línea con tonos rosados
const styles = {
    container: { 
        maxWidth: "400px", 
        margin: "auto", 
        padding: "20px", 
        backgroundColor: "#ffe4e1", // Fondo rosa claro
        borderRadius: "12px", 
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
    },
    titulo: {
        textAlign: "center",
        color: "#d63384", // Rosa oscuro profesional
    },
    chatBox: { 
        height: "300px", 
        overflowY: "auto", 
        border: "2px solid #ffb6c1", // Borde rosa claro
        padding: "10px", 
        display: "flex", 
        flexDirection: "column",
        borderRadius: "8px",
        backgroundColor: "#fff0f5", // Rosa suave para el fondo del chat
    },
    mensaje: { 
        padding: "12px", 
        borderRadius: "8px", 
        margin: "5px 0", 
        maxWidth: "70%", 
        fontWeight: "bold",
        color: "#d63384",
        border: "1px solid #ff69b4",
    },
    inputContainer: { 
        display: "flex", 
        marginTop: "10px" 
    },
    input: { 
        flex: 1, 
        padding: "8px", 
        fontSize: "16px",
        border: "2px solid #ff69b4", // Borde rosa fuerte
        borderRadius: "8px",
        backgroundColor: "white",
        color: "#d63384",
        fontWeight: "bold",
    },
    button: { 
        marginLeft: "5px", 
        padding: "8px", 
        fontSize: "16px",
        backgroundColor: "#ff69b4", // Botón rosa fuerte
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "8px",
        fontWeight: "bold",
        transition: "background 0.3s",
    },
};

export default App;
