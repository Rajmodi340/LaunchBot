# AI Builder - Frontend

This is the frontend interface for the AI Builder project, built with modern web technologies to provide a rich, interactive user experience. It features an integrated code editor and dynamic UI components.

## Key Concepts and Technologies Used

### Core Technologies
- **React** (`react`, `react-dom`): Version 19 of the popular JavaScript library for building user interfaces.
- **Vite** (`vite`): Next-generation frontend tooling providing rapid server start and ultra-fast hot module replacement (HMR).
- **ES Modules**: Utilizes ES6 modules natively in the browser.

### State Management & Routing
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`): The official, opinionated, batteries-included toolset for efficient Redux development. Used for global state management.
- **React Router** (`react-router-dom`): Standard library for routing in React, enabling navigation across various views.

### Styling and UI
- **Tailwind CSS v4** (`tailwindcss`, `@tailwindcss/vite`): A utility-first CSS framework for rapidly building custom UI designs inline.
- **Lucide React** (`lucide-react`): A beautiful, consistent icon toolkit for modern UI design.
- **Motion** (`motion`): Powerful animation library to create smooth, dynamic UI transitions and micro-interactions.

### Code Editor Integration
- **Monaco Editor** (`@monaco-editor/react`, `monaco-editor`): The code editor that powers VS Code, integrated seamlessly into the React application for a full-featured code editing experience.

### Backend-as-a-Service (BaaS) & API
- **Firebase** (`firebase`): Integrated for backend services, such as authentication, real-time databases, or hosting, supplementing the custom Express backend.
- **Axios** (`axios`): Promise-based HTTP client for the browser to communicate with backend APIs.

### Code Quality & Formatting
- **Prettier** (`prettier`): Opinionated code formatter to ensure consistent code style.
- **JS Beautify** (`js-beautify`): Used to format and beautify JavaScript, HTML, and CSS source code.
- **ESLint**: Linter setup configured for catching errors and enforcing patterns via plugins for React hooks and Fast Refresh.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in a `.env` file for Firebase and backend API URLs.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```







# AI Builder - Backend

This is the backend service for the AI Builder project. It is built using Node.js and Express, and provides the necessary API endpoints and services to support the frontend application.

## Key Concepts and Technologies Used

### Core Technologies
- **Node.js**: JavaScript runtime environment for executing the backend code.
- **Express.js** (`express`): Fast, unopinionated, minimalist web framework for building the RESTful API.
- **ES Modules**: Utilizes modern ES6 `import`/`export` syntax (`"type": "module"` in `package.json`).

### Database and Data Modeling
- **MongoDB**: NoSQL database used for storing application data.
- **Mongoose** (`mongoose`): Elegant MongoDB object modeling for Node.js, providing schema validation, querying, and business logic hooks.

### Authentication and Security
- **JSON Web Tokens (JWT)** (`jsonwebtoken`): Used for secure authentication and authorization of API requests.
- **CORS** (`cors`): Middleware to enable Cross-Origin Resource Sharing, allowing the frontend to securely communicate with the backend.
- **Cookie Parser** (`cookie-parser`): Middleware to parse `Cookie` header and populate `req.cookies` with an object keyed by the cookie names.

### Integrations
- **Stripe** (`stripe`): Payment processing infrastructure integrated for handle billing and transactions.

### Architecture & Patterns
- **MVC Architecture**: The codebase follows a standard Model-View-Controller-like structure with:
  - **Routes**: Defining API endpoints.
  - **Controllers**: Handling the business logic for specific endpoints.
  - **Models**: Defining data schemas with Mongoose.
  - **Middleware**: Intercepting requests for authentication and other checks.
  - **Utils/Config**: Utility functions and configuration settings (e.g., OpenRouter integration logic).

### Environment Management
- **Dotenv** (`dotenv`): Loads environment variables from a `.env` file into `process.env`.
- **Nodemon** (`nodemon`): Development dependency used to automatically restart the node application when file changes in the directory are detected.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env` (e.g., MongoDB URI, Secret Keys, Stripe keys, OpenRouter keys).
3. Start the development server:
   ```bash
   npm run dev
   ```
