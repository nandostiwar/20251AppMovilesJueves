import { useState, useEffect } from "react";

function App() {
    const [pedido, setPedido] = useState("");
    const [pedidos, setPedidos] = useState([]);

    // Cargar los pedidos cuando se monta el componente
    useEffect(() => {
        fetch("https://6qstd1vj-5000.use2.devtunnels.ms/pedidos")
            .then((res) => res.json())
            .then((data) => setPedidos(data));
    }, []);

    // Función para enviar un pedido
    const enviarPedido = () => {
        if (!pedido.trim()) return;

        fetch("https://6qstd1vj-5000.use2.devtunnels.ms/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto: pedido }),
        })
            .then((res) => res.json())
            .then((nuevoPedido) => setPedidos([...pedidos, nuevoPedido]));

        setPedido(""); // Limpiar el input después de enviar
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📋 Lista de Pedidos</h1>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={pedido}
                    onChange={(e) => setPedido(e.target.value)}
                    placeholder="Escribe un pedido..."
                    style={styles.input}
                />
                <button onClick={enviarPedido} style={styles.button}>Agregar</button>
            </div>

            <ul style={styles.list}>
                {pedidos.map((p, index) => (
                    <li key={index} style={styles.listItem}>{p.texto}</li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        backgroundColor: "#ffe4e1", // Rosa pastel claro
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
    },
    title: {
        color: "#d63384", // Rosa oscuro profesional
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    inputContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        padding: "12px",
        width: "70%",
        maxWidth: "300px",
        borderRadius: "8px",
        border: "2px solid #ff69b4",
        fontSize: "16px",
        backgroundColor: "white",
        color: "#d63384",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#ff69b4", // Rosa vibrante
        color: "white",
        padding: "12px 18px",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s",
        fontWeight: "bold",
    },
    list: {
        listStyle: "none",
        padding: 0,
        marginTop: "20px",
    },
    listItem: {
        backgroundColor: "white",
        padding: "12px",
        margin: "5px auto",
        borderRadius: "8px",
        width: "50%",
        maxWidth: "300px",
        fontSize: "16px",
        color: "#d63384",
        textAlign: "left",
        fontWeight: "bold",
        border: "2px solid #ff69b4",
    }
};

export default App;

