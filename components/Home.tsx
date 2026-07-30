"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Headphones, BookOpen, PenLine, Mic, ArrowRight, Check, TrendingUp } from "lucide-react";

const skills = [
  { key: "reading", label: "Reading", icon: BookOpen, band: 8.0, meta: "40 tests · 60 min" },
  { key: "listening", label: "Listening", icon: Headphones, band: 7.5, meta: "40 tests · 30 min" },
  { key: "writing", label: "Writing", icon: PenLine, band: 6.5, meta: "AI feedback · 60 min" },
  { key: "speaking", label: "Speaking", icon: Mic, band: 7.0, meta: "3 parts · 11–14 min" },
];

const overallTarget = 7.5;

function useCountUp(target: number, delay = 0, step = 0.5, interval = 90) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    let current = 0;
    const timer = setTimeout(() => {
      id = setInterval(() => {
        current = Math.min(target, current + step);
        setValue(current);
        if (current >= target) clearInterval(id);
      }, interval);
    }, delay);
    return () => {
      clearTimeout(timer);
      clearInterval(id);
    };
  }, [target, delay, step, interval]);
  return value;
}

function ScoreRow({ skill, index }: { skill: typeof skills[number]; index: number }) {
  const value = useCountUp(skill.band, 300 + index * 220);
  const Icon = skill.icon;
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate/20">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-paper">
          <Icon size={16} className="text-navy" strokeWidth={2} />
        </div>
        <span className="text-sm">{skill.label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block w-24 h-1.5 rounded-full overflow-hidden bg-slate/20">
          <div className="h-full rounded-full bg-amber transition-all duration-500" style={{ width: `${(value / 9) * 100}%` }} />
        </div>
        <span className="font-mono text-lg font-semibold tabular-nums w-10 text-right text-navy">{value.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const overall = useCountUp(overallTarget, 1200, 0.5, 90);

  return (
    <div className="selection:bg-amber selection:text-navy">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-block font-mono text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6 bg-white text-slate border border-slate/20">
            Free mock tests · all four skills
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl leading-[1.1] mb-6 text-navy">
            Know your band<br />before test day.
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-md text-slate">
            Timed Listening, Reading, Writing, and Speaking tests scored against the same
            nine-band descriptors examiners use — so your practice score means something.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/practice" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg bg-navy text-white">
              Start a mock test <ArrowRight size={16} />
            </Link>
            <a href="#scoring" className="inline-flex items-center gap-2 font-medium px-6 py-3 rounded-lg border border-slate/20 text-navy">
              See how scoring works
            </a>
          </div>
          <div className="flex items-center gap-2 mt-8 text-sm text-slate">
            <Check size={16} className="text-green" />
            Calibrated to the official 9-band scale
          </div>
        </div>

        <div className="rounded-2xl p-6 md:p-7 bg-white border border-slate/15 shadow-[0_20px_40px_-20px_rgba(28,43,74,0.25)]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-navy">Test Report</span>
            <span className="font-mono text-xs text-slate">CANDIDATE 048213</span>
          </div>
          {skills.map((s, i) => (
            <ScoreRow skill={s} index={i} key={s.key} />
          ))}
          <div className="flex items-center justify-between pt-5 mt-2">
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-slate">Overall Band</div>
            <span className="font-mono text-5xl font-bold tabular-nums text-amberdeep">{overall.toFixed(1)}</span>
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="mb-10 max-w-lg">
          <h2 className="font-display font-semibold text-2xl md:text-3xl mb-3 text-navy">
            Practice every skill the way it's tested
          </h2>
          <p className="text-slate">Full-length, fully timed, drawn from real exam formats.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {skills.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.key} href={`/practice/${s.key}`} className="rounded-xl p-5 flex flex-col gap-4 bg-white border border-slate/15 hover:border-navy/30 transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-paper">
                  <Icon size={18} className="text-navy" />
                </div>
                <div>
                  <div className="font-display font-semibold mb-1 text-navy">{s.label}</div>
                  <div className="font-mono text-xs text-slate">{s.meta}</div>
                </div>
                <span className="text-sm font-medium inline-flex items-center gap-1 mt-auto text-amberdeep">
                  Practice {s.label} <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Band scale */}
      <section id="scoring" className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <h2 className="font-display font-semibold text-2xl md:text-3xl mb-8 text-navy">The scale you're chasing</h2>
        <div className="rounded-xl p-6 md:p-8 bg-white border border-slate/15">
          <div className="flex items-end justify-between gap-1 md:gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} className="flex-1 flex flex-col items-center gap-2">
                <div className={`w-full rounded-t-sm ${n >= 7 ? "bg-amber" : "bg-slate/20"}`} style={{ height: `${18 + n * 8}px` }} />
                <span className="font-mono text-xs font-semibold text-navy">{n}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-sm text-slate">
            <div><span className="font-semibold text-navy">Band 5</span> — Modest user</div>
            <div><span className="font-semibold text-navy">Band 6.5</span> — Most university entry</div>
            <div><span className="font-semibold text-navy">Band 7</span> — Good user</div>
            <div><span className="font-semibold text-navy">Band 9</span> — Expert user</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", t: "Take a timed test", d: "Same section lengths and question types as the real exam." },
            { n: "02", t: "Get scored on the spot", d: "Reading and Listening auto-score. Writing and Speaking get AI band feedback in minutes." },
            { n: "03", t: "Track your trend", d: "Every attempt joins your band history, by skill, over time." },
          ].map((step) => (
            <div key={step.n}>
              <div className="font-mono text-sm font-semibold mb-3 text-amberdeep">{step.n}</div>
              <div className="font-display font-semibold text-lg mb-2 text-navy">{step.t}</div>
              <p className="text-sm text-slate">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="rounded-xl p-8 md:p-10 bg-navy flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-semibold text-2xl text-white mb-2">Start free. Upgrade when it counts.</h2>
            <p className="text-[#B9C2D6] text-sm">3 free tests a month, or go unlimited with AI Writing & Speaking feedback.</p>
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg bg-amber text-navy whitespace-nowrap">
            <TrendingUp size={16} /> See plans
          </Link>
        </div>
      </section>
    </div>
  );
}
