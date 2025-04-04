import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import RegisterAdmin from './components/RegisterAdmin';
import RegisterUser from './components/RegisterUser';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import PaymentForm from './components/PaymentForm';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/register-user" element={<RegisterUser />} />

        {/* Rutas protegidas */}
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payment-form" 
          element={
            <ProtectedRoute>
              <PaymentForm />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;