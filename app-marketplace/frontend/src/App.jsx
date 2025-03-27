import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from '../components/Login';
import RegisterUser from '../components/RegisterUser';
import RegisterAdmin from '../components/RegisterAdmin';
import DashboardUser from '../components/DashboardUser';
import DashboardAdmin from '../components/DashboardAdmin';
import Pagar from '../components/Compra';
import authService from '../services/authService';
import ThemeContext from '../context/ThemeContext';

function App() {
    const [role, setRole] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
        // Recuperar preferencia del usuario
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme === 'true';
    });

    useEffect(() => {
        const userRole = localStorage.getItem("role"); // Obtener rol del localStorage
        setRole(userRole);
    }, []);

    useEffect(() => {
        // Guardar preferencia del usuario
        localStorage.setItem('darkMode', darkMode);
        
        // Aplicar clase al body
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <Router>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Login onLogin={setRole} />} /> {/* Pasa setRole como prop */}
                    <Route path="/register-user" element={<RegisterUser />} />
                    <Route path="/register-admin" element={<RegisterAdmin />} />

                    {/* Rutas protegidas */}
                    {role === 'user' && (
                        <>
                            <Route path="/dashboard-user" element={<DashboardUser />} />
                            <Route path="/pagar/:id" element={<Pagar />} />
                        </>
                    )}

                    {role === 'admin' && (
                        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                    )}

                    {/* Redirigir si la ruta no existe */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;
