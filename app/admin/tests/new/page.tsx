"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

interface QuestionForm {
  type: string;
  prompt: string;
  options: string;
  correctAnswer: string;
}
interface SectionForm {
  text: string;
  questions: QuestionForm[];
}

const emptyQuestion = (): QuestionForm => ({ type: "multiple_choice", prompt: "", options: "", correctAnswer: "" });
const emptySection = (): SectionForm => ({ text: "", questions: [emptyQuestion()] });

export default function NewTestPage() {
  const router = useRouter();
  const [skill, setSkill] = useState<"READING" | "LISTENING">("READING");
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [durationMin, setDurationMin] = useState(20);
  const [sections, setSections] = useState<SectionForm[]>([emptySection()]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateSection(i: number, patch: Partial<SectionForm>) {
    setSections((s) => s.map((sec, idx) => (idx === i ? { ...sec, ...patch } : sec)));
  }
  function updateQuestion(sIdx: number, qIdx: number, patch: Partial<QuestionForm>) {
    setSections((s) =>
      s.map((sec, i) =>
        i !== sIdx ? sec : { ...sec, questions: sec.questions.map((q, j) => (j === qIdx ? { ...q, ...patch } : q)) }
      )
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      skill,
      title,
      source: source || null,
      durationMin,
      sections: sections.map((s) => ({
        passageText: skill === "READING" ? s.text : null,
        transcriptText: skill === "LISTENING" ? s.text : null,
        questions: s.questions.map((q) => ({
          type: q.type,
          prompt: q.prompt,
          options: q.type === "multiple_choice" ? q.options.split(",").map((o) => o.trim()).filter(Boolean) : null,
          correctAnswer: q.correctAnswer.split(",").map((a) => a.trim()).filter(Boolean),
        })),
      })),
    };

    const res = await fetch("/api/admin/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-lg border border-slate/25 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber";

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10 pt-14 pb-24">
      <h1 className="font-display font-semibold text-3xl mb-8 text-navy">New test</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-xl p-5 bg-white border border-slate/15 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-navy">Skill</label>
              <select value={skill} onChange={(e) => setSkill(e.target.value as "READING" | "LISTENING")} className={inputClass}>
                <option value="READING">Reading</option>
                <option value="LISTENING">Listening</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-navy">Duration (minutes)</label>
              <input type="number" required min={1} value={durationMin} onChange={(e) => setDurationMin(Number(e.target.value))} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-navy">Title</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Academic Reading Practice — Test 2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-navy">Source (optional)</label>
            <input value={source} onChange={(e) => setSource(e.target.value)} className={inputClass} />
          </div>
        </div>

        {sections.map((section, sIdx) => (
          <div key={sIdx} className="rounded-xl p-5 bg-white border border-slate/15 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-navy">
                {skill === "READING" ? `Passage ${sIdx + 1}` : `Section ${sIdx + 1}`}
              </h2>
              {sections.length > 1 && (
                <button type="button" onClick={() => setSections((s) => s.filter((_, i) => i !== sIdx))} className="text-red-500">
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-navy">
                {skill === "READING" ? "Passage text" : "Transcript text (read aloud via text-to-speech)"}
              </label>
              <textarea rows={6} value={section.text} onChange={(e) => updateSection(sIdx, { text: e.target.value })} className={inputClass} />
            </div>

            <div className="space-y-4">
              {section.questions.map((q, qIdx) => (
                <div key={qIdx} className="rounded-lg p-4 bg-paper border border-slate/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate">Question {qIdx + 1}</span>
                    {section.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => updateSection(sIdx, { questions: section.questions.filter((_, j) => j !== qIdx) })}
                        className="text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <select value={q.type} onChange={(e) => updateQuestion(sIdx, qIdx, { type: e.target.value })} className={inputClass}>
                    <option value="multiple_choice">Multiple choice</option>
                    <option value="true_false_not_given">True / False / Not Given</option>
                    <option value="sentence_completion">Sentence completion</option>
                  </select>
                  <input
                    required placeholder="Question prompt" value={q.prompt}
                    onChange={(e) => updateQuestion(sIdx, qIdx, { prompt: e.target.value })} className={inputClass}
                  />
                  {q.type === "multiple_choice" && (
                    <input
                      placeholder="Options, comma separated" value={q.options}
                      onChange={(e) => updateQuestion(sIdx, qIdx, { options: e.target.value })} className={inputClass}
                    />
                  )}
                  <input
                    required
                    placeholder={q.type === "sentence_completion" ? "Accepted answers, comma separated" : "Correct answer (must match an option exactly)"}
                    value={q.correctAnswer}
                    onChange={(e) => updateQuestion(sIdx, qIdx, { correctAnswer: e.target.value })} className={inputClass}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => updateSection(sIdx, { questions: [...section.questions, emptyQuestion()] })}
                className="inline-flex items-center gap-1 text-sm font-medium text-amberdeep"
              >
                <Plus size={14} /> Add question
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setSections((s) => [...s, emptySection()])}
          className="inline-flex items-center gap-1 text-sm font-semibold text-navy"
        >
          <Plus size={16} /> Add {skill === "READING" ? "passage" : "section"}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={saving} className="w-full text-sm font-semibold px-6 py-3 rounded-lg bg-navy text-white disabled:opacity-60">
          {saving ? "Saving…" : "Create test"}
        </button>
      </form>
    </div>
  );
}
