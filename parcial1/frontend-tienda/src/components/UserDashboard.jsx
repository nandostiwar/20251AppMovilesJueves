import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UserDashboard = () => {
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Leer el userId de los parámetros de la URL
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    useEffect(() => {
        if (!userId) {
            alert('User ID is missing. Please log in again.');
            navigate('/');
        } else {
            fetchOrders();
        }
    }, [userId, navigate]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user-orders/${userId}`);
            setOrders(response.data);
        } catch (error) {
            alert('Failed to fetch orders');
        }
    };

    const handleCreateOrder = async () => {
        try {
            await axios.post('http://localhost:5000/api/create-order', { userId, product, amount });
            alert('Order created successfully');
            fetchOrders(); // Refresh orders list
        } catch (error) {
            alert('Failed to create order');
        }
    };

    const handleSaveOrder = async () => {
        try {
            await axios.post('http://localhost:5000/api/create-order', { userId, product, amount, status: 'Pending' });
            alert('Order saved as Pending');
            fetchOrders(); // Refresh orders list
        } catch (error) {
            alert('Failed to save order');
        }
    };

    const handleApproveOrder = (orderId) => {
        navigate(`/payment-form?orderId=${orderId}&userId=${userId}`); // Pasar userId al formulario de pago
    };

    return (
        <div style={styles.container}>
            <h1>User Dashboard</h1>
            <input
                type="text"
                placeholder="Product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                style={styles.input}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSaveOrder} style={styles.button}>Save</button>


            <h2>Order History</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order._id}>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.product}</td>
                                <td>${order.amount}</td>
                                <td style={{ color: order.status === 'Pending' ? 'orange' : 'green' }}>
                                    {order.status}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleApproveOrder(order._id)}
                                        style={styles.button}
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
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
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    }
};

export default UserDashboard;