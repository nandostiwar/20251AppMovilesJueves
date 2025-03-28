import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/register', { email, password });
      alert('Admin registrado exitosamente');
      navigate('/');
    } catch (error) {
      alert('Error al registrar el admin');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Registrar Admin</h2>
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
        Registrar Admin
      </button>
      <div style={{ marginTop: '20px' }}>
        <a href="/">Volver al inicio</a>
      </div>
    </div>
  );
};

export default RegisterAdmin;