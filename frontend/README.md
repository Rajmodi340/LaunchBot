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
