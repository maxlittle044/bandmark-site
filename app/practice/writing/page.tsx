import { PenLine, ArrowRight } from "lucide-react";
import Link from "next/link";
import SkillPage from "@/components/SkillPage";
import { writingPrompts } from "@/lib/writingPrompts";

export default function WritingPage() {
  return (
    <>
    <SkillPage
      data={{
        icon: PenLine,
        label: "Writing",
        tagline: "Two tasks, sixty minutes, scored on four criteria — and Task 2 counts for twice as much as Task 1.",
        stats: [
          { label: "Duration", value: "60 min" },
          { label: "Tasks", value: "2" },
          { label: "Min. words", value: "150 / 250" },
        ],
        whatsTested: [
          "Task Achievement / Response",
          "Coherence & Cohesion",
          "Lexical Resource",
          "Grammatical Range & Accuracy",
          "Academic Task 1: describe a chart, graph, or diagram",
          "Task 2: essay, both modules",
        ],
        sample: {
          title: "Sample prompt",
          body: (
            <div>
              <p className="font-medium text-navy mb-2">Writing Task 2</p>
              <p className="text-slate">
                Some people think universities should focus on preparing students for employment. Others believe
                the true purpose of a university is to give access to knowledge for its own sake. Discuss both
                views and give your own opinion.
              </p>
              <p className="font-mono text-xs text-amberdeep mt-3">Write at least 250 words.</p>
            </div>
          ),
        },
        tips: [
          "Spend 5 minutes planning Task 2 — an essay with a clear position beats one with better vocabulary but no argument.",
          "Answer every part of the question; partial answers cap your Task Achievement score.",
          "Vary sentence structure on purpose, but don't force complexity you can't control accurately.",
          "Leave 2 minutes to check articles, subject-verb agreement, and paragraph breaks.",
        ],
      }}
    />
    <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
      <h2 className="font-display font-semibold text-xl mb-5 text-navy">Available prompts</h2>
      <p className="text-sm text-slate mb-4">Free accounts get 2 AI-graded evaluations per month.</p>
      <div className="space-y-3">
        {writingPrompts.map((p) => (
          <div key={p.id} className="rounded-lg p-4 bg-white border border-slate/15 flex items-center justify-between">
            <div>
              <div className="font-medium text-navy text-sm">{p.taskType === "TASK_1" ? "Task 1" : "Task 2"}</div>
              <div className="text-xs text-slate line-clamp-1 max-w-md">{p.prompt}</div>
            </div>
            <Link href={`/writing/${p.id}`} className="inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg bg-amber text-navy shrink-0 ml-4">
              Start <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
