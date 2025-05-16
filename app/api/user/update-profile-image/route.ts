import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl } = await req.json();

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { image: imageUrl },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update failed", error);
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}
