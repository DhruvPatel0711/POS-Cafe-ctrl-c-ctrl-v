import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Safe fallback matching auth.ts
const secretKey = process.env.JWT_SECRET || "odoo-pos-cafe-super-secret-key!2026";
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(req: NextRequest) {
  // Only protect API routes (excluding auth endpoints)
  if (req.nextUrl.pathname.startsWith("/api/") && !req.nextUrl.pathname.startsWith("/api/auth/")) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid token format" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      await jwtVerify(token, encodedKey, {
        algorithms: ["HS256"],
      });
      // Token is valid, proceed
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
  ],
};
