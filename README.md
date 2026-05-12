# Finance Tracker

A full-stack personal finance application for tracking income, expenses, and budgets. Built with Next.js, Prisma, and PostgreSQL.

**Live demo:** https://finance-tracker-one-gules.vercel.app

---

## Features

- **Transactions** — Add, view, and delete income and expense transactions with category tagging
- **Dashboard** — Overview of monthly income, expenses, balance, and savings rate with category breakdown and 6-month trend charts
- **Budgets** — Set monthly spending limits per category with real-time progress tracking

---

## Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS            |
| Database   | PostgreSQL (Neon)       |
| ORM        | Prisma 7                |
| Charts     | Recharts                |
| Icons      | Lucide React            |
| Deployment | Vercel                  |

---

## Architecture

The app uses a hybrid rendering approach:

- **Server Components** — Dashboard fetches data directly via Prisma at request time
- **Client Components** — Transactions and Budgets pages use `useEffect` + `fetch` for interactivity
- **API Routes** — REST endpoints at `/api/transactions` and `/api/budgets` handle all database operations

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database

### Installation

```bash
git clone https://github.com/XiyanM/finance-tracker
cd finance-tracker
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=your_neon_connection_string
```

### Database Setup

```bash
npx prisma db push
npx prisma generate
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Schema

```prisma
model Transaction {
  id          String   @id @default(cuid())
  description String
  amount      Float
  category    String
  type        String
  date        DateTime @default(now())
  createdAt   DateTime @default(now())
}

model Budget {
  id       String @id @default(cuid())
  category String
  amount   Float
}
```

---

## API Reference

### Transactions

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/transactions`     | Fetch all transactions |
| POST   | `/api/transactions`     | Create a transaction   |
| DELETE | `/api/transactions/:id` | Delete a transaction   |

### Budgets

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/budgets`     | Fetch all budgets |
| POST   | `/api/budgets`     | Create a budget   |
| DELETE | `/api/budgets/:id` | Delete a budget   |
