import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="font-display font-semibold mb-2 text-navy">Bandmark</div>
          <p className="text-slate max-w-xs">Practice tests for IELTS Academic and General Training.</p>
        </div>
        <div>
          <div className="font-semibold text-navy mb-3">Practice</div>
          <ul className="space-y-2 text-slate">
            <li><Link href="/practice/reading" className="hover:text-navy">Reading</Link></li>
            <li><Link href="/practice/listening" className="hover:text-navy">Listening</Link></li>
            <li><Link href="/practice/writing" className="hover:text-navy">Writing</Link></li>
            <li><Link href="/practice/speaking" className="hover:text-navy">Speaking</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-navy mb-3">Company</div>
          <ul className="space-y-2 text-slate">
            <li><Link href="/about" className="hover:text-navy">About</Link></li>
            <li><Link href="/pricing" className="hover:text-navy">Pricing</Link></li>
            <li><Link href="/contact" className="hover:text-navy">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-navy mb-3">Legal</div>
          <p className="text-xs leading-relaxed text-slate">
            IELTS is a registered trademark of the British Council, IDP Education, and Cambridge
            Assessment English. Bandmark is an independent practice platform and is not affiliated
            with or endorsed by these organizations.
          </p>
        </div>
      </div>
    </footer>
  );
}
