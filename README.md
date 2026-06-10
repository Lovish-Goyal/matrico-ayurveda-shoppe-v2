# Matrico Ayurveda

An AI-powered, symptom-based Ayurvedic remedies and wellness platform. The application combines traditional wellness solutions with modern artificial intelligence, allowing users to search symptoms, browse natural remedies, buy ayurvedic products, and consult a conversational AI assistant powered by Gemini.

---

## Technical Stack

### Frontend
- **Framework:** React.js (built with Vite)
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Styling:** CSS Modules
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** Password hashing via bcrypt
- **AI Engine:** Google Gemini API (via `@google/generative-ai` / AI Consultation controllers)

---

## Directory Structure

```text
matrico-ayurveda-shoppe/
├── app/                  # Frontend single page application (SPA)
│   ├── public/           # Static assets
│   ├── src/              # React components, pages, hooks, and stores
│   ├── .env.example      # Frontend environment variables template
│   └── package.json      # React dependencies and development scripts
├── server/               # Backend REST API
│   ├── controllers/      # Request handlers & logic (AI controller, etc.)
│   ├── data/             # Static product and disease/symptom datasets
│   ├── models/           # Mongoose schemas (User, Product, Disease, ContactUs)
│   ├── routes/           # Express router definitions (api, auth, users)
│   ├── scripts/          # Database seeding and utility scripts
│   ├── .env.example      # Backend environment variables template
│   └── server.js         # Entry point for the Express server
└── README.md             # Project documentation
```

---

## Environment Setup

Configuration is handled separately via environment files in both the `app/` and `server/` directories.

### 1. Server Configuration
Create a `.env` file in the `server/` directory:
```env
PORT=7080
MONGO_URI_CLUSTER=mongodb://127.0.0.1:27017/matrico_ayurveda_shoppee
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Frontend Configuration
Create a `.env` file in the `app/` directory:
```env
VITE_BACKEND_URL=http://localhost:7080
```

---

## Installation & Setup

### Prerequisites
- Node.js (v16.x or higher)
- MongoDB running locally or a remote MongoDB Atlas connection string

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd matrico-ayurveda-shoppe
   ```

2. **Set up the Backend:**
   Install dependencies and seed the database.
   ```bash
   cd server
   npm install
   # Seed the database with static products and remedies data
   node scripts/seed.js
   ```

3. **Set up the Frontend:**
   Install dependencies.
   ```bash
   cd ../app
   npm install
   ```

---

## Development

The frontend package is configured to run both the frontend dev server and the backend server concurrently using a single command. 

From the **`app/` directory**, run:
```bash
npm run dev
```

This runs:
- Frontend on: `http://localhost:5173` (or the next available port)
- Backend on: `http://localhost:7080` (or the configured `PORT`)

### Separate Processes (Alternative)
If you prefer running them in separate terminals:

- **Start Backend:**
  ```bash
  cd server
  npm start
  ```

- **Start Frontend:**
  ```bash
  cd app
  npm run dev:app
  ```

---

## API Endpoints Reference

### Authentication
- `POST /auth/register` - Create a new user account (hashes password via bcrypt)
- `POST /auth/login` - Authenticate user credentials

### Core API
- `POST /api/v1/ai/consult` - Interact with the Gemini-powered AI Health Assistant
- `GET /api/v1/search?q=<query>` - Unified keyword search for both products and symptoms
- `GET /api/v1/products?q=<query>` - Fetch and filter Ayurvedic products
- `GET /api/v1/diseases?q=<query>` - Fetch and filter remedies and symptoms list

### Contact
- `POST /contact` - Submit a message via the contact form

---

## Production Build & Deployment

### Build the Frontend
To compile the static React assets:
```bash
cd app
npm run build
```
The compiled output is written to `app/dist/` and can be served using any static host (e.g., Netlify, Vercel) or statically served from the backend.

### Deploying the Backend
Ensure all relevant environment variables (`MONGO_URI_CLUSTER`, `GEMINI_API_KEY`, `PORT`) are configured in your hosting environment provider (e.g., Render, Railway, AWS).
