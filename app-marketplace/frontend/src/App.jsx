import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import RegisterAdmin from './components/RegisterAdmin';
import DashboardUser from './components/DashboardUser';
import DashboardAdmin from './components/DashboardAdmin';
import Pagar from './components/Pagar';
import authService from './services/authService';

function App() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = authService.getRole();
        setRole(userRole);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Login />} />
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
    );
}

export default App;
