import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import RegisterAdmin from './components/RegisterAdmin';
import RegisterUser from './components/RegisterUser';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import PaymentForm from './components/PaymentForm';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register-admin" element={<RegisterAdmin />} />
                    <Route path="/register-user" element={<RegisterUser />} />
                    <Route path="/user-dashboard" element={<UserDashboardWrapper />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/payment-form" element={<PaymentForm />} />
                </Routes>
            </div>
        </Router>
    );
}

// Wrapper para pasar el userId al UserDashboard
const UserDashboardWrapper = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId'); // Obtener el userId de los parámetros de la URL

    return <UserDashboard userId={userId} />;
};

export default App;