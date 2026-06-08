# EcoPulse Platform | Green Tech Hub & Editorial Suite

A high-performance, digitally sustainable content platform engineered with a
modern decoupled architecture. This repository serves as a split-stack monorepo
containing a type-safe Next.js frontend application tightly integrated with a
headless Strapi v5 content management database layer.

## Core Architecture & Stack Selection

This project is organized as a decoupled monorepo workspace:

| Layer                 | Technology                                        | Primary Responsibility                                                        | Port   |
| :-------------------- | :------------------------------------------------ | :---------------------------------------------------------------------------- | :----- |
| **Frontend**          | Next.js 15 (App Router), TypeScript, Tailwind CSS | Server-side rendering, routing optimization, semantic UI delivery             | `3000` |
| **Backend (CMS)**     | Strapi v5, SQLite, TypeScript                     | Content modeling, relational data storage, security roles, REST API endpoints | `1338` |
| **Analytics Service** | Go (Golang), Native HTTP Architecture             | High-throughput interaction capturing, low-latency telemetry processing       | `8080` |

### Architectural Engineering Decisions

1. **Decoupled Headless Design:** By separating the data management engine from
   the presentation layer, the application eliminates monolithic rendering
   bottlenecks. The frontend pre-fetches lightweight JSON payloads
   asynchronously over local loops, maximizing SEO discoverability and Core Web
   Vitals.
2. **Type-Safe Schema Mapping:** Data contracts between the API endpoints and
   the component tree are governed strictly through explicit TypeScript
   interfaces, mitigating runtime regressions and ensuring predictable data
   flow.
3. **Polyglot Microservice Integration:** Introduced an isolated analytics
   heartbeat service written in Go. This demonstrates architectural separation
   of concerns: heavy content rendering runs on the Node/Next.js stack, while
   high-frequency interaction telemetry is offloaded to Go's lightweight runtime
   to ensure maximum throughput under production loads.
4. **Optimized Local Asset Pipelines:** Engineered configuration solutions
   within Next.js remote domain patterns to systematically process media
   payloads locally, laying down production-ready configurations for seamless
   transition to cloud edge object storage (e.g., S3 or Cloudinary).

## Local Installation & Execution

To clone and run this workspace locally, ensure you have **Node.js (v18+)** and
**npm** installed.

### 1. Repository Setup

```bash
git clone [https://github.com/YOUR_USERNAME/eco-pulse-platform.git](https://github.com/YOUR_USERNAME/eco-pulse-platform.git)
cd eco-pulse-platform
```

### 2. Strapi Backend Initialization

```
cd backend
npm install
```

#### Restore the complete project database, media assets, and admin user profiles:

`npx strapi import -f export-package.tar.gz`

#### Launch the backend development layer:

`npm run develop`

The administration dashboard will compile locally at
http://localhost:1338/admin. Ensure your user role permissions are configured to
expose public find and findOne endpoints.

### 🔐 Local Administration Sandbox Credentials

To review Content-Type schemas, API access parameters, and relational field data
maps directly inside the Strapi dashboard (`http://localhost:1338/admin`),
utilize the following development credentials:

- **Email:** dev-reviewer@ecopulse.local
- **Password:** DeveloperReview2026!

### 3. Go Analytics Service Initialization

Open a secondary terminal workspace tab from the root directory:

```
cd analytics-service
go run main.go
```

### 4. Frontend Initialization

Open a third terminal workspace tab from the root directory:

```
cd frontend
npm install
npm run dev
```

The interactive platform will launch at http://localhost:3000.

### 🔑 Handling the Authenticated API Token

The frontend architecture enforces secure, production-grade token authorization
for data fetching via an .env.example template. To review the application,
choose one of the following seamless options:

- Option A (Zero Setup): By default, your imported Strapi database package
  preserves wide-open public access permissions. If you prefer to bypass
  environment configurations entirely, simply remove the `headers` block from
  the `getArticleBySlug` fetch method in `frontend/app/articles/[slug]/page.tsx`
  to stream content instantly over open public channels.

- Option B (Authenticated Security Pipeline - Recommended): To verify the
  token-authorized perimeter:
  1. Create a local environment file at `frontend/.env.local` based on the
     `.env.example` template.

  2. Log into the Strapi Admin Panel (`http://localhost:1338/admin`) using the
     sandbox credentials provided above.

  3. Navigate to **Settings** -> **API Tokens**, and click the **pencil/edit
     icon** on the right side of the token named `NEXT_JS_FRONTEND_TOKEN`.

  4. Ensure its **Token Type** is set to **Custom** with `find` and `findOne`
     checked under the Article content-type permissions.

  5. Click the **"Regenerate" / "View token"** button in the top-right corner to
     reveal the secure string key, copy it, and assign it to `STRAPI_API_TOKEN`
     inside your `frontend/.env.local`.

  6. Restart the frontend server (`npm run dev`) to clear the cached build
     environment context.

## Engineering Milestones (Git History)

This project follows strict semantic and conventional commit signatures (feat:,
chore:, fix:) to demonstrate a clean, predictable production delivery cycle. Key
architecture phases include:

- Workspace initialization and monorepo structural split.

- Strapi custom Content-Type validation and relational database design.

- Asynchronous dynamic parameter unwrapping matching modernized Next.js SSR
  standards.

- Cross-origin asset pipeline mapping for image streaming.

- Integrated semantic rich-text parsing using the official Strapi blocks
  renderer and configured Tailwind CSS v4 editorial typography layout
  constraints.

- Engineered an independent Go telemetry service to handle asynchronous
  client-side engagement tracking via cross-origin resource sharing (CORS).
