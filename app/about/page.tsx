import { Check } from "lucide-react";

const points = [
  {
    title: "Scored like the real thing",
    body: "Most free practice tools give you a raw percentage. We map every attempt to the same nine-band descriptors examiners actually use, so a 7.5 here means the same thing a 7.5 means on test day.",
  },
  {
    title: "Timed, every time",
    body: "No pausing mid-passage, no replaying audio. The clock is the part of the exam most candidates underestimate, so it's part of every practice session by default.",
  },
  {
    title: "Feedback you can act on",
    body: "Writing and Speaking scores come with specific notes tied to each criterion — not just a number, but what to fix before your next attempt.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-16 pb-20">
      <h1 className="font-display font-semibold text-3xl md:text-4xl mb-6 text-navy">
        Built for candidates, not clicks.
      </h1>
      <p className="text-lg text-slate max-w-2xl mb-14">
        Bandmark started from a simple frustration: most free IELTS practice sites optimize for time
        on page, not for an accurate picture of where you stand. We built the scoring first, and the
        rest of the product around it.
      </p>

      <div className="space-y-10 mb-16">
        {points.map((p) => (
          <div key={p.title} className="flex gap-4">
            <Check size={20} className="text-green mt-1 shrink-0" />
            <div>
              <h2 className="font-display font-semibold text-lg text-navy mb-1">{p.title}</h2>
              <p className="text-slate text-sm leading-relaxed">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-7 bg-white border border-slate/15">
        <h2 className="font-display font-semibold text-lg text-navy mb-2">A note on the score itself</h2>
        <p className="text-sm text-slate leading-relaxed">
          No self-marked or AI-scored practice test is a guarantee of your result on test day — only the
          real exam is that. What we aim for is a fair, consistent estimate you can trust to actually
          move between attempts, so you know whether your studying is working before you sit the real thing.
        </p>
      </div>
    </div>
  );
}
