import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Check, X } from "lucide-react";

export default async function ResultPage({ params }: { params: { id: string; attemptId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/login?next=/tests/${params.id}/result/${params.attemptId}`);

  const attempt = await prisma.attempt.findUnique({
    where: { id: params.attemptId },
    include: {
      test: true,
      answers: { include: { question: true } },
    },
  });

  if (!attempt || attempt.userId !== (session!.user as { id: string }).id) {
    redirect("/practice");
  }
  if (attempt.status !== "SUBMITTED") {
    redirect(`/tests/${params.id}/attempt`);
  }

  const sortedAnswers = [...attempt.answers].sort((a, b) => a.question.order - b.question.order);

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10 pt-14 pb-24">
      <div className="rounded-2xl p-8 bg-white border border-slate/15 mb-10 text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-slate mb-2">{attempt.test.title}</div>
        <div className="font-mono text-6xl font-bold text-amberdeep mb-2">{attempt.band?.toFixed(1)}</div>
        <div className="text-sm text-slate mb-1">Estimated band score</div>
        <div className="text-sm text-navy font-medium">{attempt.rawScore} / {attempt.totalQuestions} correct</div>
      </div>

      <h2 className="font-display font-semibold text-xl mb-4 text-navy">Answer review</h2>
      <div className="space-y-3 mb-10">
        {sortedAnswers.map((a) => (
          <div key={a.id} className="rounded-lg p-4 bg-white border border-slate/15 flex items-start gap-3">
            {a.isCorrect ? (
              <Check size={18} className="text-green mt-0.5 shrink-0" />
            ) : (
              <X size={18} className="text-red-500 mt-0.5 shrink-0" />
            )}
            <div className="text-sm">
              <p className="font-medium text-navy mb-1">
                <span className="font-mono text-slate mr-2">{a.question.order}.</span>{a.question.prompt}
              </p>
              <p className="text-slate">
                Your answer: <span className="text-ink">{a.response || "—"}</span>
                {!a.isCorrect && (
                  <>
                    {" · "}Correct: <span className="text-green">{formatCorrectAnswer(a.question.correctAnswer)}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/practice" className="inline-block text-sm font-semibold px-6 py-3 rounded-lg bg-navy text-white">
        Back to practice
      </Link>
    </div>
  );
}

function formatCorrectAnswer(value: unknown): string {
  if (Array.isArray(value)) return String(value[0]);
  return String(value);
}
