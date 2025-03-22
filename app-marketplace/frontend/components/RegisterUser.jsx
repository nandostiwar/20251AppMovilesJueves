import { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault(); // Evita el envío automático del formulario

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                correo,  // ✅ Usa el valor de useState
                password, 
                role: 'user' // ✅ Asegura que 'role' se envíe correctamente
            });

            alert("Usuario registrado. Ahora inicie sesión.");
            window.location.href = '/';
        } catch (err) {
            console.error("Error en la solicitud:", err.response?.data || err);
            alert(err.response?.data?.message || "Error en el registro.");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="title">Registro de Usuario</h2>
                <form onSubmit={handleRegister}> {/* ✅ Usa un formulario */}
                    <input 
                        type="email" 
                        placeholder="Correo" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                        className="input"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        className="input"
                        required
                    />
                    <button type="submit" className="button button-green">Registrarse</button> {/* ✅ Usa type="submit" */}
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
