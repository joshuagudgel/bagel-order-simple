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
                            <div>Order {index + 1}:</div> 
                            <div>Name - {order.customerName}</div>
                            <div>Bagel - {order.bagel}</div>
                            <div>Spread - {order.spread}</div>
                            <div>Cheese - {order.cheese}</div>
                            <div>Eggs - {order.eggs}</div>
                            <div>Time - {order.timestamp}</div>
                            <div>Additional Notes - {order.orderNotes}</div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default OrderList;