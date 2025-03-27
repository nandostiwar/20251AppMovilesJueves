import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const registerUser = async (correo, password) => {
    return axios.post(`${API_URL}/register`, { correo, password, role: 'user' });
};

const registerAdmin = async (correo, password) => {
    return axios.post(`${API_URL}/register`, { correo, password, role: 'admin' });
};

const login = async (correo, password) => {
    try {
        const res = await axios.post(`${API_URL}/login`, { correo, password });

        if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
        }

        return res.data;
    } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        throw error;
    }
};


const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/'; // Redirigir al login
};

const getRole = () => {
    return localStorage.getItem('role');
};

const authService = { registerUser, registerAdmin, login, logout, getRole };
export default authService;
