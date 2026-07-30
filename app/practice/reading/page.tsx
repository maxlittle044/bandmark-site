import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import SkillPage from "@/components/SkillPage";
import { prisma } from "@/lib/prisma";

export default async function ReadingPage() {
  const tests = await prisma.test.findMany({ where: { skill: "READING" }, orderBy: { title: "asc" } });

  return (
    <>
    <SkillPage
      data={{
        icon: BookOpen,
        label: "Reading",
        tagline: "Three passages, forty questions, sixty minutes — no extra time to transfer answers.",
        stats: [
          { label: "Duration", value: "60 min" },
          { label: "Passages", value: "3" },
          { label: "Questions", value: "40" },
        ],
        whatsTested: [
          "Multiple choice",
          "True / False / Not Given",
          "Matching headings",
          "Sentence completion",
          "Summary / note / table completion",
          "Matching features",
        ],
        sample: {
          title: "Sample question",
          body: (
            <div>
              <p className="text-slate mb-4">
                <em>Passage excerpt:</em> "...While early urban planners assumed that green space was a luxury
                affordable only to wealthy districts, later studies found measurable public-health benefits even
                in small, informally maintained plots..."
              </p>
              <p className="font-medium text-navy mb-2">Do the following statements agree with the claims of the writer?</p>
              <p className="text-slate">Early planners viewed green space as essential to all districts.</p>
              <p className="font-mono text-xs text-amberdeep mt-2">TRUE · FALSE · NOT GIVEN</p>
            </div>
          ),
        },
        tips: [
          "Read the questions before the passage — you'll know what to hunt for.",
          "Don't chase perfect understanding. You need enough to answer, not to summarize.",
          "Watch for paraphrase: the answer rarely uses the exact words from the question.",
          "Budget roughly 20 minutes per passage and move on if you're stuck.",
        ],
      }}
    />
    <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
      <h2 className="font-display font-semibold text-xl mb-5 text-navy">Available tests</h2>
      <div className="space-y-3">
        {tests.map((t) => (
          <div key={t.id} className="rounded-lg p-4 bg-white border border-slate/15 flex items-center justify-between">
            <div>
              <div className="font-medium text-navy text-sm">{t.title}</div>
              <div className="text-xs text-slate font-mono">{t.durationMin} min</div>
            </div>
            <Link href={`/tests/${t.id}/attempt`} className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg bg-amber text-navy">
              Start <ArrowRight size={14} />
            </Link>
          </div>
        ))}
        {tests.length === 0 && <p className="text-sm text-slate">No tests seeded yet — run `npm run db:seed`.</p>}
      </div>
    </section>
    </>
  );
}
