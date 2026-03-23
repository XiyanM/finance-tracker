import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "Track your income, expenses and budgets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-100">
            Finance Tracker
            </Link>

            <nav className="flex items-center gap-2 text-sm font-medium">
              <Link href="/" className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-slate-100">
              Home
              </Link>
              <Link href="/dashboard" className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-slate-100">
              Dashboard
              </Link>
              <Link href="/transactions" className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-slate-100">
              Transactions
              </Link>
              <Link href="/budgets" className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-slate-100">
              Budgets
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8"> {children}</main>
      </body>
    </html>
  );
}
