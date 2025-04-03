import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId'); // Obtener el ID del pedido
    const userId = searchParams.get('userId'); // Obtener el ID del usuario
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar tarjeta
        if (
            formData.cardNumber !== '9946685421144000' ||
            formData.expirationDate !== '06/28' ||
            formData.cvv !== '986'
        ) {
            alert('Payment failed: Invalid payment information.');
            return;
        }

        try {
            // Actualizar el estado del pedido a "Approved"
            await axios.put(`http://localhost:5000/api/update-order/${orderId}`, { status: 'Approved' });

            // Si todo está bien, mostrar mensaje de éxito
            alert('Payment successful. Order approved.');
            navigate(`/user-dashboard?userId=${userId}`); // Redirigir al dashboard del usuario con el userId
        } catch (error) {
            // Mostrar mensajes de error específicos
            if (error.response) {
                alert(`Payment failed: ${error.response.data.error}`);
            } else {
                alert('Payment failed: Unable to connect to the server.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.container}>
            <h1>Payment Form</h1>
            <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="text"
                name="expirationDate"
                placeholder="Expiration Date (MM/YY)"
                value={formData.expirationDate}
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Pay</button>
        </form>
    );
};

const styles = {
    container: {
        padding: '20px',
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
    }
};

export default PaymentForm;