import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAnswerCorrect, scoreToBand } from "@/lib/scoring";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Log in to submit." }, { status: 401 });

  const attempt = await prisma.attempt.findUnique({
    where: { id: params.id },
    include: { test: { include: { sections: { include: { questions: true } } } } },
  });

  if (!attempt) return NextResponse.json({ error: "Attempt not found" }, { status: 404 });
  if (attempt.userId !== (session.user as { id: string }).id) {
    return NextResponse.json({ error: "Not your attempt" }, { status: 403 });
  }
  if (attempt.status === "SUBMITTED") {
    return NextResponse.json({ error: "Already submitted" }, { status: 409 });
  }

  const { responses } = (await req.json()) as { responses: Record<string, string> };

  const allQuestions = attempt.test.sections.flatMap((s) => s.questions);
  let rawScore = 0;

  const answerRows = allQuestions.map((q) => {
    const response = responses[q.id] ?? "";
    const correct = isAnswerCorrect(q.type, response, q.correctAnswer);
    if (correct) rawScore += 1;
    return { questionId: q.id, response, isCorrect: correct };
  });

  const totalQuestions = allQuestions.length;
  const band = scoreToBand(rawScore, totalQuestions, attempt.test.skill);

  await prisma.$transaction([
    prisma.answer.createMany({
      data: answerRows.map((a) => ({ attemptId: attempt.id, ...a })),
    }),
    prisma.attempt.update({
      where: { id: attempt.id },
      data: { status: "SUBMITTED", submittedAt: new Date(), rawScore, totalQuestions, band },
    }),
  ]);

  return NextResponse.json({ attemptId: attempt.id, rawScore, totalQuestions, band });
}
