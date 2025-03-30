import { useState, useContext } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import ThemeContext from "../context/ThemeContext";

const RegisterUser = () => {
  const { darkMode } = useContext(ThemeContext);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        correo,
        password,
        role: "user",
      });

      alert("Usuario registrado. Ahora inicie sesión.");
      window.location.href = "/";
    } catch (err) {
      console.error("Error en la solicitud:", err.response?.data || err);
      alert(err.response?.data?.message || "Error en el registro.");
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
          Registro de Usuario
        </h2>
        <form onSubmit={handleRegister}>
          <div className="input-group" style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <FaEnvelope style={{ marginRight: "10px", color: darkMode ? "#63b3ed" : "#2b6cb0" }} />
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="input"
              style={{
                flex: 1,
                backgroundColor: darkMode ? "#4a5568" : "#ffffff",
                color: darkMode ? "#f7fafc" : "#1a202c",
              }}
              required
            />
          </div>
          <div className="input-group" style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <FaLock style={{ marginRight: "10px", color: darkMode ? "#63b3ed" : "#2b6cb0" }} />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              style={{
                flex: 1,
                backgroundColor: darkMode ? "#4a5568" : "#ffffff",
                color: darkMode ? "#f7fafc" : "#1a202c",
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="button button-green"
            style={{
              width: "100%",
              backgroundColor: darkMode ? "#38a169" : "#68d391",
              color: "#ffffff",
            }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
