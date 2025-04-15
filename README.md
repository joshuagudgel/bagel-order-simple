# Bagel Order Application

A full-stack application for ordering and managing bagel orders with role-based access control.

## Project Overview

This application provides a streamlined bagel ordering system with different user roles:

- **Customer users** can access the order form to submit bagel orders
- **Staff users** can access the order queue to view and complete orders
- **Dev users** have full access to both areas of the application

### Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, JWT authentication
- **Backend**: Express, MongoDB, JWT for secure API access
- **Architecture**: RESTful API with role-based access control

## Project File Tree

```text
📦 bagel-order-simple
┣ 📂 backend
┃ ┣ 📂 controllers
┃ ┃ ┣ 📄 authController.js  # User authentication logic
┃ ┃ ┗ 📄 orderController.js  # Order management endpoints
┃ ┣ 📂 middleware
┃ ┃ ┗ 📄 auth.js             # JWT authentication middleware
┃ ┣ 📂 models
┃ ┃ ┣ 📄 Order.js            # Order MongoDB schema
┃ ┃ ┗ 📄 User.js             # User MongoDB schema
┃ ┣ 📄 index.js              # Express server setup
┃ ┗ 📄 package.json          # Backend dependencies
┃
┣ 📂 frontend
┃ ┣ 📂 public
┃ ┃ ┗ 📄 vite.svg            # Vite logo
┃ ┣ 📂 src
┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┣ 📄 Login.jsx         # Authentication UI
┃ ┃ ┃ ┣ 📄 Navbar.jsx        # Navigation component
┃ ┃ ┃ ┣ 📄 OrderForm.jsx     # Customer order submission form
┃ ┃ ┃ ┣ 📄 OrderList.jsx     # Staff order management dashboard
┃ ┃ ┃ ┗ 📄 ProtectedRoute.jsx # Role-based route protection
┃ ┃ ┣ 📂 context
┃ ┃ ┃ ┗ 📄 AuthContext.jsx   # Authentication state management
┃ ┃ ┣ 📄 App.css             # Application styles
┃ ┃ ┣ 📄 App.jsx             # Main React component
┃ ┃ ┣ 📄 index.css           # Global styles with Tailwind directives
┃ ┃ ┗ 📄 main.jsx            # React entry point
┃ ┣ 📄 eslint.config.js       # ESLint configuration
┃ ┣ 📄 index.html             # HTML entry point
┃ ┣ 📄 package.json           # Frontend dependencies
┃ ┗ 📄 vite.config.js         # Vite build configuration
┃
┣ 📄 .gitignore               # Git ignore patterns
┗ 📄 README.md                # Project documentation
```

Access the application at https://bagel-order-simple.onrender.com

Render's free instance will spin down with inactivity, which can delay requests by 50 seconds or more.
The page is responsive once you are signed in.

Registration

Register an account before logging in.
The app supports three user roles:

- Customer: Can place bagel orders
- Staff: Can view and manage the order queue
- Dev: Has access to all features

Render Deployment

Create two services on Render:

- Web Service for the backend
- Static Site for the frontend

Configure build commands, start command for the backend, environment variables for MongoDB connection and JWT secret
