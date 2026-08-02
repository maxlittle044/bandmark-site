import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPromptById } from "@/lib/writingPrompts";
import { getWritingUsageThisMonth, FREE_MONTHLY_WRITING_LIMIT } from "@/lib/usageLimits";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Log in to submit." }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  const usage = await getWritingUsageThisMonth(userId);
  if (usage >= FREE_MONTHLY_WRITING_LIMIT) {
    return NextResponse.json(
      { error: `You've used your ${FREE_MONTHLY_WRITING_LIMIT} free Writing evaluations this month. Upgrade for unlimited.` },
      { status: 403 }
    );
  }

  const { promptId, essayText } = (await req.json()) as { promptId: string; essayText: string };
  const promptData = getPromptById(promptId);
  if (!promptData) return NextResponse.json({ error: "Unknown prompt" }, { status: 400 });
  if (!essayText || essayText.trim().split(/\s+/).length < 20) {
    return NextResponse.json({ error: "Essay is too short to grade." }, { status: 400 });
  }

  const wordCount = essayText.trim().split(/\s+/).length;

  const gradingPrompt = `You are an expert IELTS Writing examiner. Grade the following ${promptData.taskType === "TASK_1" ? "Task 1" : "Task 2"} response strictly against the official IELTS Writing band descriptors (bands 0-9, in 0.5 increments) for these four criteria: Task Achievement/Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy.

Prompt given to the candidate:
"""
${promptData.prompt}
"""

Candidate's response (${wordCount} words):
"""
${essayText}
"""

Respond with ONLY a JSON object, no markdown formatting, no code fences, no other text, matching exactly this shape:
{
  "taskAchievement": <number>,
  "coherenceCohesion": <number>,
  "lexicalResource": <number>,
  "grammarAccuracy": <number>,
  "overallBand": <number>,
  "feedback": "<2-4 sentences of specific, actionable feedback citing concrete examples from the response>"
}`;

  let graded;
  try {
    const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1000,
        messages: [{ role: "user", content: gradingPrompt }],
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json({ error: "Grading service error. Try again shortly." }, { status: 502 });
    }

    const aiData = await aiRes.json();
    const rawText: string = aiData.content?.[0]?.text ?? "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    graded = JSON.parse(cleaned);
  } catch (err) {
    console.error("Grading parse error:", err);
    return NextResponse.json({ error: "Couldn't parse the grading response. Try again." }, { status: 502 });
  }

  const submission = await prisma.writingSubmission.create({
    data: {
      userId,
      taskType: promptData.taskType,
      promptText: promptData.prompt,
      essayText,
      wordCount,
      score: {
        create: {
          taskAchievement: graded.taskAchievement,
          coherenceCohesion: graded.coherenceCohesion,
          lexicalResource: graded.lexicalResource,
          grammarAccuracy: graded.grammarAccuracy,
          overallBand: graded.overallBand,
          feedback: graded.feedback,
        },
      },
    },
  });

  return NextResponse.json({ submissionId: submission.id }, { status: 201 });
}
