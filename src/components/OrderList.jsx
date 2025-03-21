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
    
    const markAsCompleted = async (orderId) => {
        console.log("Complete button clicked for orderId:", orderId); // Debugging
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isComplete: true }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
    
            const updatedOrder = await response.json();
            
            // Update the local state with the updated order
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderId === updatedOrder.orderId ? updatedOrder : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    
    const submittedOrders = orders.filter(order => !order.isComplete);
    const completedOrders = orders.filter(order => order.isComplete);
    
    return (
        <div>
            <h1>Submitted Orders</h1>
            <ul>
                { submittedOrders.length === 0  ? (
                    <p>No orders found.</p>
                ) : (
                    submittedOrders.map((order) => (
                        <li key={order.orderId}>
                            <div>Order ID - {order.orderId}</div>
                            <div>Name - {order.customerName}</div>
                            <div>Bagel - {order.bagel}</div>
                            <div>Spread - {order.spread}</div>
                            <div>Cheese - {order.cheese}</div>
                            <div>Eggs - {order.eggs}</div>
                            <div>Time - {order.timestamp}</div>
                            <div>Additional Notes - {order.orderNotes}</div>
                            <button onClick={() => markAsCompleted(order.orderId)}>Complete</button>
                        </li>
                    ))
                )}
            </ul>

            
            <h1>Completed Orders</h1>
            <ul>
                {completedOrders.length === 0 ? (
                    <p>No completed orders found.</p>
                ) : (
                    completedOrders.map((order) => (
                        <li key={order.orderId}>
                            <div>Order ID - {order.orderId}</div>
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