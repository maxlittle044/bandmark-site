import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const test = await prisma.test.findUnique({
    where: { id: params.id },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: { questions: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });

  // Never send correctAnswer to the client before submission.
  const safeTest = {
    ...test,
    sections: test.sections.map((s) => ({
      ...s,
      questions: s.questions.map(({ correctAnswer, ...q }) => q),
    })),
  };

  return NextResponse.json(safeTest);
}
