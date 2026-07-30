import Link from "next/link";
import { Check, TrendingUp } from "lucide-react";

const rows = [
  { label: "Full tests per month", free: "3", premium: "Unlimited" },
  { label: "Instant Reading & Listening scores", free: true, premium: true },
  { label: "Band history dashboard", free: true, premium: true },
  { label: "AI Writing band feedback", free: false, premium: true },
  { label: "AI Speaking band feedback", free: false, premium: true },
  { label: "Examiner-style annotated corrections", free: false, premium: true },
  { label: "Leaderboard access", free: false, premium: true },
];

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes — Premium is month to month with no lock-in. Cancel from your account settings and you'll keep access until the end of the billing period." },
  { q: "Is the AI score the same as my real exam score?", a: "No score outside the real exam is a guarantee. It's calibrated to the same band descriptors examiners use, so it's a fair estimate — treat it as a strong signal, not a certainty." },
  { q: "Do you offer refunds?", a: "If Premium isn't working for you within the first 7 days, contact us and we'll refund it — no questions asked." },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="font-mono text-sm text-navy">{value}</span>;
  return value ? <Check size={18} className="text-green" /> : <span className="text-slate/40">—</span>;
}

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-20">
      <div className="max-w-xl mb-12">
        <h1 className="font-display font-semibold text-3xl md:text-4xl mb-4 text-navy">Start free. Upgrade when it counts.</h1>
        <p className="text-slate text-lg">Most candidates use Free to find their baseline, then switch to Premium in the weeks before their test date.</p>
      </div>

      {/* Comparison table */}
      <div className="rounded-xl overflow-hidden border border-slate/15 mb-6">
        <div className="grid grid-cols-3 bg-white">
          <div className="p-5" />
          <div className="p-5 border-l border-slate/15">
            <div className="font-display font-semibold text-navy">Free</div>
            <div className="font-mono text-xs text-slate mt-1">$0</div>
          </div>
          <div className="p-5 border-l border-slate/15 bg-navy">
            <div className="font-display font-semibold text-white">Premium</div>
            <div className="font-mono text-xs text-amber mt-1">$19 / month</div>
          </div>
        </div>
        {rows.map((row, i) => (
          <div key={row.label} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-paper/60" : "bg-white"}`}>
            <div className="p-4 text-sm text-navy">{row.label}</div>
            <div className="p-4 border-l border-slate/15 flex items-center"><Cell value={row.free} /></div>
            <div className="p-4 border-l border-slate/15 flex items-center"><Cell value={row.premium} /></div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-20">
        <Link href="/contact" className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg border border-navy text-navy">
          Get started free
        </Link>
        <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg bg-amber text-navy">
          <TrendingUp size={16} /> Go Premium
        </Link>
      </div>

      {/* FAQ */}
      <h2 className="font-display font-semibold text-2xl mb-6 text-navy">Questions</h2>
      <div className="space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="border-b border-slate/15 pb-6">
            <div className="font-medium text-navy mb-2">{f.q}</div>
            <p className="text-sm text-slate leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
