import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const data = await authService.login(correo, password);
        console.log("Login exitoso:", data);
        
        // Redirigir según el rol del usuario
        if (data.role === 'admin') {
            navigate("/dashboard-admin");
        } else {
            navigate("/dashboard-user");
        }
    } catch (error) {
        alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="button button-blue">
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button
            onClick={() => navigate("/register-user")}
            className="button button-green"
          >
            Registrarse como Usuario
          </button>
          <button
            onClick={() => navigate("/register-admin")}
            className="button button-red"
          >
            Registrarse como Administrador
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;