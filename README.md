# Commercial Workstation Product Catalogue MVP

An enterprise-ready, extensible product catalogue application built for rapid evolution from MVP to production-scale eCommerce. Designed using clean architectural boundaries (Adapter/Repository pattern) so that product data sources, look-and-feel, and notification providers can evolve independently.

---

## 🛠️ Tech Stack & Justification

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend** | **React (JavaScript, Vite)** | Lightweight, rapid render performance, componentized structure. |
| **Styling** | **`styled-components`** | Token-driven design system (**SALT & STONE** specification), clean isolation, zero leaky global CSS. |
| **Backend** | **Node.js (Express)** | Layered architecture (`controllers/`, `services/`, `adapters/`, `models/`), asynchronous non-blocking I/O, native JSON handling. |
| **Product Data Source** | **Fake Store API + Adapter** | Wrapped in `ProductAdapter`. The frontend never queries external APIs directly (meets Constraint #2). |
| **Database** | **MongoDB Atlas / In-Memory Fallback** | Mongoose schema with automated fallback so reviewers do not need external accounts (meets Constraint #6). |
| **Notification** | **Notification Service Adapter** | Configurable for real SMTP (AWS SES / SendGrid) or automated console logging for zero-friction local testing. |

---

## 🚀 Quick Start (Under 10 Minutes)

### Option 1: Run with Docker Compose (Recommended - Single Command)

Ensure Docker Desktop is running:

```bash
docker compose up --build
```

- **Frontend Client**: [http://localhost:80](http://localhost:80) (or port 80/5174)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

### Option 2: Run Locally with Node.js & npm

#### 1. Start the Backend API
```bash
cd server
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

#### 2. Start the Frontend Client
In a separate terminal:
```bash
cd client
npm install
npm run dev
```
The client will start on `http://localhost:5173` or `http://localhost:5174`.

---

## 🧪 Running Automated Tests

Run the backend integration test suite (covers health, featured 5, search filtering, single product lookup, categories, and enquiry submission validation):

```bash
cd server
npm test
```

All 7 test suites run via Jest and Supertest with zero external dependencies.

---

## 📋 Acceptance Criteria Checklist

- [x] **Home Page (Top 5 Featured)**: Dynamically selects and renders the 5 highest-rated products.
- [x] **Category Page**: Displays top-rated products in that category, followed by additional category items.
- [x] **Search**: Case-insensitive keyword search against title, description, and category handled by backend API.
- [x] **Product Detail Page**: Displays high-res product imagery, rating, price, full specifications, and commercial warranty badges.
- [x] **Enquiry Submission**: "Enquire" button launches the enquiry modal, validates contact details, persists the record, and notifies the sales inbox while showing the customer a "Thank You" screen.

---

## 📁 Key Documentation Files

- [DECISIONS.md](DECISIONS.md): Architectural decisions, recorded assumptions, trade-offs, and future roadmap.
- [AI_USAGE.md](AI_USAGE.md): AI tools used, key shaping prompts, reviewer error catches, and time-tracking breakdown.
- `.env.example`: Configuration templates for both client and server.
