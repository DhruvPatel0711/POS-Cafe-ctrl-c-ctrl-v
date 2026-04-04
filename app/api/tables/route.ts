import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { floorId, tableNumber, seats } = body;
    
    if (!floorId || !tableNumber || seats === undefined) {
      return NextResponse.json(
        { error: "floorId, tableNumber, and seats are required" },
        { status: 400 }
      );
    }

    const table = await prisma.table.create({
      data: {
        floorId,
        tableNumber: String(tableNumber),
        seats: Number(seats),
      },
    });

    return NextResponse.json(table);
  } catch (error) {
    console.error("POST /api/tables error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
