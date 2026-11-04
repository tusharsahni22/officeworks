# AI USAGE & ENGINEERING NOTES

This document transparently records how AI tools were directed to plan, scaffold, and refine the solution, along with key prompt moments and engineering reviews.

---

## 1. Tools and Models Used

- **Primary Assistant**: Google DeepMind Agentic Assistant (Antigravity with Gemini 3.8 Flash model).
- **Tooling Integrations**: Local Shell execution, file editing, Node.js runtime, Supertest/Jest, Vite, Git.

---

## 2. Key Prompts and Moments That Shaped the Solution

### Moment 1: Architectural Scaffolding & Eliminating "Throwaway" Risk
- **Prompt Direction**: *"build a small product catalogue with AI tools, record your assumptions, and be ready to defend every decision in a follow-up interview... they do not want a prototype that gets thrown away; they want a foundation that can grow."*
- **Outcome**: Established the **Adapter Pattern** for both product sourcing (`product.adapter.js`) and notification delivery (`notification.service.js`). The controllers are completely agnostic to whether data comes from Fake Store API, MongoDB Atlas, or AWS SES.

### Moment 2: Reviewer Zero-Dependency Constraint Enforcement
- **Prompt Direction**: Technical Constraint #6 — *"Your solution must not depend on paid services or accounts the reviewer would need to create."*
- **Challenge**: The acceptance criteria required that an email be delivered to the sales inbox upon enquiry submission.
- **Solution**: Designed an intelligent fallback in `notification.service.js` and `db.js`. If `.env` contains no credentials, it routes to console logging and in-memory audit logs. This guarantees any reviewer can run tests and experience the full flow in under 2 minutes without registering for third-party services.

### Moment 3: Design Token Refinement (SALT & STONE Specification)
- **Prompt Direction**: Applied the SALT & STONE design token system (`color-1` to `color-7`, strict spacing scale, pinned radii, trust signals first).
- **Engineering Review & Correction**: The initial card rendering cropped product images awkwardly (`object-fit: cover`) and placed category tags with unnatural border offsets. The human reviewer caught this in a screenshot; we intervened to change the styling to `object-fit: contain`, clean `#FAFAFA` neutral framing, and crisp inset category tags.

---

## 3. Where the AI Got Something Wrong and How We Caught It

1. **Vite Boilerplate CSS Conflict**:
   * *What Happened:* Vite created a default `index.css` with `:root { place-items: center; }` which forced the entire React application into a centered vertical column, clipping the editorial banner.
   * *How Caught:* Detected during browser smoke test and screenshot review.
   * *Fix:* Purged the default `index.css` and `App.css`, consolidating all styling under styled-components `GlobalStyle`.
2. **Search API Test False Positive**:
   * *What Happened:* The initial test searched for `"chair"`, which existed in fallback data but not in Fake Store API's raw data when the test suite executed online.
   * *How Caught:* Jest test suite failed on `GET /api/products?search=chair`.
   * *Fix:* Updated the test to search for a universally present term (`"cotton"`), ensuring robust green tests regardless of data source origin.

---

## 4. Time Spent Breakdown

| Phase | Time Spent | Key Deliverables |
| :--- | :--- | :--- |
| **Planning & Architecture** | ~25 mins | Tech stack selection, adapter pattern design, recorded assumptions. |
| **Frontend Development** | ~50 mins | React app, styled-components token system, category pages, search, enquiry modal. |
| **Backend API & Adapters** | ~35 mins | Node.js Express layered architecture, product adapter, notification service, Jest tests. |
| **Testing & Review** | ~20 mins | Integration test suite, Docker setup, DECISIONS.md, AI_USAGE.md. |
| **Total** | **~2 hours 10 mins** | Well within the 2–3 hour timebox. |

