# Order App

## Overview

The Order App is a simple web application that allows users to place orders through an input form. The application captures customer details and order information, stores it in the browser's local storage, and displays the list of orders on a separate page for review.

## Project Structure

```
order-app
├── src
│   ├── index.html          # HTML structure for the order input form
│   ├── orders.html         # Displays the list of submitted orders
│   ├── css
│   │   └── styles.css      # CSS styles for the application
│   └── js
│       ├── main.js         # JavaScript for handling form submissions
│       └── orders.js       # JavaScript for displaying orders
└── README.md               # Documentation for the project
```

## Getting Started

To run the Order App, follow these steps:

1. **Clone the Repository**: Download or clone the repository to your local machine.
2. **Open the Project**: Navigate to the `order-app/src` directory.
3. **Open `index.html`**: Use a web browser to open the `index.html` file.
4. **Place an Order**: Fill out the form with customer name and order details, then click the submit button.
5. **View Orders**: After submitting an order, navigate to `orders.html` to see the list of all submitted orders.

## Features

- User-friendly input form for placing orders.
- Orders are stored in local storage for persistence.

## Notes

- Ensure that your browser supports local storage for the application to function correctly.
- Use http-server to use on Firefox.
