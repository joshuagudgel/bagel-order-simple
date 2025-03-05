// main.js

document.addEventListener("DOMContentLoaded", function() {
    const orderForm = document.getElementById("orderForm");
    
    orderForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const customerName = document.getElementById("customerName").value;
        const orderDetails = document.getElementById("orderDetails").value;

        if (validateInputs(customerName, orderDetails)) {
            const order = {
                name: customerName,
                details: orderDetails,
                date: new Date().toLocaleString()
            };

            saveOrderToLocalStorage(order);
            orderForm.reset();
            alert("Order submitted successfully!");
        } else {
            alert("Please fill in all fields.");
        }
    });
});

function validateInputs(name, details) {
    return name.trim() !== "" && details.trim() !== "";
}

function saveOrderToLocalStorage(order) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}