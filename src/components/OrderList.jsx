import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const { authFetch } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await authFetch('http://localhost:5000/api/orders');
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
    }, [authFetch]);
    
    const markAsCompleted = async (orderNum) => {
        try {
            const response = await authFetch(`http://localhost:5000/api/orders/${orderNum}`, {
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
                    order.orderNum === updatedOrder.orderNum ? updatedOrder : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    
    const submittedOrders = orders.filter(order => !order.isComplete);
    const completedOrders = orders.filter(order => order.isComplete);
    
    return (
        
        <div className="flex flex-col items-center p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Queue</h1>
            
            {/* Submitted Orders Section */}
            <div className="w-full mb-8">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 border-b pb-2">Submitted Orders</h2>
                {submittedOrders.length === 0 ? (
                    <p className="text-center text-gray-500 italic">No pending orders found.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {submittedOrders.map((order) => (
                            <div key={order.orderNum} className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg">Order #{order.orderNum}</h3>
                                    <span className="text-sm text-gray-500">{new Date(order.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="text-gray-700"><span className="font-medium">Customer:</span> {order.customerName}</div>
                                    <div className="text-gray-700"><span className="font-medium">Bagel:</span> {order.bagel}</div>
                                    <div className="text-gray-700"><span className="font-medium">Spread:</span> {order.spread}</div>
                                    <div className="text-gray-700"><span className="font-medium">Cheese:</span> {order.cheese}</div>
                                    <div className="text-gray-700"><span className="font-medium">Eggs:</span> {order.eggs}</div>
                                    {order.orderNotes && (
                                        <div className="col-span-2 text-gray-700">
                                            <span className="font-medium">Notes:</span> {order.orderNotes}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <button 
                                        onClick={() => markAsCompleted(order.orderNum)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                                    >
                                        Complete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Completed Orders Section */}
            <div className="w-full">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 border-b pb-2">Completed Orders</h2>
                {completedOrders.length === 0 ? (
                    <p className="text-center text-gray-500 italic">No completed orders found.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {completedOrders.map((order) => (
                            <div key={order.orderNum} className="border rounded-lg shadow-sm p-4 bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg">Order #{order.orderNum}</h3>
                                    <span className="text-sm text-gray-500">{new Date(order.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="text-gray-700"><span className="font-medium">Customer:</span> {order.customerName}</div>
                                    <div className="text-gray-700"><span className="font-medium">Bagel:</span> {order.bagel}</div>
                                    <div className="text-gray-700"><span className="font-medium">Spread:</span> {order.spread}</div>
                                    <div className="text-gray-700"><span className="font-medium">Cheese:</span> {order.cheese}</div>
                                    <div className="text-gray-700"><span className="font-medium">Eggs:</span> {order.eggs}</div>
                                    {order.orderNotes && (
                                        <div className="col-span-2 text-gray-700">
                                            <span className="font-medium">Notes:</span> {order.orderNotes}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <span className="inline-block bg-gray-200 text-gray-700 text-sm font-medium py-1 px-3 rounded-full">
                                        Completed
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;