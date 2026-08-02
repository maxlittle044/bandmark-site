import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function WritingResultPage({ params }: { params: { submissionId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/login?next=/writing/result/${params.submissionId}`);

  const submission = await prisma.writingSubmission.findUnique({
    where: { id: params.submissionId },
    include: { score: true },
  });

  if (!submission || submission.userId !== (session!.user as { id: string }).id) redirect("/practice/writing");
  if (!submission.score) {
    return <div className="max-w-2xl mx-auto px-6 py-24 text-center text-slate">Still grading — refresh in a moment.</div>;
  }

  const criteria = [
    ["Task Achievement", submission.score.taskAchievement],
    ["Coherence & Cohesion", submission.score.coherenceCohesion],
    ["Lexical Resource", submission.score.lexicalResource],
    ["Grammatical Range & Accuracy", submission.score.grammarAccuracy],
  ] as const;

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10 pt-14 pb-24">
      <div className="rounded-2xl p-8 bg-white border border-slate/15 mb-8 text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-slate mb-2">
          {submission.taskType === "TASK_1" ? "Writing Task 1" : "Writing Task 2"}
        </div>
        <div className="font-mono text-6xl font-bold text-amberdeep mb-2">{submission.score.overallBand.toFixed(1)}</div>
        <div className="text-sm text-slate">Overall band (AI estimate)</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {criteria.map(([label, value]) => (
          <div key={label} className="rounded-lg p-4 bg-white border border-slate/15 flex items-center justify-between">
            <span className="text-sm text-navy">{label}</span>
            <span className="font-mono text-lg font-semibold text-navy">{value.toFixed(1)}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6 bg-white border border-slate/15 mb-8">
        <h2 className="font-display font-semibold text-lg mb-3 text-navy">Feedback</h2>
        <p className="text-sm text-slate leading-relaxed">{submission.score.feedback}</p>
      </div>

      <Link href="/practice/writing" className="inline-block text-sm font-semibold px-6 py-3 rounded-lg bg-navy text-white">
        Back to Writing practice
      </Link>
    </div>
  );
}
