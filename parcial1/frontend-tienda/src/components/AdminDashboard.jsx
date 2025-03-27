import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/all-orders');
            setOrders(response.data);
        } catch (error) {
            alert('Failed to fetch orders');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Admin Dashboard</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.userId.email}</td>
                            <td>{order.product}</td>
                            <td>${order.amount}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
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
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    }
};

export default AdminDashboard;