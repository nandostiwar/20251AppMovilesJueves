import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminRegister from './pages/AdminRegister';
import UserRegister from './pages/UserRegister';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentForm from './pages/PaymentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
