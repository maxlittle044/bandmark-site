import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Log in to start a test." }, { status: 401 });

  const { testId } = await req.json();
  if (!testId) return NextResponse.json({ error: "Missing testId" }, { status: 400 });

  const attempt = await prisma.attempt.create({
    data: {
      userId: (session.user as { id: string }).id,
      testId,
      status: "IN_PROGRESS",
    },
  });

  return NextResponse.json({ attemptId: attempt.id }, { status: 201 });
}
