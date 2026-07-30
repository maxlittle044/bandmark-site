import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?next=/admin");
  if ((session.user as { role?: string }).role !== "ADMIN") redirect("/practice");

  const tests = await prisma.test.findMany({
    orderBy: { title: "asc" },
    include: { _count: { select: { sections: true, attempts: true } } },
  });

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 pt-14 pb-24">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display font-semibold text-3xl text-navy">Admin</h1>
        <Link href="/admin/tests/new" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg bg-amber text-navy">
          <Plus size={16} /> New test
        </Link>
      </div>

      <div className="space-y-3">
        {tests.map((t) => (
          <div key={t.id} className="rounded-lg p-4 bg-white border border-slate/15 flex items-center justify-between">
            <div>
              <div className="font-medium text-navy text-sm">{t.title}</div>
              <div className="text-xs text-slate font-mono">
                {t.skill} · {t._count.sections} sections · {t._count.attempts} attempts
              </div>
            </div>
          </div>
        ))}
        {tests.length === 0 && <p className="text-sm text-slate">No tests yet.</p>}
      </div>
    </div>
  );
}
