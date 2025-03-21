import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RegisterAdmin from './components/RegisterAdmin';
import RegisterUser from './components/RegisterUser';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register-admin" element={<RegisterAdmin />} />
                    <Route path="/register-user" element={<RegisterUser />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
