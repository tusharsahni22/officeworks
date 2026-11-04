# DECISIONS & ASSUMPTIONS

This document records all architectural choices, assumptions made where acceptance criteria left gaps, deliberate trade-offs, and how the system is designed to evolve beyond the MVP.

---

## 1. Assumptions Made Where Criteria Left Gaps

| Acceptance Criteria Gap | Assumption Made | Engineering Rationale |
| :--- | :--- | :--- |
| **"Top Rated" 5 Products** | Products are sorted descending by `rating.rate` (and `rating.count` as tiebreaker). The top 5 are served via `GET /api/products/featured`. | Mimics real eCommerce logic where ratings are calculated from verified customer feedback. |
| **Category Page "Top Rated + Additional"** | For any category, the top 2 highest-rated products appear under a "Top Rated in [Category]" section, and the remainder under "Additional Products". | Gives a natural hierarchy on category pages without duplicating tiles. |
| **Search Mechanism** | Case-insensitive substring match against `title`, `description`, and `category` performed **on the backend API** (`GET /api/products?search=...`). | Technical Constraint #2 mandates that client never calls third-party APIs directly. Filtering in the backend also matches scalable architecture rather than downloading thousands of items to the browser. |
| **Email Delivery to Sales Inbox** | Built with an **Adapter Pattern (`NotificationService`)**. In local reviewer mode without `.env` SMTP secrets, it logs formatted emails to console and an in-memory audit log. If SMTP credentials (e.g. AWS SES / SendGrid) are provided, it dispatches real emails. | **Complies strictly with Technical Constraint #6**: reviewer does not need to create or pay for any email account to test the system in under 10 minutes. |
| **Product Metadata Source** | Wrapped in a **`ProductAdapter`** that queries Fake Store API with fallback data. | Guarantees 100% uptime even if Fake Store API undergoes rate-limiting or downtime during evaluation. |

---

## 2. Requirements Dropped or Simplified (and Why)

1. **User Authentication & Customer Logins**:
   * *Why Dropped:* Not in acceptance criteria. Adding login would introduce friction and distract from the critical path (Search, Browse, Detail, Enquiry).
2. **Payment Gateway & Cart Checkout**:
   * *Why Dropped:* The entrepreneur specified an **enquiry-first model** (B2B commercial sales desk). A cart checkout was excluded in favor of high-converting lead capture.
3. **Complex Pagination**:
   * *Why Simplified:* Fake Store API provides a limited catalog. Category filtering and search provide better discovery without pagination overhead at this MVP stage.

---

## 3. How the Design Supports Solution Growth Beyond the PoC

The entrepreneur emphasized not wanting a throwaway prototype. We implemented clear architectural boundaries:

1. **Repository & Adapter Pattern (Data Isolation)**:
   * The Express controllers (`product.controller.js`) and services (`product.service.js`) **never interact directly with external APIs or raw SQL/Mongo queries**.
   * They interact with `ProductAdapter`. When switching to a production database (e.g. PostgreSQL on AWS RDS or MongoDB Atlas), **zero controller or frontend code changes**—only the adapter implementation changes.
2. **Notification Service Abstraction**:
   * The enquiry flow interacts with `NotificationService.sendEnquiryNotification()`. Switching from the current dev logger to AWS SES, SendGrid, or Kafka/SQS event streams requires modifying a single service file.
3. **Token-Driven Design System (`theme.js`)**:
   * Styled-components use a centralized token architecture (**SALT & STONE specification**). Rebranding the look and feel requires editing design tokens (`color1` through `color7`, typography, radii) without rewriting component structures.
4. **AWS Production-Ready**:
   * The app is containerized (`docker-compose.yml`, multi-stage Dockerfiles) and ready for AWS ECS Fargate, AWS App Runner, or Elastic Beanstalk.

---

## 4. What We Would Do Next With Another Day

1. **Database Persistence**: Add automated seeding into MongoDB Atlas / AWS DocumentDB with full Mongoose schemas and indexes on `title` and `category`.
2. **Rate Limiting & Spam Prevention**: Implement `express-rate-limit` and reCAPTCHA v3 on the `/api/enquiries` endpoint to prevent automated bot spam.
3. **Caching Layer**: Integrate Redis / AWS ElastiCache on `/api/products` and `/api/products/featured` with TTL invalidation.
4. **End-to-End (E2E) Testing**: Add Cypress or Playwright tests simulating the complete user journey: Browse -> Search -> Open Modal -> Submit Enquiry -> Verify Confirmation.
5. **Admin Dashboard**: Build an internal route `/admin/enquiries` for the sales team to review, triage, and reply to customer inquiries.
