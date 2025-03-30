import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { FaEnvelope, FaLock } from "react-icons/fa";
import ThemeContext from "../context/ThemeContext";

const Login = ({ onLogin }) => {
  const { darkMode } = useContext(ThemeContext);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(correo, password);
      console.log("Login exitoso:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      onLogin(data.role);

      if (data.role === "admin") {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard-user");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
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
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="input-group" style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <FaEnvelope style={{ marginRight: "10px", color: darkMode ? "#63b3ed" : "#2b6cb0" }} />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
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
              value={password}
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
            type="submit"
            className="button button-blue"
            style={{
              width: "100%",
              backgroundColor: darkMode ? "#3182ce" : "#63b3ed",
              color: "#ffffff",
            }}
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button
            onClick={() => navigate("/register-user")}
            className="button button-green"
            style={{
              width: "100%",
              marginBottom: "10px",
              backgroundColor: darkMode ? "#38a169" : "#68d391",
              color: "#ffffff",
            }}
          >
            Registrarse como Usuario
          </button>
          <button
            onClick={() => navigate("/register-admin")}
            className="button button-red"
            style={{
              width: "100%",
              backgroundColor: darkMode ? "#e53e3e" : "#fc8181",
              color: "#ffffff",
            }}
          >
            Registrarse como Administrador
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;