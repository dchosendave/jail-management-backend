# Jail Management System API

A backend API for managing the operations of a jail or correctional facility. Built with Express and TypeScript, this system handles inmate registration, facility and cell management, personnel tracking, booking/admission records, criminal case management, and visit logging.

> **Status:** Early development. The database schema and authentication scaffold are in place. Business logic endpoints are planned but not yet implemented.

---

## Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| **Framework** | Express v5         |
| **Language**  | TypeScript v7      |
| **ORM**       | Drizzle ORM        |
| **Database**  | PostgreSQL         |

---

## Prerequisites

- **Node.js** v18 or later
- **npm** (comes with Node.js)
- **Docker** for running PostgreSQL locally:
  - **Windows:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) (WSL2 backend recommended)
  - **macOS:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - **Linux:** [Docker Engine](https://docs.docker.com/engine/install/) + docker compose plugin (or Docker Desktop)

---

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd exp
npm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

This starts a PostgreSQL container named `jail-management-database` with the following defaults (matching the `.env` file):

- Username: `app`
- Password: `default`
- Database: `jail-management`
- Port: `5432`

To stop the container later: `docker compose down`

### 3. Configure environment variables

The `.env` file in the project root comes pre-configured with sensible defaults:

```
PORT=3000
BASE_URL=/api/v1
ENABLE_SCALAR_DOCS=true
DATABASE_URL=postgresql://app:default@localhost:5432/jail-management
```

Adjust `PORT`, `BASE_URL`, or `DATABASE_URL` as needed for your environment.

### 4. Generate and apply database migrations

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

The first command generates SQL migration files from the Drizzle schema definitions in `src/db/`. The second applies them to your PostgreSQL database, creating all tables.

### 5. Start the development server

```bash
npm run dev
```

This starts the server using `tsx watch`, which automatically reloads on file changes. You should see:

```
[START]    Server is running at http://localhost:3000
[HEALTH]   Health check endpoint available at http://localhost:3000/api/v1/health
```

---

## Available Scripts

| Command             | Description                                    |
|---------------------|------------------------------------------------|
| `npm run dev`       | Start the development server with hot reload   |
| `npm run build`     | Compile TypeScript to JavaScript via `tsc`     |

---

## Project Structure

```
exp/
├── .env                          # Environment variables
├── docker-compose.yml            # PostgreSQL service
├── drizzle.config.ts             # Drizzle Kit configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
├── docs/
│   ├── jail-management.md        # Planned API endpoint reference
│   └── jail-management-schema.md # Complete database schema design
└── src/
    ├── app.ts                    # Express application entry point
    ├── types/
    │   └── responses.ts          # Shared API response type definitions
    ├── auth/                     # Authentication module
    │   ├── auth.constants.ts     # Error message constants
    │   ├── auth.handlers.ts      # Route handler functions
    │   ├── auth.responses.ts     # Response type interfaces
    │   ├── auth.routes.ts        # Express router
    │   └── auth.schemas.ts       # Zod validation schemas
    ├── references/               # Reference data module
    │   ├── references.handlers.ts
    │   └── references.routes.ts
    └── db/                       # Database schema definitions
        ├── index.ts              # Barrel export of all tables
        ├── bookings.schema.ts
        ├── cases.schema.ts
        ├── cells.schema.ts
        ├── committing-courts.schema.ts
        ├── facilities.schema.ts
        ├── inmate-cases.schema.ts
        ├── inmates.schema.ts
        ├── personnel.schema.ts
        └── references.schema.ts
```

---

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Currently Implemented

| Method | Path                                    | Description                        |
|--------|-----------------------------------------|------------------------------------|
| GET    | `/health`                               | Health check (returns timestamp + status) |

**Auth** — OTP-based passwordless authentication (currently returns mock data):

| Method | Path                                    | Description                        |
|--------|-----------------------------------------|------------------------------------|
| POST   | `/auth/send`                            | Send OTP for account creation/update/password change |
| POST   | `/auth/verify`                          | Verify OTP code                    |
| POST   | `/auth/resend`                          | Resend OTP                         |
| POST   | `/auth/change-password`                 | Change password                    |
| POST   | `/auth/forgot-password`                 | Initiate password reset            |

**References** — Geographic and configuration reference data:

| Method | Path                                    | Description                        |
|--------|-----------------------------------------|------------------------------------|
| GET    | `/references/countries`                 | List of countries                  |
| GET    | `/references/regions`                   | Philippine regions                 |
| GET    | `/references/provinces`                 | Philippine provinces               |
| GET    | `/references/cities-and-municipalities` | Philippine cities and municipalities |
| GET    | `/references/barangays`                 | Philippine barangays               |
| GET    | `/references/valid-ids`                 | Government-issued ID types         |
| GET    | `/references/questions`                 | Security questions                 |

### Planned

| Module      | Method | Path                                  | Description                       |
|-------------|--------|---------------------------------------|-----------------------------------|
| **Inmates** | POST   | `/inmates`                            | Register a new inmate             |
|             | GET    | `/inmates`                            | List/search inmates               |
|             | GET    | `/inmates/:id`                        | Get inmate details                |
|             | PATCH  | `/inmates/:id`                        | Update inmate information         |
|             | GET    | `/inmates/:id/bookings`               | List bookings for an inmate       |
|             | GET    | `/inmates/:id/cases`                  | List cases for an inmate          |
|             | GET    | `/inmates/:id/visits`                 | List visit history for an inmate  |
|             | POST   | `/inmates/:id/attachments`            | Attach a file to an inmate record |
| **Personnel** | POST | `/personnel`                          | Register a new jail officer       |
|             | GET    | `/personnel`                          | List personnel                    |
|             | GET    | `/personnel/:id`                      | Get personnel details             |
|             | PATCH  | `/personnel/:id`                      | Update personnel information      |
| **Facilities & Cells** | POST | `/facilities`                 | Register a jail facility          |
|             | GET    | `/facilities`                         | List facilities                   |
|             | GET    | `/facilities/:id`                     | Get facility details              |
|             | PATCH  | `/facilities/:id`                     | Update facility                   |
|             | GET    | `/facilities/:id/cells`               | List cells in a facility          |
|             | POST   | `/facilities/:id/cells`               | Add a cell or dormitory           |
| **Bookings** | POST  | `/bookings`                           | Create an admission record        |
|             | GET    | `/bookings/:id`                       | Get booking details               |
| **Cases**   | POST   | `/cases`                              | Register a criminal case          |
|             | GET    | `/cases`                              | List/search cases                 |
|             | GET    | `/cases/:id`                          | Get case details                  |
|             | POST   | `/inmates/:id/cases`                  | Link a case to an inmate          |
| **Visitors & Visits** | POST | `/visitors`                    | Register a visitor                |
|             | POST   | `/visits`                             | Log a visit                       |
| **Attachments** | POST | `/attachments`                       | Upload a file linked to any entity |

---

## Database Schema

The database consists of the following tables:

| Table                | Description                                       |
|----------------------|---------------------------------------------------|
| `facilities`         | Jail and detention facilities                     |
| `cells`              | Housing units within a facility                   |
| `cell_assignments`   | Inmate-to-cell assignments (with history)         |
| `inmates`            | Master record for Persons Deprived of Liberty     |
| `bookings`           | Admission events linking inmates to facilities    |
| `personnel`          | Jail officers and staff                           |
| `personnel_assignments` | Officer-to-facility assignments (with history) |
| `cases`              | Criminal case records (entity-agnostic)           |
| `inmate_cases`       | Many-to-many join: inmates to cases               |
| `committing_courts`  | Courts that issue commitment orders               |
| `countries`          | Country reference data                            |

Key relationships:

- A **facility** has many **cells** and many **personnel assignments**
- An **inmate** has many **bookings** (admission events), many **cell assignments** (housing history), and many **cases** (via the join table)
- A **booking** links an inmate to a facility and optionally to a committing court
- Almost every table includes `created_by` and `updated_by` foreign keys referencing `personnel` for audit tracking

Additional tables (visitors, visits, attachments, users, user roles, OTP challenges, Philippine geography hierarchy) are defined in the design docs but not yet implemented as Drizzle schemas.

---

## Development Notes

- **Module pattern:** Each domain (auth, references, etc.) follows a consistent structure: `*.routes.ts` (router), `*.handlers.ts` (request handling), and optional `*.schemas.ts` (validation), `*.responses.ts` (types), `*.constants.ts` (messages).
- **Path aliases:** The `@/*` alias resolves to `./src/*` (configured in `tsconfig.json`). All imports use explicit `.js` extensions as required by ESM + `nodenext` module resolution.
- **Strict TypeScript:** The project uses strict mode with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, and `isolatedModules` enabled.
- **No tests yet:** The test script in `package.json` is a placeholder.
