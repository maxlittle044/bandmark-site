"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getPromptById } from "@/lib/writingPrompts";

export default function WritingAttemptPage() {
  const { promptId } = useParams<{ promptId: string }>();
  const router = useRouter();
  const { status } = useSession();
  const promptData = getPromptById(promptId);

  const [essay, setEssay] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (status === "unauthenticated") {
    router.push(`/login?next=/writing/${promptId}`);
    return null;
  }
  if (!promptData) {
    return <div className="max-w-2xl mx-auto px-6 py-24 text-center text-slate">Prompt not found.</div>;
  }

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  async function handleSubmit() {
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/writing/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promptId, essayText: essay }),
    });
    const data = await res.json();
    if (res.ok) {
      router.push(`/writing/result/${data.submissionId}`);
    } else {
      setError(data.error || "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10 pt-14 pb-24">
      <div className="text-xs font-mono uppercase tracking-widest text-slate mb-2">
        {promptData.taskType === "TASK_1" ? "Writing Task 1" : "Writing Task 2"} · {promptData.minutes} min · min {promptData.minWords} words
      </div>
      <div className="rounded-xl p-5 bg-white border border-slate/15 mb-6">
        <p className="text-sm text-navy leading-relaxed">{promptData.prompt}</p>
      </div>

      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        rows={16}
        placeholder="Write your response here…"
        className="w-full rounded-xl border border-slate/25 bg-white p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-amber"
      />

      <div className="flex items-center justify-between mt-3 mb-6">
        <span className={`text-sm font-mono ${wordCount < promptData.minWords ? "text-slate" : "text-green"}`}>
          {wordCount} / {promptData.minWords} words
        </span>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting || wordCount < 20}
        className="w-full md:w-auto text-sm font-semibold px-8 py-3 rounded-lg bg-amber text-navy disabled:opacity-60"
      >
        {submitting ? "Grading… (takes ~10-20s)" : "Submit for grading"}
      </button>
    </div>
  );
}
