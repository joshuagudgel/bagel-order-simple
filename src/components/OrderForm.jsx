import React, { useState } from 'react';

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [eggs, setEggs] = useState('');
    const [cheese, setCheese] = useState('');
    const [bagel, setBagel] = useState('');
    const [spread, setSpread] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const order = {
            customerName,
            timestamp: new Date().toISOString(),
            eggs,
            cheese,
            bagel,
            spread,
            orderNotes
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
            setEggs('');
            setCheese('');
            setBagel('');
            setSpread('');
            setOrderNotes('');
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
                <label>Bagel</label>
                <select
                    id="bagel"
                    value={bagel}
                    onChange={(e) => setBagel(e.target.value)}
                >
                    <option value="plain">Plain</option>
                    <option value="everything">Everything</option>
                    <option value="cinnamon raisin">Cinnamon Raisin</option>
                    <option value="blueberry">Blueberry</option>
                    <option value="sesame">Sesame</option>
                    <option value="onion">Onion</option>
                    <option value="pumpernickel">Pumpernickel</option>
                </select>
            </div>
            <div>
                <label>Eggs</label>
                <select 
                    id="eggs"
                    value={eggs} 
                    onChange={(e) => setEggs(e.target.value)}
                >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div>
                <label>Cheese</label>
                <select
                    id="cheese"
                    value={cheese}
                    onChange={(e) => setCheese(e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="cheddar">Cheddar</option>
                    <option value="american">American</option>
                    <option value="swiss">Swiss</option>
                    <option value="pepperjack">Pepperjack</option>
                </select>
            </div>
            <div>
                <label>Spread</label>
                <select
                    id="spread"
                    value={spread}
                    onChange={(e) => setSpread(e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="butter">Butter</option>
                    <option value="cream cheese">Cream Cheese</option>
                    <option value="veggie cream cheese">Veggie Cream</option>
                    <option value="lox spread">Lox Spread</option>
                    <option value="peanut butter">Peanut Butter</option>
                    <option value="jelly">Jelly</option>
                    <option value="hummus">Hummus</option>
                    <option value="nutella">Nutella</option>
                    <option value="avocado">Avocado</option>
                </select>
            </div>
            <div>
                <label>Notes</label>
                <input 
                    id="orderNotes"
                    type="text" 
                    value={orderNotes} 
                    onChange={(e) => setOrderNotes(e.target.value)}
                />
            </div>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;