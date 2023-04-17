import {prisma} from "#/lib/databases/prisma";
import {Prisma} from "@prisma/client";
import {NextResponse} from "next/server";

export async function GET() {
  const bots = await prisma.bots.findMany();

  return NextResponse.json({ bots });
}

export async function POST(req: Request) {
  try {
    const { name, slug } = await req.json();
    const bot = await prisma.bots.create({
      data: {
        name,
        slug,
      },
    });
    return NextResponse.json({ bot });
  } catch (e) {
    let errorMessage = "Something went wrong.";
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (e.code === "P2002") {
        const uniqueFields = e?.meta?.target as [];
        errorMessage = `A bot with that ${uniqueFields.join(", ")} already exists`;
      }
    }
    return NextResponse.json(
      {},
      { status: 500, statusText: errorMessage || "Internal server error" },
    );
  }
}
