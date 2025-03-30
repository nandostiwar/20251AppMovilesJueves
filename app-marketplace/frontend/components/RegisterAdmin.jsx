import { useState, useContext } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import ThemeContext from "../context/ThemeContext";

const RegisterAdmin = () => {
  const { darkMode } = useContext(ThemeContext);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        correo,
        password,
        role: "admin",
      });
      alert("Administrador registrado. Ahora inicie sesión.");
      window.location.href = "/";
    } catch (err) {
      console.error(err.response.data);
      alert("Error en el registro.");
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: darkMode ? "#1a202c" : "#f7fafc",
        color: darkMode ? "#f7fafc" : "#1a202c",
      }}
    >
      <div
        className="card"
        style={{
          width: "400px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: darkMode ? "#2d3748" : "#ffffff",
          boxShadow: darkMode ? "0 4px 6px rgba(0, 0, 0, 0.9)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="title" style={{ color: darkMode ? "#63b3ed" : "#2b6cb0" }}>
          Registro de Administrador
        </h2>
        <div className="input-group" style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
          <FaEnvelope style={{ marginRight: "10px", color: darkMode ? "#63b3ed" : "#2b6cb0" }} />
          <input
            type="email"
            placeholder="Correo"
            onChange={(e) => setCorreo(e.target.value)}
            className="input"
            style={{
              flex: 1,
              backgroundColor: darkMode ? "#4a5568" : "#ffffff",
              color: darkMode ? "#f7fafc" : "#1a202c",
            }}
          />
        </div>
        <div className="input-group" style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
          <FaLock style={{ marginRight: "10px", color: darkMode ? "#63b3ed" : "#2b6cb0" }} />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            style={{
              flex: 1,
              backgroundColor: darkMode ? "#4a5568" : "#ffffff",
              color: darkMode ? "#f7fafc" : "#1a202c",
            }}
          />
        </div>
        <button
          onClick={handleRegister}
          className="button button-red"
          style={{
            width: "100%",
            backgroundColor: darkMode ? "#e53e3e" : "#fc8181",
            color: "#ffffff",
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default RegisterAdmin;