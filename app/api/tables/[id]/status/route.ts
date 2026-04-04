import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { TableStatus } from "@prisma/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status } = body;

    // Validate status parameter
    if (!status || !Object.values(TableStatus).includes(status as TableStatus)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const table = await prisma.table.update({
      where: { id: params.id },
      data: { status: status as TableStatus },
    });

    return NextResponse.json(table);
  } catch (error) {
    console.error("PUT /api/tables/[id]/status error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
