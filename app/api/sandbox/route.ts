import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, code, language } = await req.json();

    if (!name || !code || !language) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const sandbox = await prisma.sandbox.create({
      data: {
        name,
        code,
        language,
        userId,
      },
    });

    return NextResponse.json(sandbox);
  } catch (error) {
    console.error("[SANDBOX_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language");

    const sandboxes = await prisma.sandbox.findMany({
      where: {
        userId,
        ...(language ? { language } : {}),
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(sandboxes);
  } catch (error) {
    console.error("[SANDBOX_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
