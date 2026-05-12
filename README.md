This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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
