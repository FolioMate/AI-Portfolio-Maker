import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Image URL required" }), { status: 400 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { image: imageUrl },
  });

  return new Response(JSON.stringify({ message: "Image updated" }), { status: 200 });
}
