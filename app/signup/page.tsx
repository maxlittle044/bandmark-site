"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (signInResult?.ok) router.push("/practice");
    else router.push("/login");
  }

  return (
    <div className="max-w-md mx-auto px-6 pt-16 pb-24">
      <h1 className="font-display font-semibold text-3xl mb-2 text-navy">Create your account</h1>
      <p className="text-slate mb-8">Free — 3 full tests a month, no card required.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-navy">Name</label>
          <input
            required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate/25 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-navy">Email</label>
          <input
            required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate/25 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-navy">Password</label>
          <input
            required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate/25 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber"
          />
          <p className="text-xs text-slate mt-1">At least 8 characters.</p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit" disabled={loading}
          className="w-full text-sm font-semibold px-6 py-3 rounded-lg bg-navy text-white disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-sm text-slate mt-6">
        Already have an account? <Link href="/login" className="text-navy font-medium">Log in</Link>
      </p>
    </div>
  );
}
