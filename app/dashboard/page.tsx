import { prisma } from "@/lib/prisma"
import { CategoryChart, MonthlyChart } from "@/components/Charts"
import Link from "next/link"
import { Transaction } from "@/types"
export const dynamic = "force-dynamic"


export default async function DashboardPage() {
    const transactions = await prisma.transaction.findMany({
        orderBy: { createdAt: "desc" },
    }) as Transaction[]

    const now = new Date()
    const monthlyTransactions = transactions.filter((tx) => {
        const txDate = new Date(tx.date)
        return txDate.getMonth() == now.getMonth() && txDate.getFullYear() == now.getFullYear()
    })

    const totalIncome = monthlyTransactions.filter((tx) => tx.type === "income").reduce(
        (sum, tx) => sum + tx.amount,
        0
    );
    const totalExpenses = monthlyTransactions.filter((tx) => tx.type === "expense").reduce(
        (sum, tx) => sum + tx.amount,
        0
    );
    const allTimeIncome = transactions.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0)
    const allTimeExpenses = transactions.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0)
    const totalBalance = allTimeIncome - allTimeExpenses
    const savingsRate = totalIncome > 0
        ? ((totalIncome - totalExpenses) / totalIncome) * 100
        : 0

    const recentTransactions = transactions.slice(0, 5)

    // Category chart data
    const categoryData = monthlyTransactions
        .filter((tx) => tx.type === "expense")
        .reduce((acc, tx) => {
            acc[tx.category] = (acc[tx.category] || 0) + tx.amount
            return acc
        }, {} as Record<string, number>)

    const categoryChartData = Object.entries(categoryData).map(([category, amount]) => ({
        category,
        amount
    }))

    // Monthly bar chart data — last 6 months
    const monthlyChartData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - (5 - i))
        const month = date.toLocaleString("default", { month: "short" })
        const year = date.getFullYear()

        const monthTx = transactions.filter((tx) => {
            const txDate = new Date(tx.date)
            return txDate.getMonth() === date.getMonth() &&
                txDate.getFullYear() === year
        })

        const income = monthTx
            .filter((tx) => tx.type === "income")
            .reduce((sum, tx) => sum + tx.amount, 0)

        const expenses = monthTx
            .filter((tx) => tx.type === "expense")
            .reduce((sum, tx) => sum + tx.amount, 0)

        return { month, income, expenses }
    })

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-8">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-100">
                    Dashboard
                </h1>
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                    <h2 className="text-sm font-medium text-slate-400 mb-4">Expenses by Category</h2>
                    <CategoryChart data={categoryChartData} />
                </div>
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                    <h2 className="text-sm font-medium text-slate-400 mb-4">Income vs Expenses</h2>
                    <MonthlyChart data={monthlyChartData} />
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
                        {recentTransactions.map((tx) => (
                            <tr
                                key={tx.id}
                                className="hover:bg-slate-800/50 transition-colors"
                            >
                                <td className="px-6 py-4 text-slate-400">{new Date(tx.date).toLocaleDateString('en-GB')}</td>
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

            <div className="flex justify-end">
                <Link
                    href="/transactions"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                    View all transactions →
                </Link>
            </div>


        </div>
    )
}