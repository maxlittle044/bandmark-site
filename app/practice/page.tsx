import Link from "next/link";
import { Headphones, BookOpen, PenLine, Mic, ArrowRight } from "lucide-react";

const skills = [
  { key: "reading", label: "Reading", icon: BookOpen, meta: "40 tests · 60 min", desc: "Three passages, forty questions, real exam pacing." },
  { key: "listening", label: "Listening", icon: Headphones, meta: "40 tests · 30 min", desc: "Four recordings, one listen, no replays." },
  { key: "writing", label: "Writing", icon: PenLine, meta: "AI feedback · 60 min", desc: "Task 1 and Task 2, scored on all four criteria." },
  { key: "speaking", label: "Speaking", icon: Mic, meta: "3 parts · 11–14 min", desc: "Record your answers, get band-level feedback." },
];

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-20">
      <div className="max-w-xl mb-12">
        <h1 className="font-display font-semibold text-3xl md:text-4xl mb-4 text-navy">Practice</h1>
        <p className="text-slate text-lg">Pick a skill. Every test is timed and formatted like the real exam.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {skills.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.key}
              href={`/practice/${s.key}`}
              className="rounded-xl p-6 bg-white border border-slate/15 hover:border-navy/30 transition-colors flex flex-col gap-4"
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-paper">
                <Icon size={20} className="text-navy" />
              </div>
              <div>
                <div className="font-display font-semibold text-lg text-navy mb-1">{s.label}</div>
                <p className="text-sm text-slate mb-2">{s.desc}</p>
                <div className="font-mono text-xs text-slate">{s.meta}</div>
              </div>
              <span className="text-sm font-medium inline-flex items-center gap-1 mt-auto text-amberdeep">
                View {s.label} <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
