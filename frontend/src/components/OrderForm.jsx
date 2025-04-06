import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderForm = () => {
    const { authFetch } = useAuth();
    const [customerName, setCustomerName] = useState('');
    const [eggs, setEggs] = useState(0);
    const [cheese, setCheese] = useState('none');
    const [bagel, setBagel] = useState('plain');
    const [spread, setSpread] = useState('none');
    const [orderNotes, setOrderNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        
        const order = {
            customerName,
            timestamp: new Date().toISOString(),
            eggs,
            cheese,
            bagel,
            spread,
            orderNotes
        };
        
        try {
            const response = await authFetch('/api/orders', {
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
            setEggs(0);
            setCheese('none');
            setBagel('plain');
            setSpread('none');
            setOrderNotes('');
            alert('Order submitted successfully!');
        } catch(error){
            alert("Error submitting order");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Bagel Order</h2>    
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mb-4">
                    <label className="block text-gray-700 font-bold mb-2 md:mb-0 md:text-right">
                        Name
                    </label>
                    <input 
                        id="customerName"
                        type="text" 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400"
                        required
                        disabled={submitting}
                    />
                    <label className="block text-gray-700 font-bold mb-2 md:mb-0 md:text-right">
                        Bagel
                    </label>
                    <select
                        id="bagel"
                        value={bagel}
                        onChange={(e) => setBagel(e.target.value)}
                        className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        disabled={submitting}
                    >
                        <option value="plain">Plain</option>
                        <option value="everything">Everything</option>
                        <option value="cinnamon raisin">Cinnamon Raisin</option>
                        <option value="blueberry">Blueberry</option>
                        <option value="sesame">Sesame</option>
                        <option value="onion">Onion</option>
                        <option value="pumpernickel">Pumpernickel</option>
                    </select>
                
                    <label className="block text-gray-700 font-bold mb-2 md:mb-0 md:text-right">
                        Eggs
                    </label>
                    <select 
                        id="eggs"
                        value={eggs} 
                        onChange={(e) => setEggs(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        disabled={submitting}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                
                    <label className="block text-gray-700 font-bold mb-2 md:mb-0 md:text-right">
                        Cheese
                    </label>
                    <select
                        id="cheese"
                        value={cheese}
                        onChange={(e) => setCheese(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        disabled={submitting}
                    >
                        <option value="none">None</option>
                        <option value="cheddar">Cheddar</option>
                        <option value="american">American</option>
                        <option value="swiss">Swiss</option>
                        <option value="pepperjack">Pepperjack</option>
                    </select>
                
                    <label className="block text-gray-700 font-bold mb-2 md:mb-0 md:text-right">
                        Spread
                    </label>
                    <select
                        id="spread"
                        value={spread}
                        onChange={(e) => setSpread(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        disabled={submitting}
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
                
                    <label className="block text-gray-700 font-bold mb-2 md:mb-0 md:text-right">
                        Notes
                    </label>
                    <input 
                        id="orderNotes"
                        type="text" 
                        value={orderNotes} 
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Special instructions (optional)"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400"
                        disabled={submitting}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="submit" 
                        className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                            submitting 
                              ? 'bg-blue-300 cursor-not-allowed' 
                              : 'bg-blue-500 hover:bg-blue-700 text-white'
                          }`}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <div className="flex items-center">
                                <div className="w-5 h-5 border-4 border-blue-600 border-t-blue-100 rounded-full animate-spin mr-2"></div>
                                <span>Submitting...</span>
                            </div>
                        ) : (
                            'Submit Order'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;