import React, { useState } from 'react';

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [orderDetails, setOrderDetails] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const order = {
            customerName,
            orderDetails,
            timestamp: new Date().toISOString()
        };

        console.log(order);

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(order),
            });
            
            if(!response.ok){
                throw new Error('Failed to submit order');
            }

            setCustomerName('');
            setOrderDetails('');
            alert('Order submitted successfully!');
        } catch(error){
            alert("Error submitting order");
        }
    };

    const validateInputs = (name, details) => {
        return name.trim() !== '' && details.trim() !== '';
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input 
                    id="customerName"
                    type="text" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)}
                />
            </div>
            <div>
                <label>Order Details</label>
                <textarea 
                    id="orderDetails"
                    value={orderDetails} 
                    onChange={(e) => setOrderDetails(e.target.value)}
                />
            </div>

            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;