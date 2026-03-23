import {Transaction} from "@/types"

const MOCK_DATA: Transaction[] = [
    {
        id: "1",
        amount: 12.50,
        category: "Food",
        description: "Chicken Rice",
        date: "20-03-2026",
        type: "expense"
    }
];

export default function TransactionsPage() {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-800 bg-slate-900 text-slate-400">
                    <tr>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Description</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Amount</th>

                    </tr>

                </thead>
                <tr>
                        <tbody>hello</tbody>
                    </tr>
            </table>


        </div>
    )
}