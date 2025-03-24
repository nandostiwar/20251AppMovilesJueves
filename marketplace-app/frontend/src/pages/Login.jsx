import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(formData);
      const { user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.role === 'admin') {
        navigate('/dashboard/admin');
      } else {
        navigate('/dashboard/user');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bienvenido a Nuestro Marketplace
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Por favor inicia sesión o regístrese para acceder a nuestro sitio.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input pl-10"
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="relative mt-4">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input pl-10"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Iniciar Sesión
            </button>
          </div>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/register/admin')} 
            className="btn btn-secondary flex items-center justify-center"
          >
            <FaUserPlus className="mr-2" />
            Registrarse como Administrador
          </button>
          <button 
            onClick={() => navigate('/register/user')} 
            className="btn btn-secondary flex items-center justify-center"
          >
            <FaUserPlus className="mr-2" />
            Registrarse como Usuario
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;