# Commercial Workstation Product Catalogue MVP

An enterprise-ready, extensible product catalogue application built for rapid evolution from MVP to production-scale eCommerce. Designed using clean architectural boundaries (Adapter/Repository pattern and Server-Driven UI) so that product data sources, CMS layout schemas, look-and-feel, and notification providers can evolve independently without frontend redeployment.

---

## 🛠️ Tech Stack & Architectural Highlights

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend** | **React (JavaScript, Vite)** | Lightweight, fast HMR, componentized architecture. |
| **Styling** | **`styled-components`** | Token-driven design system, scoped styling, zero global CSS conflicts. |
| **Backend** | **Node.js (Express)** | Layered architecture (`controllers/`, `services/`, `adapters/`, `models/`), asynchronous non-blocking I/O. |
| **Product Data Source** | **Fake Store API + Product Adapter** | Wrapped in `ProductAdapter`. The frontend never queries external APIs directly (Constraint #2). |
| **Database** | **MongoDB Atlas / In-Memory Fallback** | Mongoose schema with automated fallback so reviewers do not need external accounts (Constraint #6). |
| **Notification** | **Notification Service Adapter** | Configurable for real SMTP (AWS SES / SendGrid) or automated console logging for zero-friction local testing. |
| **CMS / SDUI** | **Contentful Headless CMS + Adapter** | Server-Driven UI (SDUI) architecture allowing marketing & product teams to reorder page sections or launch campaigns without code redeploys. Includes zero-credential fallback mode for instant reviewer evaluation. |

---

## 🚀 Quick Start (Under 10 Minutes)

### Prerequisites
- **Node.js** (v18+ recommended) & **npm**
- Or **Docker** & **Docker Compose**

---

### Option 1: Run with Docker (Recommended - Single Command)

Ensure Docker Desktop is running, then run from the project root:

```bash
docker compose up --build
```

- **Frontend Client**: [http://localhost:80](http://localhost:80) (or mapped port)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

### Option 2: Run Locally with Node.js & npm

#### 1. Setup Environment Files
From the project root:
```bash
# Server environment
cp server/.env.example server/.env
```
*(No external secrets or accounts are required; the app automatically runs in reviewer zero-dependency mode out of the box).*

#### 2. Start the Backend API
In terminal 1:
```bash
cd server
npm install
npm run dev
```
The server will start on [http://localhost:5000](http://localhost:5000).

#### 3. Start the Frontend Client
In terminal 2:
```bash
cd client
npm install
npm run dev
```
The frontend will start on [http://localhost:5173](http://localhost:5173) (or [http://localhost:5174](http://localhost:5174)).

---

## 🏗️ Building for Production

### Build the Frontend Client
```bash
cd client
npm run build
```
Compiled production assets are output to `client/dist/`.

### Run the Unified Production Server
The Express server is configured to serve the production build statically from a single container or server process:
```bash
cd server
npm start
```

---

## 🧪 Running Automated Tests

Run the backend integration test suite:

```bash
cd server
npm test
```

### Test Coverage Highlights (7/7 Suites Passing):
- **Health Check**: `GET /health` returns 200 and operational status.
- **Top 5 Featured**: `GET /api/products/featured` returns exactly the 5 highest-rated products.
- **Search Filtering**: `GET /api/products?search=...` tests case-insensitive keyword search against title and description.
- **Product Lookup**: `GET /api/products/:id` validates single product specification payloads.
- **Category Splitting**: `GET /api/categories` and `GET /api/categories/:name` verifies category discovery.
- **Enquiry Validation**: `POST /api/enquiries` verifies data persistence, required fields, and email format rejection (400 on malformed input, 201 on success).

---

## 📱 Server-Driven UI & Dynamic Routes

The application incorporates a **Server-Driven UI (SDUI)** architecture backed by **Contentful Headless CMS**:
- **Homepage (`/`)**: Dynamically renders modular sections (`HeroBanner`, `ValuePropsStrip`, `ProductShelf`, `DualFeaturette`, `CategoryPillsGrid`) in the exact order configured in CMS.
- **Dynamic CMS Pages (`/pages/:slug`)**:
  - [http://localhost:5174/pages/deals](http://localhost:5174/pages/deals) (Commercial clearance & promotions)
  - [http://localhost:5174/pages/ergonomics](http://localhost:5174/pages/ergonomics) (Workplace Ergonomics Guide)
  - [http://localhost:5174/pages/contact](http://localhost:5174/pages/contact) (Corporate support & direct enquiry form)
- **Header & Footer**: Navigation links, announcements, and footer columns are fully CMS-driven.
- **Reviewer Fallback Mode**: If Contentful credentials are omitted from `.env`, the adapter automatically serves structured fallback layouts, guaranteeing zero setup friction.

---

## 📋 Acceptance Criteria Checklist

- [x] **Home Page (Top 5 Featured)**: Dynamically selects and renders the 5 highest-rated products.
- [x] **Category Page**: Displays top-rated products in that category, followed by additional category items.
- [x] **Search**: Case-insensitive keyword search against title, description, and category handled by backend API.
- [x] **Product Detail Page**: Displays high-res product imagery, rating, price, full specifications, and commercial warranty badges.
- [x] **Enquiry Submission**: "Enquire" button launches the enquiry modal, validates contact details, persists the record, and notifies the sales inbox while showing the customer a "Thank You" screen.
- [x] **Zero Paid Accounts / 10-Minute Setup**: Runs fully offline with in-memory persistence and console logging when external services (MongoDB/Contentful/SMTP) are not configured.

---

## 📁 Key Documentation Files

- [`DECISIONS.md`](DECISIONS.md): Architectural decisions, recorded assumptions, trade-offs, and future roadmap.
- [`AI_USAGE.md`](AI_USAGE.md): AI tools used, key shaping prompts, reviewer error catches, and time-tracking breakdown.
- [`server/.env.example`](server/.env.example): Configuration template for backend environment variables.
