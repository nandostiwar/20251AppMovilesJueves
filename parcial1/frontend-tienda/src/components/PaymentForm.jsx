import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        product: '',
        amount: '',
        name: '',
        id: '',
        phone: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

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
            alert('Invalid payment information');
            return;
        }

        try {
            await axios.post('/api/create-order', {
                userId: 'user-id-here', // Replace with actual user ID
                product: formData.product,
                amount: formData.amount
            });
            alert('Payment successful');
        } catch (error) {
            alert('Payment failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.container}>
            <h1>Payment Form</h1>
            <input
                type="text"
                name="product"
                placeholder="Product"
                value={formData.product}
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="text"
                name="id"
                placeholder="ID"
                value={formData.id}
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
            />
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