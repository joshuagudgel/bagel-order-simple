import React, { useState } from 'react';

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [orderDetails, setOrderDetails] = useState('');
    const [eggs, setEggs] = useState('');
    const [cheese, setCheese] = useState('');
    const [bagel, setBagel] = useState('');
    const [spread, setSpread] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const order = {
            customerName,
            orderDetails,
            timestamp: new Date().toISOString(),
            eggs,
            cheese,
            bagel,
            spread
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
            setEggs('');
            setCheese('');
            setBagel('');
            setSpread('');
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
            <div>
                <label>Eggs</label>
                <textarea 
                    id="eggs"
                    value={eggs} 
                    onChange={(e) => setEggs(e.target.value)}
                />
            </div>
            <div>
                <label>Cheese</label>
                <textarea 
                    id="cheese"
                    value={cheese} 
                    onChange={(e) => setCheese(e.target.value)}
                />
            </div>
            <div>
                <label>Bagel</label>
                <textarea 
                    id="bagel"
                    value={bagel} 
                    onChange={(e) => setBagel(e.target.value)}
                />
            </div>
            <div>
                <label>Spread</label>
                <textarea 
                    id="spread"
                    value={spread} 
                    onChange={(e) => setSpread(e.target.value)}
                />
            </div>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;