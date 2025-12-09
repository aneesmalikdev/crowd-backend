# Task Management Backend

## 🚀 Getting Started

Follow these steps to run the project locally:

### Step 1: Clone the Repository

```bash
git clone https://github.com/aneesmalikdev/crowd-backend.git
cd crowd-backend
```

### Step 2: Setup Environment Variables

```bash
cp .env.example .env
```

### Step 3: add `MONGO_URI` to `.env`

### Step 4: Switch to Node.js LTS Version

```bash
nvm use
# This will switch to Node.js 24.11.1 as specified in .nvmrc
```

### Step 5: Install Dependencies

```bash
npm install
```

### Step 5: Run the Application

**For Production:**

```bash
npm run build
npm start
```

The server will be live at **http://localhost:5000**

**For Development:**

```bash
npm run dev
```

The app will be live at **http://localhost:5000**

---

## ✨ Features

- 🔐 **JWT Authentication** – Secure login and protected routes using access tokens
- 🛡️ **Role-Based Authorization** – Admin and user permissions enforced at route level
- 🧩 **Zod Validation** – Request body validation with detailed, field-specific error messages
- 📦 **DTO Architecture** – Strict Create/Request/Response DTOs for clean API structure
- 🗃️ **Mongoose Discriminators** – Platform-specific task schemas (Reddit, YouTube, Trustpilot) in a single collection
- 🕒 **Auto Publish Timestamp** – publishedAt automatically handled via Mongoose hooks
- 📊 **Analytics Endpoints** – Aggregated stats per platform (task counts, revenue, published metrics)
- ♻️ **Clean Services & Repositories** – Fully modular, testable business logic
- 🧱 **Middleware Layer** – Error handler, validator, auth middleware, role guards
- 📘 **TypeScript First** – Strict typing for entities, DTOs, responses, and services
- ⚡ **Fast Development** – Organized folder structure for quick scaling and maintainability

## 📋 Prerequisites

- Node.js 24.11.1 (LTS)
- npm
- MoongoDB connection string

## 📦 Tech Stack

- **Runtime:** Node.js 24
- **Framework:** Express
- **Database:** MongoDB + Mongoose
- **Language:** TypeScript
- **Validation:** Zod
- **Authentication:** JWT (access + refresh)
- **Architecture:** Service → Repository → Controller
- **Utilities:** bcrypt, dotenv
