"use client"

import { useEffect, useState } from "react";
import { Budget, Transaction } from "@/types"
import { Trash2 } from "lucide-react";

export default function BudgetsPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState("Food")
    const [amount, setAmount] = useState("")
    const [budgets, setBudgets] = useState<Budget[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isSubmitting, setSubmitting] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const [budgetsRes, transactionsRes] = await Promise.all([
                fetch("/api/budgets"),
                fetch("/api/transactions")
            ])
            const budgets = await budgetsRes.json()
            const transactions = await transactionsRes.json()
            setBudgets(budgets)
            setTransactions(transactions)
        }
        fetchData()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!amount || parseFloat(amount) <= 0 || !category) return;

        setSubmitting(true)
        try {
            const res = await fetch("/api/budgets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: parseFloat(amount), category })
            })

            const updatedRes = await fetch("/api/budgets")
            const updatedBudgets = await updatedRes.json()
            setBudgets(updatedBudgets)
            setIsOpen(false)
            setAmount("")
            setCategory("Food")
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        await fetch(`/api/budgets/${id}`, {
            method: "DELETE",
        })
        setBudgets(budgets.filter((tx) => tx.id != id))
    }

    const now = new Date()
    const monthlyTransactions = transactions.filter((tx) => {
        const txDate = new Date(tx.date)
        return txDate.getMonth() == now.getMonth() && txDate.getFullYear() == now.getFullYear()
    })

    const getSpent = (category: string) => {
        return monthlyTransactions.filter((tx) => tx.category === category && tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0)
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-100">
                    Budgets
                </h1>
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition"
                >
                    Add Budget
                </button>
            </div>

            <div className="space-y-4">
                {budgets.map((budget) => {
                    const spent = getSpent(budget.category)
                    const percentage = Math.min((spent / budget.amount) * 100, 100)
                    const barColor = percentage >= 100 ? "bg-rose-500"
                        : percentage >= 75 ? "bg-amber-500"
                            : "bg-emerald-500"

                    return (
                        <div key={budget.id} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                            <div className="flex justify-between mb-2">
                                <p className="font-medium text-slate-200">{budget.category}</p>
                                <div className="flex items-center gap-4">
                                    <p className="text-sm text-slate-400">${spent.toFixed(2)} / ${budget.amount.toFixed(2)}</p>
                                    <button
                                        onClick={() => handleDelete(budget.id)}
                                        className="text-slate-500 hover:text-rose-400 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2">
                                <div
                                    className={"h-2 rounded-full transition-all duration-500 ${barColor}"}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                        </div>
                    )
                })}
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
                        <h2 className="text-xl font-bold text-white">Add Budget</h2>

                        <form onSubmit={(handleSubmit)} className="mt-6 space-y-4">

                            {/* 1. Amount & Category Grid */}
                            <div className="grid grid-cols-2 gap-4">
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
                                        <option>Transport</option>
                                        <option>Entertainment</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        value={amount}
                                        placeholder="0.00"
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 w-full h-10 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2
                                              text-white outline-none focus:border-blue-500 transition"
                                    />
                                </div>

                            </div>

                            {/* 4. Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
                            >
                                {isSubmitting ? "Saving..." : "Save Budget"}
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

            )
            }
        </div >
    )
}
