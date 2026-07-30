import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface QuestionInput {
  type: string;
  prompt: string;
  options: string[] | null;
  correctAnswer: string[];
}
interface SectionInput {
  passageText: string | null;
  transcriptText: string | null;
  questions: QuestionInput[];
}
interface TestInput {
  skill: "READING" | "LISTENING";
  title: string;
  source: string | null;
  durationMin: number;
  sections: SectionInput[];
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const body = (await req.json()) as TestInput;

  if (!body.title || !body.sections?.length) {
    return NextResponse.json({ error: "Title and at least one section are required" }, { status: 400 });
  }

  let order = 0;
  const test = await prisma.test.create({
    data: {
      skill: body.skill,
      title: body.title,
      source: body.source || null,
      durationMin: body.durationMin,
      sections: {
        create: body.sections.map((s, sIdx) => ({
          order: sIdx + 1,
          passageText: s.passageText || null,
          transcriptText: s.transcriptText || null,
          questions: {
            create: s.questions.map((q) => {
              order += 1;
              return {
                order,
                type: q.type,
                prompt: q.prompt,
                options: q.options && q.options.length ? q.options : undefined,
                correctAnswer: q.correctAnswer.length === 1 ? q.correctAnswer[0] : q.correctAnswer,
              };
            }),
          },
        })),
      },
    },
  });

  return NextResponse.json({ testId: test.id }, { status: 201 });
}
