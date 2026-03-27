import { Transaction } from "@/types"
import { useState } from "react";

const MOCK_DATA: Transaction[] = [
    {
        id: "1",
        amount: 12.50,
        category: "Food",
        description: "Chicken Rice",
        date: "20-03-2026",
        type: "expense"
    },
    {
        id: "1",
        amount: 1250,
        category: "Work",
        description: "Payroll",
        date: "20-03-2026",
        type: "income"
    }
];

export default function TransactionsPage() {
    const [isOpen, setIsOpen] = useState(false); // default: closed

    const totalIncome = MOCK_DATA.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpenses = MOCK_DATA.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    return (
        <main className="max-w-7xl mx-auto p-8 space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-100">Transactions</h1>
                <button className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition">
                    Add Transaction
                </button>
            </div>
            {/* Stat Cards Section*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <p className="text-sm font-medium text-slate-400">Total Balance</p>
                    <h2 className="text-3xl font-bold text-white mt-2">
                        ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>

                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <p className="text-sm font-medium text-slate-400">Monthly Income</p>
                    <h2 className="text-3xl font-bold text-white mt-2">+${totalIncome.toFixed(2)}</h2>
                </div>

                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <p className="text-sm font-medium text-slate-400">Monthly Expenses</p>
                    <h2 className="text-3xl font-bold text-white mt-2">-${totalExpenses.toFixed(2)}</h2>
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
                        {MOCK_DATA.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-slate-400">{tx.date}</td>
                                <td className="px-6 py-4 font-medium text-slate-200">{tx.description}</td>
                                <td className="px-6 py-4 text-slate-400">
                                    <span className="inline-flex items-center rounded-md bg-slate-800 px-2 py-1 text-xs font-medium border border-slate-700">
                                        {tx.category}ß
                                    </span>
                                </td>
                                <td className={`px-6 py-4 text-right font-semibold ${tx.type === "income" ? "text-emerald-400" : "text-rose-400"
                                    }`}>
                                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>

    );
}
