import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ Ensure Prisma import works
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    console.log("✅ API called: /api/auth/signup");

    // ✅ Step 1: Parse request body
    const body = await req.json();
    console.log("📩 Received body:", body);

    if (!body || Object.keys(body).length === 0) {
      console.error("❌ Request body is empty");
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }

    const { email, password, name } = body;
    if (!email || !password || !name) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("🔑 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("💾 Saving user in database...");
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    console.log("✅ User created successfully:", user);
    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error: any) {
    console.error("🚨 Signup Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}