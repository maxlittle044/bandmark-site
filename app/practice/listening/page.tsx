import { Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";
import SkillPage from "@/components/SkillPage";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ListeningPage() {
  const tests = await prisma.test.findMany({ where: { skill: "LISTENING" }, orderBy: { title: "asc" } });

  return (
    <>
    <SkillPage
      data={{
        icon: Headphones,
        label: "Listening",
        tagline: "Four recordings that get progressively harder, played once, with ten minutes to transfer answers.",
        stats: [
          { label: "Duration", value: "30 min" },
          { label: "Sections", value: "4" },
          { label: "Questions", value: "40" },
        ],
        whatsTested: [
          "Form / note / table completion",
          "Multiple choice",
          "Plan / map / diagram labelling",
          "Matching",
          "Sentence completion",
          "Short-answer questions",
        ],
        sample: {
          title: "Sample question",
          body: (
            <div>
              <p className="text-slate mb-4"><em>Audio context:</em> a student enquiring about a library membership.</p>
              <p className="font-medium text-navy mb-2">Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.</p>
              <div className="font-mono text-sm text-slate space-y-1">
                <p>Membership type: <span className="text-amberdeep">______</span></p>
                <p>Annual fee: £ <span className="text-amberdeep">______</span></p>
              </div>
            </div>
          ),
        },
        tips: [
          "Use the pause before each section to read the questions — predict the type of answer expected.",
          "Spelling and grammar count. A correct word spelled wrong is marked wrong.",
          "Numbers, dates, and names are common distractor traps — the speaker often self-corrects.",
          "You only hear it once, so write while you listen; you'll refine your notes during the transfer time.",
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
