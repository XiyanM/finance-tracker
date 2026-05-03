"use client"

import { useEffect, useState } from "react";
import { Budget, Transaction } from "@/types"
export default function BudgetsPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [budgets, setBudgets] = useState<Budget[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])

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

    return (
       

    )
}