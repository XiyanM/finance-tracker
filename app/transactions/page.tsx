"use client";

import { Transaction } from "@/types";
import { useState } from "react";

const MOCK_DATA: Transaction[] = [
    {
        id: "1",
        amount: 12.5,
        category: "Food",
        description: "Chicken Rice",
        date: "20-03-2026",
        type: "expense",
    },
    {
        id: "2",
        amount: 1250,
        category: "Work",
        description: "Payroll",
        date: "20-03-2026",
        type: "income",
    },
];

export default function TransactionsPage() {
    const [isOpen, setIsOpen] = useState(false); // default: closed
    const [type, setType] = useState<"income" | "expense">("expense");
    const [transactions, setTransactions] = useState<Transaction[]>(MOCK_DATA);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");

    // add transaction logic
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            description,
            amount: parseFloat(amount),
            category,
            type,
            date: new Date().toLocaleDateString('en-GB'),
        };

        setTransactions([newTransaction, ...transactions]);
        setIsOpen(false);
        setDescription("");
        setAmount("");
    };

    const totalIncome = transactions.filter((tx) => tx.type === "income").reduce(
        (sum, tx) => sum + tx.amount,
        0
    );
    const totalExpenses = transactions.filter((tx) => tx.type === "expense").reduce(
        (sum, tx) => sum + tx.amount,
        0
    );
    const totalBalance = totalIncome - totalExpenses;

    return (
        <main className="max-w-7xl mx-auto p-8 space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-100">
                    Transactions
                </h1>
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition"
                >
                    Add Transaction
                </button>
            </div>
            {/* Stat Cards Section*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <p className="text-sm font-medium text-slate-400">Total Balance</p>
                    <h2 className="text-3xl font-bold text-white mt-2">
                        $
                        {totalBalance.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}
                    </h2>
                </div>

                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <p className="text-sm font-medium text-slate-400">Monthly Income</p>
                    <h2 className="text-3xl font-bold text-white mt-2">
                        +${totalIncome.toFixed(2)}
                    </h2>
                </div>

                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <p className="text-sm font-medium text-slate-400">Monthly Expenses</p>
                    <h2 className="text-3xl font-bold text-white mt-2">
                        -${totalExpenses.toFixed(2)}
                    </h2>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-800 bg-slate-900 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 text-right font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {transactions.map((tx) => (
                            <tr
                                key={tx.id}
                                className="hover:bg-slate-800/50 transition-colors"
                            >
                                <td className="px-6 py-4 text-slate-400">{tx.date}</td>
                                <td className="px-6 py-4 font-medium text-slate-200">
                                    {tx.description}
                                </td>
                                <td className="px-6 py-4 text-slate-400">
                                    <span className="inline-flex items-center rounded-md bg-slate-800 px-2 py-1 text-xs font-medium border border-slate-700">
                                        {tx.category}
                                    </span>
                                </td>
                                <td
                                    className={`px-6 py-4 text-right font-semibold ${tx.type === "income" ? "text-emerald-400" : "text-rose-400"
                                        }`}
                                >
                                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
                        <h2 className="text-xl font-bold text-white">Add Transaction</h2>

                        <form onSubmit={(handleSubmit)} className="mt-6 space-y-4">
                            {/* 1. Description Input */}
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Weekly Groceries"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2
                                              text-white outline-none focus:border-blue-500 transition"
                                />
                            </div>

                            {/* 2. Amount & Category Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 w-full h-10 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2
                                                  text-white outline-none focus:border-blue-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="mt-1 w-full h-10 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2
                                                      text-white outline-none focus:border-blue-500 transition appearance-none ">
                                        <option>Food</option>
                                        <option>Salary</option>
                                        <option>Transport</option>
                                        <option>Entertainment</option>
                                    </select>
                                </div>
                            </div>

                            {/* 3. Transaction Type (Income/Expense) */}
                            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setType("expense")}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${type === "expense"
                                        ? "bg-slate-800 text-white shadow-sm"
                                        : "text-slate-500 hover:text-slate-300"
                                        }`}
                                >
                                    Expense
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setType("income")}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${type === "income"
                                        ? "bg-slate-800 text-white shadow-sm"
                                        : "text-slate-500 hover:text-slate-300"
                                        }`}
                                >
                                    Income
                                </button>
                            </div>
                            {/* 4. Submit Button */}
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
                            >
                                Save Transaction
                            </button>
                        </form>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 py-4 text-slate-400 hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
