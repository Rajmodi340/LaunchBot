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
