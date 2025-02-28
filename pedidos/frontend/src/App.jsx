import { useState, useEffect } from "react";

function App() {
    const [pedido, setPedido] = useState("");
    const [pedidos, setPedidos] = useState([]);

    // Cargar los pedidos cuando se monta el componente
    useEffect(() => {
        //fetch("http://localhost:5000/pedidos")
        fetch("https://12vww3f6-5000.use2.devtunnels.ms/pedidos")
            .then((res) => res.json())
            .then((data) => setPedidos(data));
    }, []);

    // Función para enviar un pedido
    const enviarPedido = () => {
        if (!pedido.trim()) return;

        //fetch("http://localhost:5000/pedidos", {
        fetch("https://12vww3f6-5000.use2.devtunnels.ms/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto: pedido }),
        })
            .then((res) => res.json())
            .then((nuevoPedido) => setPedidos([...pedidos, nuevoPedido]));

        setPedido(""); // Limpiar el input después de enviar
    };

    return (
        <div>
            <h1>Lista de Pedidos NDO</h1>
            <input
                type="text"
                value={pedido}
                onChange={(e) => setPedido(e.target.value)}
                placeholder="Escribe un pedido"
            />
            <button onClick={enviarPedido}>Agregar Pedido</button>

            <ul>
                {pedidos.map((p) => (
                    <li key={p.id}>{p.texto}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
