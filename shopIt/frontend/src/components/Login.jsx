import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
      localStorage.setItem('token', response.data.token);
      
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setErrorMessage('Credenciales inválidas');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Iniciar Sesión</h2>
        {errorMessage && <p className="mt-2 text-red-500 text-center">{errorMessage}</p>}
        <div className="mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          onClick={handleLogin}
          className={`w-full mt-6 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        <div className="mt-4 text-center text-gray-600">
          <a href="/register-admin" className="text-blue-500 hover:underline">Registrar Admin</a>
          <span className="mx-2">|</span>
          <a href="/register-user" className="text-blue-500 hover:underline">Registrar Usuario</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
