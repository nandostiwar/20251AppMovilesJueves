import { useState } from "react";
import axios from "axios";

const VentaForm = () => {
  const [nombre, setNombre] = useState("");
  const [producto, setProducto] = useState("");

  const productos = ["PlayStation 5", "Xbox Series X", "Nintendo Switch", "PC Gamer"];

  const handleSubmit = async () => {
    if (!nombre || !producto) {
      alert("Por favor completa todos los campos");
      return;
    }

    await axios.post("https://fhd7nngp-5000.use2.devtunnels.ms/api/ventas", { nombre, producto });
    setNombre("");
    setProducto("");
  };

  return (
    <div className="form-container">
      <input 
        type="text" 
        placeholder="Nombre" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
      />
      <select value={producto} onChange={(e) => setProducto(e.target.value)}>
        <option value="">Selecciona un producto</option>
        {productos.map((prod, index) => (
          <option key={index} value={prod}>{prod}</option>
        ))}
      </select>
      <button onClick={handleSubmit}>Enviar Pedido</button>
    </div>
  );
};

export default VentaForm;
