import React, { useState } from 'react';

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [orderDetails, setOrderDetails] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validateInputs(customerName, orderDetails)) {
            const order = {
                name: customerName,
                details: orderDetails,
                date: new Date().toLocaleDateString()
            };

            saveOrderToLocalStorage(order);
            
            setCustomerName('');
            setOrderDetails('');

            // clear order form once submitted

            alert('Order submitted successfully!');
        } else {
            alert('Please fill in all fields.');
        }
    };

    const validateInputs = (name, details) => {
        return name.trim() !== '' && details.trim() !== '';
    };

    const saveOrderToLocalStorage = (order) => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
            </div>
            <div>
                <label>Order Details</label>
                <textarea value={orderDetails} onChange={(e) => setOrderDetails(e.target.value)}/>
            </div>

            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;