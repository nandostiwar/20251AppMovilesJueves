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

    const handleUpdateOrder = async (orderId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/update-order/${orderId}`, { status });
            alert('Order updated successfully');
            fetchOrders(); // Refresh orders list
        } catch (error) {
            alert('Failed to update order');
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order._id}>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.userId?.email || 'Unknown User'}</td>
                                <td>{order.product}</td>
                                <td>${order.amount}</td>
                                <td style={{ color: order.status === 'Pending' ? 'orange' : 'green' }}>
                                    {order.status}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateOrder(order._id, 'Approved')}
                                        style={styles.button}
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No orders found</td>
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
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
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

export default AdminDashboard;