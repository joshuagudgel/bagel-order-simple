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
┃ ┣ 📄 .env.development       # Development environment variables
┃ ┣ 📄 .env.production        # Production environment variables
┃ ┣ 📄 eslint.config.js       # ESLint configuration
┃ ┣ 📄 index.html             # HTML entry point
┃ ┣ 📄 package.json           # Frontend dependencies
┃ ┗ 📄 vite.config.js         # Vite build configuration
┃
┣ 📄 .gitignore               # Git ignore patterns
┗ 📄 README.md                # Project documentation
```

## Development Setup

### Prerequisites

- npm 10.9.2
- node 22.14.0
- vite 6.2.1
- MongoDB 8.0.5

### Installation

# Clone the repository

git clone https://github.com/joshuagudgel/bagel-order-simple.git
cd bagel-order-simple

# Install frontend dependencies

cd frontend
npm install

# Install backend dependencies

cd backend
npm install

Getting Started

1. Start the backend:
   cd backend
   node index.js

2. Start the frontend:
   cd frontend
   npm run dev

3. Access the application at http://localhost:5173

User Authentication
Registration
You must register an account before logging in. The app supports three user roles:

Customer: Can place bagel orders
Staff: Can view and manage the order queue
Dev: Has access to all features
No default users exist - you must register a new account through the app.

Deployment
Render Deployment
Create two services on Render:
A Web Service for the backend
A Static Site for the frontend
Connect your GitHub repository
Set appropriate build commands:
Backend: npm install
Frontend: npm install && npm run build
Configure environment variables for MongoDB connection and JWT secret
