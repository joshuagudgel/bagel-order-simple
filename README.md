Development Setup
Install the following tools
npm 10.9.2
node 22.14.0
vite 6.2.1
MongoDB 8.0.5
Pull code
cd frontend
npm install
cd backend
npm install

Run Project
1. Start the backend
cd backend
node index.js
2. Start the frontend
cd frontend
npm run dev

Project File Tree
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