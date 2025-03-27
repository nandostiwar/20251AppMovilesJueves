import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Estado para el rol
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
                role
            });

            // Redirigir según el rol
            if (response.data.role === 'admin') {
                navigate('/admin-dashboard'); // Redirigir al dashboard del admin
            } else if (response.data.role === 'user') {
                const userId = response.data.userId; // Asegúrate de devolver el userId desde el backend
                navigate(`/user-dashboard?userId=${userId}`); // Pasar el userId como parámetro
            }
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleLogin} style={styles.button}>Login</button>

            <h2>Select Role:</h2>
            <div style={styles.buttonsContainer}>
                <button
                    onClick={() => setRole('admin')}
                    style={{
                        ...styles.button,
                        backgroundColor: role === 'admin' ? '#28a745' : '#007bff'
                    }}
                >
                    Admin
                </button>
                <button
                    onClick={() => setRole('user')}
                    style={{
                        ...styles.button,
                        backgroundColor: role === 'user' ? '#28a745' : '#007bff'
                    }}
                >
                    User
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0'
    },
    input: {
        width: '300px',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer'
    },
    buttonsContainer: {
        display: 'flex',
        gap: '10px'
    }
};

export default Login;