export interface Transaction {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: 'income' | 'expense';
}