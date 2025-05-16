import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to database...");

    // Fetch all users from the database
    const users = await prisma.user.findMany();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error connecting to database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
