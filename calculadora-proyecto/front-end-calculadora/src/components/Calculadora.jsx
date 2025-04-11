import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

// 🔁 URL dinámica según entorno: producción (Vercel) o desarrollo (localhost)
const API_BASE = import.meta.env.VITE_API_URL || 'https://backend-calculadora-ebon.vercel.app/';

function Calculadora() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [resultado, setResultado] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const operacion = e.target.value;

    fetch(`${API_BASE}/v1/calculadora/${operacion}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number1, number2 })
    })
      .then(res => res.json())
      .then(responseData => {
        setResultado(responseData.resultado);
      })
      .catch(error => {
        console.error('Error al conectar con el backend:', error);
        setResultado('Error de conexión');
      });
  }

  return (
    <div className="container">
      <h1 id="txtCalculadora">CALCULADORA</h1>
      <form>
        <input
          type="text"
          className="number"
          onChange={(e) => setNumber1(e.target.value)}
          placeholder="Número 1"
        /><br />
        <input
          type="text"
          className="number"
          onChange={(e) => setNumber2(e.target.value)}
          placeholder="Número 2"
        /><br />
        <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit} />
        <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit} />
        <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit} />
        <input type="submit" className="btnEnviar" value="dividir" onClick={handleSubmit} />
      </form>
      <Resultado resultado={`El resultado es ${resultado}`} />
    </div>
  );
}

export default Calculadora;
