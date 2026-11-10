# AGENTS.md — Coding Agent Guidelines & Project Rules

This repository follows strict architectural rules and design conventions. Any AI coding assistant (Cursor, Claude Code, Antigravity, Copilot) working in this codebase must adhere to the instructions below.

---

## 1. Architectural Boundaries

- **Zero Direct Client-to-Third-Party API Calls (Rule #2)**:
  The React frontend (`client/`) MUST NEVER query Fake Store API, external databases, or third-party email providers directly. All operations route through the backend Express API (`server/`).
- **Adapter Pattern for Data & Services**:
  - `server/src/adapters/product.adapter.js`: Encapsulates external product sourcing with local fallbacks.
  - `server/src/adapters/contentful.adapter.js`: Encapsulates Contentful CMS interactions with structured fallback schemas.
  - `server/src/services/notification.service.js`: Decoupled email/notification dispatch with zero-dependency console fallback.
- **Server-Driven UI (SDUI)**:
  - Frontend components (`HeroBanner`, `ProductShelf`, `DualFeaturette`, `CategoryPillsGrid`, `ContactFormSection`, `ValuePropsStrip`) are registered in `client/src/components/library/ComponentRegistry.jsx`.
  - Dynamic pages (`/pages/:slug`) and the Homepage (`/`) query `GET /api/cms/pages/:slug` and render components in the exact order specified by the CMS layout.

---

## 2. Reviewer Zero-Paid-Account Guarantee (Rule #6)

- Any reviewer must be able to run the entire application locally in under 10 minutes via:
  ```bash
  docker compose up --build
  ```
  or running `npm run dev` in `server` and `client`.
- When external credentials (`CONTENTFUL_ACCESS_TOKEN`, `MONGODB_URI`, `SMTP_HOST`) are absent in `.env`:
  - The backend MUST gracefully fallback to in-memory persistence and default SDUI layouts.
  - Tests MUST pass with zero external dependencies.

---

## 3. Styling & Design Standards

- **Design Tokens**: All styles use `styled-components` adhering to `client/src/styles/theme.js` (color tokens, clean neutral backgrounds `#FAFAFA`, `#F8F8F8`, dark slate navy headers).
- **Responsive by Default**: All grids must adapt cleanly across desktop (4-5 columns), tablet (2-3 columns), and mobile (1-2 columns) without text clipping or horizontal overflow.
- **Product Card Image Constraints**: Product cards must enforce fixed viewport bounds (max height 220px, `object-fit: contain`) to prevent oversized image layout breaks.

---

## 4. Testing & Verification

- Every API endpoint change must maintain 100% pass status on the backend Jest test suite:
  ```bash
  cd server && npm test
  ```
- Before pushing, always run `npm run build` in `client/` to verify Vite bundle compilation.
