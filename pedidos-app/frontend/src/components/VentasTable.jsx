import { useState, useEffect } from "react";
import axios from "axios";

const VentasTable = () => {
  const [ventas, setVentas] = useState([]);

  const cargarVentas = async () => {
    const { data } = await axios.get("https://fhd7nngp-5000.use2.devtunnels.ms/api/ventas");
    setVentas(data);
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  return (
    <div>
      <button className="update-btn" onClick={cargarVentas}>Actualizar</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Producto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v, i) => (
            <tr key={i}>
              <td>{v.nombre}</td>
              <td>{v.producto}</td>
              <td>{new Date(v.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasTable;
