import { PenLine } from "lucide-react";
import SkillPage from "@/components/SkillPage";

export default function WritingPage() {
  return (
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
  );
}
