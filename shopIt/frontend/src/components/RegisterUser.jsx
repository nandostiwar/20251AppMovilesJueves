import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/register', { email, password });
      alert('Usuario registrado exitosamente');
      navigate('/');
    } catch (error) {
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Registrar Usuario</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', margin: '10px 0' }}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', margin: '10px 0' }}
      />
      <br />
      <button onClick={handleRegister} style={{ padding: '10px 20px' }}>
        Registrar Usuario
      </button>
      <div style={{ marginTop: '20px' }}>
        <a href="/">Volver al inicio</a>
      </div>
    </div>
  );
};

export default RegisterUser;