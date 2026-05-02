"use client"


import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = [
    "#3b82f6", // blue
    "#06b6d4", // cyan
    "#8b5cf6", // violet
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ec4899", // pink
]

type CategoryData = {
    category: string
    amount: number
}

type MonthlyData = {
    month: string
    income: number
    expenses: number
}

export function CategoryChart({ data }: { data: CategoryData[] }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius={60}
                    outerRadius={120}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}

export function MonthlyChart({ data }: { data: MonthlyData[] }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.05)" }} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm shadow-lg">
                {label && <p className="mb-1 font-medium text-slate-300">{label}</p>}
                {payload.map((entry: any, index: number) => (
                    <p key={index} style={{ color: entry.color }}>
                        {entry.name}: ${(entry.value as number).toFixed(2)}
                    </p>
                ))}
            </div>
        )
    }
    return null
}