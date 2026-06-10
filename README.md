# 🛒 TinyTreasure — Full‑Stack E‑Commerce Platform

TinyTreasure is a modern, full‑stack e‑commerce application built with a scalable architecture, secure payment integration, and AI‑powered features. The platform supports product browsing, cart management, secure checkout, user reviews, and intelligent search using vector databases.

---

## ✨ Features

### 👥 User Features

- **User Authentication & Authorization** - Secure JWT-based auth
- **Product Browsing** - Advanced filtering and search capabilities
- **Shopping Cart** - Persistent cart management with Redux
- **Secure Checkout** - Integration with Khalti ePayment Gateway
- **Order Tracking** - View order history and real-time status
- **Product Reviews** - Leave and view ratings on products
- **AI Chat Assistant** - RAG-based chatbot (April) for product discovery and support

### 🛠 Admin Features

- **Product Management** - Full CRUD operations for products
- **Order Management** - Status updates and order tracking
- **User Management** - Manage users and permissions
- **Review Analytics** - Aggregate reviews using MongoDB pipelines

---

## 🧠 AI & Search Capabilities

- **Retrieval‑Augmented Generation (RAG)** for intelligent responses
- **Vector Database** for semantic search
- **AI Chat Interface** - Powered by Gemini API & Groq
- Contextual product retrieval and support

---

## 🧱 Tech Stack

### Frontend

- **React 19** - UI framework
- **Redux Toolkit** - Global state management
- **TanStack React Query** - Server state & caching
- **React Router** - Client-side routing
- **React Hook Form** - Form state management
- **Tailwind CSS** - Utility-first styling
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **Vite** - Build tool

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication & authorization
- **Cloudinary** - Image storage & management
- **Nodemailer** - Email service
- **Multer + Sharp** - Image processing & upload
- **Groq & Google Genai** - AI model integration

### Payment Integration

- **Khalti ePayment Gateway**
  - Secure payment processing
  - Payment verification
  - Real-time transaction updates

### DevOps & Tools

- **Docker** - Container orchestration
- **Docker Compose** - Multi-container setup
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Setup Guide](https://docs.mongodb.com/manual/installation/)
- **Docker & Docker Compose** (optional) - [Installation Guide](https://docs.docker.com/compose/install/)
- **Git** - Version control

---

## 🚀 Getting Started

### Option 1: Local Setup (Without Docker)

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Projects
```

#### 2. Backend Setup

Navigate to the Backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

**Create `config.env` file in the Backend directory:**

Create a new file `Backend/config.env` with the following structure:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
DATABASE=mongodb+srv://your-username:your-password@cluster.mongodb.net/database-name?retryWrites=true&w=majority&appName=ClusterName
DATABASE_PASSWORD=your-mongodb-password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=120d
JWT_COOKIE_EXPIRES_IN=90

# Email Configuration (Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-specific-password

# Cloudinary Configuration (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Khalti Payment Gateway (ePayment)
KHALTI_LIVE_SECRET_KEY=your-khalti-secret-key
KHALTI_LIVE_PUBLIC_KEY=your-khalti-public-key
KHALTI_RETURN_URL=http://localhost:5173/payment-success

# Website URLs
WEBSITE_URL=http://localhost:5173

# AI APIs
GEMINI_API_KEY=your-google-gemini-api-key
GROQ_API_KEY=your-groq-api-key
```

**Environment Variables Explanation:**

| Variable           | Purpose                          | How to Get                                                                |
| ------------------ | -------------------------------- | ------------------------------------------------------------------------- |
| **PORT**           | Backend server port              | Default: 3000                                                             |
| **NODE_ENV**       | Environment mode                 | development / production                                                  |
| **DATABASE**       | MongoDB connection string        | Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)    |
| **JWT_SECRET**     | Secret key for JWT tokens        | Generate a random string (32+ chars)                                      |
| **JWT_EXPIRES_IN** | Token expiration time            | e.g., 120d (120 days)                                                     |
| **GMAIL_USER**     | Gmail address for sending emails | Your Gmail account                                                        |
| **GMAIL_PASS**     | Gmail app password               | [Generate here](https://myaccount.google.com/apppasswords) (2FA required) |
| **CLOUDINARY\_\*** | Image hosting credentials        | Create account at [Cloudinary](https://cloudinary.com)                    |
| **KHALTI\_\***     | Payment gateway keys             | Create account at [Khalti](https://khalti.com)                            |
| **GEMINI_API_KEY** | Google's AI model                | Get from [Google AI Studio](https://aistudio.google.com/app/apikey)       |
| **GROQ_API_KEY**   | Groq's AI model                  | Get from [Groq Console](https://console.groq.com)                         |

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev  # if nodemon is configured
```

The backend will run on `http://localhost:3000`

#### 3. Frontend Setup

Open a new terminal and navigate to Frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

### Option 2: Docker Setup (Recommended for Production)

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Projects
```

#### 2. Create `Backend/config.env`

Follow the same process as above and fill in all required environment variables.

#### 3. Run with Docker Compose

**Development Environment:**

```bash
docker compose -f docker-compose.yaml up -d --build
```

**Production Environment:**

```bash
docker compose -f docker-compose.prod.yaml up -d --build
```

Check container status:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop containers:

```bash
docker compose down
```

## 📸 Screenshots

Below are UI previews of TinyTreasure displayed in a clean 2‑column grid.

<table>
  <tr>
    <td><img src="https://imgur.com/0RbagMF.png" width="100%"></td>
    <td><img src="https://imgur.com/37GTqk6.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/d2UYDvW.png" width="100%"></td>
    <td><img src="https://imgur.com/J2KFB70.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/i7KRefR.png" width="100%"></td>
    <td><img src="https://imgur.com/k5ICRDd.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/qGxFTS8.png" width="100%"></td>
    <td><img src="https://imgur.com/UTPZONe.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/Yza0vVD.png" width="100%"></td>
    <td><img src="https://imgur.com/JlClzmS.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/KThMKc6.png" width="100%"></td>
    <td><img src="https://imgur.com/tZGSe6z.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/7wodKKF.png" width="100%"></td>
    <td><img src="https://imgur.com/mWHLeV1.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/GEl9ggb.png" width="100%"></td>
    <td><img src="https://imgur.com/bEqg8VH.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/MS3CYY4.png" width="100%"></td>
    <td><img src="https://imgur.com/5dfOTbm.png" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://imgur.com/sFFLaWt.png" width="100%"></td>
  </tr>
</table>

