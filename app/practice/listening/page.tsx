import { Headphones } from "lucide-react";
import SkillPage from "@/components/SkillPage";

export default function ListeningPage() {
  return (
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
  );
}
