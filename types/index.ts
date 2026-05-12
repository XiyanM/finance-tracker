export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: "income" | "expense";
}

export interface Budget {
  id: string;
  amount: number;
  category: string;
}
