import React, { useEffect, useState } from 'react';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);
    }, []);
    
    
    return (
        <div>
            <h1>Order List</h1>
            <ul>
                { orders.length === 0  ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order, index) => (
                        <li key={index}>
                            Order {index + 1}: {order.name} - {order.details} - {order.date}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default OrderList;