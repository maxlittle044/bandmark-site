import { BookOpen } from "lucide-react";
import SkillPage from "@/components/SkillPage";

export default function ReadingPage() {
  return (
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
  );
}
