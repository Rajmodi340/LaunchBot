# 🚀 AI Website Builder SaaS

An AI-powered Website Builder that allows users to generate websites by simply describing their idea. The application uses Generative AI to create website code, displays it in a Monaco Editor, provides a live preview, and assigns a unique preview URL using a slug. The project also includes authentication, a credit-based usage system, and Stripe payment integration.

---

# 📌 Table of Contents

* Project Overview
* Features
* Tech Stack
* System Architecture
* Complete Request Flow
* Authentication Flow
* AI Website Generation Flow
* Code Preview Flow
* Monaco Editor Integration
* Live Website Preview
* Slug-Based Deployment (Preview)
* Database Design
* API Flow
* Folder Structure
* Security
* Future Improvements

---

# 🌟 Project Overview

The goal of this project is to automate website creation using AI.

Instead of manually writing HTML, CSS, or React components, users simply describe the type of website they need.

Example:

> "Create a modern portfolio website for a software engineer."

The backend sends this prompt to an AI model, which generates the website code. The generated code is returned to the frontend, displayed inside Monaco Editor, rendered in a live preview, and stored for future access using a unique slug.

---

# ✨ Features

* 🤖 AI Website Generation
* 📝 Prompt-Based Website Creation
* 💻 Monaco Code Editor
* 👀 Live Website Preview
* 🔗 Unique Slug-Based Preview URL
* 🔐 JWT Authentication
* 💰 Credit-Based Usage
* 💳 Stripe Checkout Integration
* 📁 Project History
* ☁️ Production Ready Architecture

---

# 🛠 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router
* Axios
* Monaco Editor
* Framer Motion

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## AI

* Google Gemini API (or other LLM)

## Payments

* Stripe Checkout
* Stripe Webhooks

---

# 🏗 System Architecture

```text
                        User
                          │
                          ▼
                 React Frontend
                          │
               Axios HTTP Requests
                          │
                          ▼
                Express REST API
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   Authentication     Gemini AI        MongoDB
        │                 │                 │
        └──────────────┬──┴─────────────────┘
                       ▼
              Generated Website Code
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
    Monaco Editor             Live Preview
          │                         │
          └────────────┬────────────┘
                       ▼
             Slug-Based Preview URL
```

---

# 🔄 Complete Application Flow

```text
User

↓

Login/Register

↓

Dashboard

↓

Enter Website Prompt

↓

Frontend sends Prompt

↓

Backend validates request

↓

Credits Checked

↓

AI API Called

↓

Website Code Generated

↓

Code Stored in MongoDB

↓

Unique Slug Generated

↓

Frontend receives Code

↓

Monaco Editor displays Code

↓

Preview renders Website

↓

Unique Preview URL Created
```

---

# 🔐 Authentication Flow

```text
User Login

↓

Backend verifies credentials

↓

JWT Token Generated

↓

Frontend stores Token

↓

Protected APIs use JWT
```

---

# 🤖 AI Website Generation Flow

### Step 1

User enters prompt

Example

```
Create a modern gym landing page.
```

---

### Step 2

Frontend sends request

```
POST /generate
```

Body

```json
{
  "prompt": "Create a modern gym landing page."
}
```

---

### Step 3

Backend receives prompt

The backend does not directly forward the user prompt.

It enriches the prompt with additional instructions.

Example

```
Generate a React website.

Requirements

- Tailwind CSS
- Responsive
- Modern UI
- Hero Section
- Pricing
- Contact Form

Return only code.

Do not include explanations.
```

This process is called **Prompt Engineering**.

---

### Step 4

Gemini generates the website code.

Example

```jsx
export default function App() {
    return (
        <div>
            <h1>Gym Website</h1>
        </div>
    );
}
```

---

### Step 5

Backend receives the generated code.

The response is validated and cleaned before being sent to the frontend.

---

### Step 6

Generated project is stored in MongoDB.

Example

```json
{
    "title":"Gym Website",
    "prompt":"Create a gym landing page",
    "code":"React source code",
    "slug":"gym-website-x82jd"
}
```

---

# 💻 Monaco Editor Flow

Monaco Editor is used only to display and edit the generated code.

Flow

```text
AI Response

↓

Backend

↓

API Response

↓

React State

↓

Monaco Editor value
```

Example

```jsx
<Editor
    language="javascript"
    value={generatedCode}
/>
```

Monaco does not generate or execute code.

It only displays and edits it.

---

# 👀 Live Website Preview

After the code is received from the backend:

1. The frontend stores the generated code.
2. The preview component loads the code.
3. The website is rendered in the browser.

Flow

```text
Generated Code

↓

React State

↓

Preview Component

↓

Browser renders website
```

The preview updates automatically whenever the generated code changes.

---

# 🔗 Slug-Based Preview URL

This project currently provides **preview URLs**, not cloud deployment.

Each generated project receives a unique slug.

Example

```
gym-website-x82jd
```

Preview URL

```
http://localhost:5173/preview/gym-website-x82jd
```

Flow

```text
Project Generated

↓

Unique Slug Created

↓

Saved with Project

↓

React Router

↓

/preview/:slug

↓

Backend fetches project using slug

↓

Frontend renders Website
```

This allows every generated website to have its own shareable preview route while the application is running.

> **Note:** This is different from production deployment. The preview URL is served by the React application and uses routing to load the correct project.

---

# 💰 Credit System

```text
Generate Website

↓

Backend checks credits

↓

Credits Available?

↓

Yes

↓

Generate Website

↓

Reduce Credit

↓

Save Updated Credits
```

Credits are always managed on the backend to prevent client-side manipulation.

---

# 💳 Stripe Payment Flow

```text
User Buys Credits

↓

Stripe Checkout

↓

Payment Success

↓

Stripe Webhook

↓

Backend verifies payment

↓

Credits Updated

↓

MongoDB Updated
```

---

# 🗄 Database Collections

## Users

```json
{
    "_id":"",
    "name":"",
    "email":"",
    "password":"",
    "credits":20
}
```

---

## Projects

```json
{
    "_id":"",
    "userId":"",
    "prompt":"",
    "generatedCode":"",
    "slug":"gym-website-x82jd",
    "createdAt":""
}
```

---

# 📡 API Flow

```text
React

↓

Axios

↓

Express Route

↓

Controller

↓

Service

↓

Gemini API

↓

MongoDB

↓

JSON Response

↓

Frontend
```

---

# 📁 Folder Structure

```text
Frontend
│
├── src
│   ├── components
│   ├── pages
│   ├── routes
│   ├── hooks
│   ├── context
│   ├── services
│   ├── utils
│   └── assets
│
└── package.json


Backend
│
├── controllers
├── routes
├── middleware
├── models
├── services
├── config
├── utils
├── app.js
└── package.json
```

---

# 🔒 Security

* JWT Authentication
* Protected Routes
* Password Hashing
* Environment Variables
* Input Validation
* Credit Validation on Backend
* Secure Stripe Webhooks
* Error Handling

---

# 🚀 Future Improvements

* Actual One-Click Cloud Deployment (Render/Vercel)
* Custom Domain Support
* AI Website Editing
* Version History
* Multiple AI Model Support
* Real-Time Collaboration
* Drag-and-Drop Editor
* CI/CD Integration

---

# 📚 Key Learning Outcomes

* AI Integration using LLM APIs
* Prompt Engineering
* Full Stack Architecture
* REST API Development
* Authentication with JWT
* MongoDB Data Modeling
* Monaco Editor Integration
* Dynamic Preview Rendering
* Slug-Based Routing
* Stripe Payment Integration
* Secure Backend Development

---

# 📌 Important Note

Currently, the project provides a **dynamic preview system** using unique slugs rather than true cloud deployment.

Each generated website is accessible through a route such as:

```
/preview/:slug
```

The frontend uses React Router to read the slug, requests the corresponding project from the backend, retrieves the generated code from MongoDB, and renders the website dynamically in the browser. This architecture allows every generated project to have a persistent preview URL while avoiding the overhead of deploying a new hosting instance for every AI-generated website.




# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-website-builder.git
cd ai-website-builder
```

Replace `your-username` with your GitHub username and the repository name.

---

# 📂 Project Structure

```text
ai-website-builder/
│
├── client/          # React Frontend
├── server/          # Node.js Backend
└── README.md
```

---

# 🚀 Frontend Setup

Navigate to the frontend directory.

```bash
cd client
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000
```

Start the development server.

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

# 🚀 Backend Setup

Open another terminal.

Navigate to the backend.

```bash
cd server
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_webhook_secret

CLIENT_URL=http://localhost:5173
```

Start the backend.

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

# 🗄 MongoDB Setup

You can use:

* MongoDB Atlas (Recommended)
* Local MongoDB Server

Create a database and update the connection string inside the backend `.env` file.

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-builder
```

---

# 🔑 Required API Keys

Before running the project, obtain the following credentials:

| Service               | Required |
| --------------------- | -------- |
| Google Gemini API     | ✅        |
| MongoDB Atlas         | ✅        |
| JWT Secret            | ✅        |
| Stripe Secret Key     | ✅        |
| Stripe Webhook Secret | ✅        |

---

# ▶️ Running the Application

Start both servers.

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

Open your browser.

```
http://localhost:5173
```

---

# 🧪 How to Test

1. Register a new account.
2. Login.
3. Enter a website prompt.
4. Generate the website.
5. Review the generated code in Monaco Editor.
6. Open the live preview.
7. Access the project using its unique preview slug.
8. Purchase credits using Stripe (if configured).

---

# 🛠 Build for Production

### Frontend

```bash
cd client
npm run build
```

### Backend

```bash
cd server
npm start
```

---

# ❗ Common Issues

### Dependencies not installed

```bash
npm install
```

### Environment variables not found

Ensure the `.env` file exists in both the frontend and backend directories and contains all required variables.

### MongoDB connection error

* Verify the MongoDB URI.
* Ensure your IP address is allowed in MongoDB Atlas.
* Confirm the database user credentials are correct.

### Gemini API errors

* Verify the API key.
* Check API quotas and limits.

### Stripe webhook not working

Use the Stripe CLI for local webhook testing:

```bash
stripe listen --forward-to localhost:5000/webhook
```

Update the webhook secret in the backend `.env` file.

---

# 📜 Available Scripts

## Frontend

```bash
npm run dev      # Start development server
npm run build    # Build production assets
npm run preview  # Preview production build
```

## Backend

```bash
npm run dev      # Start development server
npm start        # Start production server
```
