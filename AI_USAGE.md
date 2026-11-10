# AI USAGE & ENGINEERING NOTES

This document transparently records the tools, models, agent rules, and prompts used during the development of this solution, as well as where AI proposals were reviewed, corrected, and refined.

---

## 1. Tools and Models Used

- **Primary Assistant**: Google DeepMind Agentic Assistant (Antigravity with Gemini 3.8 Flash model).
- **Tooling & Integrations**: Local PowerShell execution, direct file editing tools, Node.js v24 runtime, Jest/Supertest, Vite 8, Docker Engine, Git.
- **Agent Rule File**: Committed as [`AGENTS.md`](AGENTS.md) at the repository root to guide development and enforce architectural constraints.

---

## 2. Key Prompts and Moments That Shaped the Solution

### Moment 1: Establishing Architectural Boundaries (No Throwaway Code)
- **Prompt Direction**: *"Build a small product catalogue with AI tools, record your assumptions, and be ready to defend every decision in a follow-up interview... they do not want a prototype that gets thrown away; they want a foundation that can grow."*
- **Outcome**: Designed the **Adapter Pattern** for external product sourcing (`product.adapter.js`) and notification delivery (`notification.service.js`). The business logic and controllers remain completely decoupled from whether data originates from Fake Store API, MongoDB, or AWS SES.

### Moment 2: Enforcing Technical Constraint #6 (Zero Paid Dependencies for Reviewer)
- **Prompt Direction**: Technical Constraint #6 — *"Your solution must not depend on paid services or accounts the reviewer would need to create."*
- **Challenge**: The acceptance criteria required that an email be delivered to the sales inbox upon enquiry submission, and later Contentful was added for SDUI page composition.
- **Solution**: Engineered transparent in-memory and console-logger fallbacks in `notification.service.js`, `db.js`, and `contentful.adapter.js`. If `.env` contains no external credentials, the entire application, test suite, and SDUI layouts run out of the box with zero setup friction.

### Moment 3: Transitioning to Server-Driven UI (SDUI) & Dynamic Contentful Control
- **Prompt Direction**: *"I want that the dashboard or the other pages such as product page or productdetail page and many other router... should be controlled by cms like there should be one component library in our application and on any page if we want to handle or change the ui change the order of displaying the component or want to create something new that can be controlled by the cms... suggest best cms and plan this approach like modern apps (Zepto, Blinkit, Nike)."*
- **Outcome**: Implemented an extensible SDUI pipeline:
  1. Component Library in `client/src/components/library/` (`HeroBanner`, `ProductShelf`, `DualFeaturette`, `CategoryPillsGrid`, `ContactFormSection`, `ValuePropsStrip`).
  2. Registry mapping in `ComponentRegistry.jsx`.
  3. Dynamic routing `/pages/:slug` querying `GET /api/cms/pages/:slug`.
  4. Contentful CMS integration allowing non-technical editors to create pages and reorder components without code redeployment.

### Moment 4: Professional Design Refinement & Luxury E-Commerce Aesthetics
- **Prompt Direction**: User shared visual references requesting clean, high-end commercial workplace presentation with responsive typography, dark slate navy headers, and refined product framing.
- **Outcome**: Restructured the layout into a clean design hierarchy, replaced awkward solid containers with subtle glassmorphic backdrop frames, and ensured all cards stay strictly within proportional boundaries across devices.

---

## 3. Where the AI Got Something Wrong and How We Caught It

1. **Vite Boilerplate CSS Alignment Conflict**:
   * *What Happened:* Vite created a default `index.css` with `:root { place-items: center; }` which forced the entire application into a narrow vertical column, causing layout collapse.
   * *How Caught:* Detected during local browser verification and visual smoke testing.
   * *Fix:* Purged the default `index.css` and `App.css`, consolidating all styling under styled-components `GlobalStyle`.

2. **Search API Test False Positive with Fake Store API**:
   * *What Happened:* The initial test searched for `"chair"`, which existed in fallback mock data but not in Fake Store API's raw dataset when testing against live endpoints.
   * *How Caught:* Jest test suite failed on `GET /api/products?search=chair`.
   * *Fix:* Updated the test to search for a universally present term (`"cotton"`), ensuring robust 7/7 passing tests regardless of data source origin.

3. **Contentful 401 Token Misalignment**:
   * *What Happened:* Contentful returned a 401 error on `/entries` when attempting to fetch pages.
   * *How Caught:* Server logs captured `401 Unauthorized: The access token you sent could not be found or is invalid`.
   * *Root Cause Identified:* A Content Management API (CMA) token had been placed where a Content Delivery API (CDA) token was expected. We guided the correct token mapping between CDA (read) and CMA (management setup).

4. **Single-Item Search Card Grid Explosion**:
   * *What Happened:* When a search returned only 1 product, standard CSS grid rules stretched that single card to fill the entire 1440px desktop screen.
   * *How Caught:* User shared a screenshot showing an oversized SSD product card.
   * *Fix:* Refactored `SearchPage.jsx` and `ProductCard.jsx` to enforce `repeat(auto-fill, minmax(240px, 280px))` with `justify-content: start` and a strict `max-width: 320px` card boundary.

---

## 4. Time Spent Breakdown

| Phase | Time Spent | Key Deliverables |
| :--- | :--- | :--- |
| **Planning & Architectural Boundaries** | ~25 mins | Tech stack selection, adapter pattern design, recorded assumptions. |
| **Backend API & Adapter Layer** | ~40 mins | Express layered architecture, product adapter, enquiry controller, notification adapter, 7/7 Jest tests. |
| **Frontend Core & Acceptance Criteria** | ~45 mins | React client, product catalog, search page, product detail page, enquiry modal with validation. |
| **Server-Driven UI & Contentful Integration** | ~40 mins | Component library, `ComponentRegistry`, dynamic routing `/pages/:slug`, dynamic header/footer, Contentful script. |
| **UI Polish, Mobile Responsiveness & Review** | ~30 mins | Navigation drawer, responsive CSS grids, README, DECISIONS.md, AI_USAGE.md. |
| **Total** | **~3 hours 00 mins** | Well-aligned with the 2–3 hour timebox. |
