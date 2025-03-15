import React, { useEffect, useState } from 'react';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
              } catch (error) {
                console.error('Error fetching orders:', error);
              }
        };
        
        fetchOrders();
    }, []);
    
    
    return (
        <div>
            <h1>Submitted Orders</h1>
            <ul>
                { orders.length === 0  ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order, index) => (
                        <li key={index}>
                            Order {index + 1}: {order.customerName} - {order.bagel} - {order.spread} - {order.cheese} - {order.eggs} - {order.orderDetails} - {order.timestamp}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default OrderList;