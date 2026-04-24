import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const transaction = await prisma.transaction.create({
    data: {
      description: body.description,
      amount: body.amount,
      category: body.category,
      type: body.type,
    },
  });
  return NextResponse.json(transaction);
}
