"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Volume2, Clock } from "lucide-react";

interface Question {
  id: string;
  order: number;
  type: string;
  prompt: string;
  options?: string[] | null;
}
interface Section {
  id: string;
  order: number;
  passageText?: string | null;
  transcriptText?: string | null;
  questions: Question[];
}
interface TestData {
  id: string;
  skill: "READING" | "LISTENING";
  title: string;
  durationMin: number;
  sections: Section[];
}

export default function AttemptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { status } = useSession();

  const [test, setTest] = useState<TestData | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [playedSections, setPlayedSections] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push(`/login?next=/tests/${id}/attempt`);
  }, [status, id, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    (async () => {
      const testRes = await fetch(`/api/tests/${id}`);
      if (!testRes.ok) { setError("Couldn't load this test."); return; }
      const testData: TestData = await testRes.json();
      setTest(testData);
      setSecondsLeft(testData.durationMin * 60);

      const attemptRes = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId: id }),
      });
      const attemptData = await attemptRes.json();
      if (attemptRes.ok) setAttemptId(attemptData.attemptId);
      else setError(attemptData.error || "Couldn't start the attempt.");
    })();
  }, [status, id]);

  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) { handleSubmit(); return; }
    timerRef.current = setInterval(() => setSecondsLeft((s) => (s !== null ? s - 1 : s)), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft === 0]);

  function playSection(section: Section) {
    if (!section.transcriptText || playedSections.has(section.id)) return;
    const utterance = new SpeechSynthesisUtterance(section.transcriptText);
    utterance.rate = 0.98;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setPlayedSections((prev) => new Set(prev).add(section.id));
  }

  async function handleSubmit() {
    if (!attemptId || submitting) return;
    setSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);
    window.speechSynthesis?.cancel();

    const res = await fetch(`/api/attempts/${attemptId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses: answers }),
    });
    if (res.ok) {
      router.push(`/tests/${id}/result/${attemptId}`);
    } else {
      const data = await res.json();
      setError(data.error || "Couldn't submit.");
      setSubmitting(false);
    }
  }

  if (status === "loading" || (!test && !error)) {
    return <div className="max-w-3xl mx-auto px-6 py-24 text-center text-slate">Loading test…</div>;
  }
  if (error) {
    return <div className="max-w-3xl mx-auto px-6 py-24 text-center text-red-600">{error}</div>;
  }
  if (!test) return null;

  const minutes = Math.floor((secondsLeft ?? 0) / 60);
  const seconds = (secondsLeft ?? 0) % 60;
  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = test.sections.flatMap((s) => s.questions).length;

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 pb-24">
      <div className="sticky top-16 z-10 bg-paper/95 backdrop-blur border-b border-slate/15 py-4 mb-8 flex items-center justify-between">
        <div>
          <div className="font-display font-semibold text-navy">{test.title}</div>
          <div className="text-xs text-slate">{totalAnswered} / {totalQuestions} answered</div>
        </div>
        <div className="flex items-center gap-2 font-mono text-lg font-semibold text-navy">
          <Clock size={18} />
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>

      {test.sections.map((section) => (
        <div key={section.id} className="mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-slate mb-3">
            {test.skill === "READING" ? `Passage ${section.order}` : `Section ${section.order}`}
          </div>

          {test.skill === "READING" && section.passageText && (
            <div className="rounded-xl p-6 bg-white border border-slate/15 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {section.passageText}
            </div>
          )}

          {test.skill === "LISTENING" && (
            <div className="rounded-xl p-6 bg-white border border-slate/15 mb-6 flex items-center justify-between">
              <div>
                <div className="font-medium text-navy text-sm mb-1">Section {section.order} audio</div>
                <p className="text-xs text-slate">Plays once, like the real test. Use headphones if you can.</p>
              </div>
              <button
                onClick={() => playSection(section)}
                disabled={playedSections.has(section.id)}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-navy text-white disabled:opacity-40"
              >
                <Volume2 size={16} /> {playedSections.has(section.id) ? "Played" : "Play audio"}
              </button>
            </div>
          )}

          <div className="space-y-5">
            {section.questions.map((q) => (
              <div key={q.id} className="rounded-lg p-4 bg-white border border-slate/15">
                <p className="text-sm font-medium text-navy mb-3">
                  <span className="font-mono text-slate mr-2">{q.order}.</span>{q.prompt}
                </p>

                {q.type === "multiple_choice" && q.options && (
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                        <input
                          type="radio" name={q.id} value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {q.type === "true_false_not_given" && (
                  <div className="flex gap-4">
                    {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                        <input
                          type="radio" name={q.id} value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {q.type === "sentence_completion" && (
                  <input
                    type="text"
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    className="w-full max-w-xs rounded-lg border border-slate/25 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
                    placeholder="Your answer"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full md:w-auto text-sm font-semibold px-8 py-3 rounded-lg bg-amber text-navy disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit test"}
      </button>
    </div>
  );
}
