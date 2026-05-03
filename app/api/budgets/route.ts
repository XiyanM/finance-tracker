import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const budgets = await prisma.budget.findMany({});
  return NextResponse.json(budgets);
}

export async function POST(request: Request) {
  const body = await request.json();
  const transaction = await prisma.budget.create({
    data: {
      category: body.category,
      amount: body.amount,
    },
  });
  return NextResponse.json(transaction);
}
