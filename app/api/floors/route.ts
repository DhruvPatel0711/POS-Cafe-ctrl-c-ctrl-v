import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const floors = await prisma.floor.findMany({
      include: {
        tables: true,
      },
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(floors);
  } catch (error) {
    console.error("GET /api/floors error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    
    const floor = await prisma.floor.create({
      data: { name },
    });
    
    return NextResponse.json(floor);
  } catch (error) {
    console.error("POST /api/floors error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
