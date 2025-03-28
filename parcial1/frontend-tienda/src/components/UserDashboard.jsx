import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ userId }) => {
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

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

    const handleUpdateOrder = async (orderId) => {
        try {
            await axios.put(`http://localhost:5000/api/update-order/${orderId}`, { status: 'Completed' });
            alert('Order updated successfully');
            fetchOrders(); // Refresh orders list
        } catch (error) {
            alert('Failed to update order');
        }
    };

    const handlePay = () => {
        if (!product || !amount) {
            alert('Please enter a product and amount before paying.');
            return;
        }
        navigate(`/payment-form?product=${product}&amount=${amount}`);
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
            <button onClick={handlePay} style={styles.button}>Pay</button>

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
                                <td>{order.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateOrder(order._id)}
                                        style={styles.button}
                                    >
                                        Update
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