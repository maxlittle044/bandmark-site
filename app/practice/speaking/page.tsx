import { Mic } from "lucide-react";
import SkillPage from "@/components/SkillPage";

export default function SpeakingPage() {
  return (
    <SkillPage
      data={{
        icon: Mic,
        label: "Speaking",
        tagline: "A face-to-face interview in three parts, recorded, with no time to prepare beyond one minute for Part 2.",
        stats: [
          { label: "Duration", value: "11–14 min" },
          { label: "Parts", value: "3" },
          { label: "Prep time", value: "1 min" },
        ],
        whatsTested: [
          "Fluency & Coherence",
          "Lexical Resource",
          "Grammatical Range & Accuracy",
          "Pronunciation",
          "Part 1: everyday questions about you",
          "Part 2: long turn from a cue card",
          "Part 3: abstract discussion linked to Part 2",
        ],
        sample: {
          title: "Sample cue card (Part 2)",
          body: (
            <div>
              <p className="font-medium text-navy mb-2">Describe a skill you would like to learn.</p>
              <p className="text-slate">You should say:</p>
              <ul className="text-slate list-disc list-inside">
                <li>what the skill is</li>
                <li>how you would learn it</li>
                <li>how long it would take</li>
                <li>and explain why you want to learn it</li>
              </ul>
            </div>
          ),
        },
        tips: [
          "Don't memorize answers — examiners are trained to spot rehearsed speech and it hurts your Fluency score.",
          "It's fine to pause and self-correct; natural hesitation reads better than a flat, over-rehearsed answer.",
          "In Part 3, extend your answers with a reason and an example instead of one-line responses.",
          "Practice out loud, not just in your head — pronunciation is scored on production, not intention.",
        ],
      }}
    />
  );
}
