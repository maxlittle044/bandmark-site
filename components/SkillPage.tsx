import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface SkillPageData {
  icon: LucideIcon;
  label: string;
  tagline: string;
  stats: { label: string; value: string }[];
  whatsTested: string[];
  sample: { title: string; body: React.ReactNode };
  tips: string[];
}

export default function SkillPage({ data }: { data: SkillPageData }) {
  const Icon = data.icon;
  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-12">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-slate/15 mb-6">
          <Icon size={22} className="text-navy" />
        </div>
        <h1 className="font-display font-semibold text-3xl md:text-4xl mb-3 text-navy">{data.label}</h1>
        <p className="text-base md:text-lg text-slate max-w-xl mb-8">{data.tagline}</p>
        <div className="flex flex-wrap gap-6">
          {data.stats.map((s) => (
            <div key={s.label}>
              <div className="font-mono text-xl font-semibold text-navy">{s.value}</div>
              <div className="text-xs text-slate">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What's tested */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display font-semibold text-xl mb-5 text-navy">What's tested</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.whatsTested.map((item) => (
            <div key={item} className="rounded-lg px-4 py-3 bg-white border border-slate/15 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Sample */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display font-semibold text-xl mb-5 text-navy">{data.sample.title}</h2>
        <div className="rounded-xl p-6 bg-white border border-slate/15 text-sm leading-relaxed">
          {data.sample.body}
        </div>
      </section>

      {/* Tips */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display font-semibold text-xl mb-5 text-navy">Tips that actually move your band</h2>
        <ul className="space-y-3">
          {data.tips.map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate">
              <span className="font-mono text-amberdeep font-semibold">{String(i + 1).padStart(2, "0")}</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        <div className="rounded-xl p-8 bg-navy flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold text-xl text-white mb-1">Ready to see your {data.label.toLowerCase()} band?</h3>
            <p className="text-[#B9C2D6] text-sm">Free to start — no card required.</p>
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg bg-amber text-navy whitespace-nowrap">
            Get started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
