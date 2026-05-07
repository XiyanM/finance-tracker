import Link from "next/link"

export default function Home() {
  return (
    <main className="py-16">
      <h1 className="text-5xl font-bold tracking-tight text-slate-100">Finance Tracker</h1>
      <p className="mt-4 text-lg text-slate-400">My first full-stack app.</p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/dashboard"
          className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/transactions"
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition"
        >
          View Transactions
        </Link>
      </div>
    </main>
  )
}