import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-paper/90 border-b border-slate/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center bg-navy">
            <span className="font-mono text-xs font-bold text-amber">9</span>
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-navy">Bandmark</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate">
          <Link href="/practice" className="hover:text-navy">Practice</Link>
          <Link href="/pricing" className="hover:text-navy">Pricing</Link>
          <Link href="/about" className="hover:text-navy">About</Link>
          <Link href="/contact" className="hover:text-navy">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:block text-sm font-medium text-navy">Log in</Link>
          <Link href="/pricing" className="text-sm font-semibold px-4 py-2 rounded-lg bg-amber text-navy">
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
