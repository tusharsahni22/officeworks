# DECISIONS & ASSUMPTIONS

This document records all architectural choices, assumptions made where acceptance criteria left deliberate gaps, requirements dropped or simplified, and how the system is engineered to scale beyond the MVP.

---

## 1. Assumptions Made Where Acceptance Criteria Were Unclear

| Acceptance Criteria Gap | Assumption Made | Engineering Rationale |
| :--- | :--- | :--- |
| **"Top Rated" 5 Products** | Products are sorted descending by `rating.rate` with `rating.count` as tiebreaker. Served via `GET /api/products/featured`. | Reflects authentic eCommerce logic where top products are determined by customer ratings rather than arbitrary IDs. |
| **Category Page "Top Rated + Additional"** | For any category, the top 2 highest-rated products are displayed in a "Top Rated in [Category]" shelf, followed by the remaining items under "Additional Products". | Provides clear visual hierarchy on category pages without duplicating product cards across shelves. |
| **Search Mechanism** | Case-insensitive substring search matching against `title`, `description`, and `category`, executed on the **backend Express API** (`GET /api/products?search=...`). | **Complies with Technical Constraint #2**: Frontend never queries third-party data directly. Backend filtering also supports scale without downloading entire catalogs to client memory. |
| **Email Delivery to Sales Inbox** | Implemented using an **Adapter Pattern (`NotificationService`)**. When SMTP credentials (AWS SES/SendGrid) are provided, real emails are sent; when omitted, it logs formatted messages to the console and an in-memory audit log. | **Complies strictly with Technical Constraint #6**: Reviewer can evaluate the full flow in under 10 minutes without signing up for paid email/SMTP accounts. |
| **External Product Sourcing** | Encapsulated in `ProductAdapter` connecting to Fake Store API with an internal fallback dataset. | Ensures 100% test and evaluation uptime even if Fake Store API experiences rate limits, network outages, or latency. |
| **Server-Driven UI (SDUI) & Layouts** | Contentful Headless CMS powers page composition, component ordering, and navigation. When credentials are not provided, an intelligent adapter serves default structured SDUI schemas. | Allows product and marketing teams to create new pages (`/pages/:slug`), reorder sections, and adjust copy without code deploys, while still allowing reviewers to test offline with zero paid accounts. |

---

## 2. Requirements Dropped or Simplified (and Why)

1. **User Authentication & Customer Logins**:
   * *Why Dropped:* Not requested in acceptance criteria. Adding login/registration would introduce unnecessary onboarding friction and distract from the critical commercial path (Search, Browse, Detail, Enquiry).
2. **Shopping Cart & Checkout Payment Gateway**:
   * *Why Dropped:* The user specified a commercial workplace business model where large B2B orders (workstations, bulk fitouts) require quotes and consultation rather than consumer checkout. We prioritized a high-converting, validated **Enquiry Modal & Sales Inbox flow**.
3. **Complex Deep Pagination**:
   * *Why Simplified:* The sample catalog is concise. Fast category filtering and case-insensitive search provide faster discovery without the cognitive overhead of multi-page pagination.

---

## 3. How the Design Supports Solution Growth Beyond the MVP

The system was architected from day one using **clean architectural boundaries** to prevent "throwaway" code:

1. **Repository & Adapter Pattern (Data Isolation)**:
   * Express controllers (`product.controller.js`) and services (`product.service.js`) never interact directly with raw APIs or hardcoded databases.
   * Switching the product catalog from Fake Store API to PostgreSQL on AWS RDS or MongoDB Atlas requires modifying only `product.adapter.js`—**zero changes to controllers, routes, or frontend code**.
2. **Server-Driven UI (SDUI) & Component Library**:
   * Built modular, reusable UI blocks (`HeroBanner`, `ProductShelf`, `DualFeaturette`, `CategoryPillsGrid`, `ContactFormSection`, `ValuePropsStrip`) mapped in `ComponentRegistry.jsx`.
   * Any marketing specialist can create new promotional landing pages (`/pages/:slug`) directly from Contentful or JSON configuration.
3. **AWS Cloud Production-Ready**:
   * Fully containerized with a production multi-stage `Dockerfile` and `docker-compose.yml`.
   * Designed for direct deployment to **AWS ECS Fargate**, **AWS App Runner**, or **Elastic Beanstalk**, with automated CI/CD pipelines targeting Docker Hub.
4. **Token-Driven Design System (`theme.js`)**:
   * Built on a centralized token hierarchy (`styled-components`). Global colors, typography, and spacing scales can be updated in a single file without refactoring components.

---

## 4. What We Would Do Next With Another Day

1. **Persistent Cloud Database**:
   * Connect AWS DocumentDB or MongoDB Atlas with indexed text search (`$text` index on `title` and `description`).
2. **Enhanced Caching Layer**:
   * Add Redis / AWS ElastiCache on `/api/products`, `/api/products/featured`, and `/api/cms/pages/*` with 60-second TTL and webhook-driven cache invalidation upon CMS publish.
3. **Automated End-to-End (E2E) Test Suite**:
   * Implement Playwright or Cypress workflows testing the complete browser path: Homepage -> Category filter -> Product page -> Enquiry form submission -> Sales inbox log verification.
4. **Internal Sales CRM Dashboard**:
   * Add a secure `/admin/enquiries` portal with status tracking (New, Quoted, Closed) and export capabilities for sales representatives.
5. **Rate Limiting & Anti-Spam Security**:
   * Add `express-rate-limit` and Cloudflare Turnstile / reCAPTCHA v3 on the `/api/enquiries` submission endpoint.

---

## 5. Automated Continuous Deployment & Multi-Environment Architecture

To satisfy Requirement #3 (AWS Compatibility) and eliminate manual server maintenance, we implemented a continuous deployment pipeline pairing GitHub Actions with an automated Docker watcher:

1. **GitHub Actions Image Build & Secret Baking**:
   * On pushes to `main`, `qa`, or `dev`, `.github/workflows/deploy.yml` generates `.env` from repository secrets and builds a unified multi-stage container (`Dockerfile`).
   * The image is published to Docker Hub (`tusharsahni22/officeworks:latest`, `:qa`, `:dev`).
   * Baking configuration into the image guarantees zero setup friction on remote cloud hosts—no manual `.env` file management or secret leaking on host disks.
2. **Autonomous CD via Watchtower**:
   * The host server runs `containrrr/watchtower` via `docker-compose.yml`, which polls Docker Hub every 60 seconds over the local Docker daemon socket (`/var/run/docker.sock`).
   * When an updated image digest is detected, Watchtower automatically performs a graceful rolling restart of the target container with `--cleanup` to remove obsolete image layers.
3. **Multi-Environment Port Segregation**:
   * Production (`main` / `:latest`): Port `80` (App) and `5000` (API)
   * QA / Staging (`qa` / `:qa`): Port `8081`
   * Development (`dev` / `:dev`): Port `8082`
   * Enables rapid multi-branch validation on a single host without port collision.
