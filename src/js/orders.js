function displayOrders() {
    const ordersList = document.getElementById('order-list');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    console.log(orders);

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders found.</p>';
        return;
    }

    orders.forEach((order, index) => {
        const orderItem = document.createElement('li');
        orderItem.textContent = `Order ${index + 1}: ${order.name} - ${order.details}`;
        ordersList.appendChild(orderItem);
    });
}

document.addEventListener('DOMContentLoaded', displayOrders);