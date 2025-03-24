import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { FaEnvelope, FaLock, FaArrowLeft, FaUser } from 'react-icons/fa';

function UserRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      await api.registerUser(formData);
      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" />
          Back to Login
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <FaUser className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Create User Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Register as a new user
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input pl-10"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input pl-10"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full flex items-center justify-center ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;