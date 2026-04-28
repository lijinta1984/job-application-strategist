import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/anthropic";
import { FOLLOWUP_EMAIL_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const {
      recommendedContact,
      analysis,
      tailoredResume,
      originalEmail,
      jobDescription,
    } = await request.json();

    if (!recommendedContact || !originalEmail) {
      return NextResponse.json(
        { error: "Contact and original email are required" },
        { status: 400 }
      );
    }

    const userMessage = `## RECOMMENDED CONTACT\n\nName: ${recommendedContact.name}\nTitle: ${recommendedContact.title}\nCompany: ${recommendedContact.company}\n\n## ORIGINAL EMAIL\n\nSubject: ${originalEmail.subject}\n\n${originalEmail.body}\n\n## JOB DESCRIPTION\n\n${jobDescription}\n\n## JD ANALYSIS\n\n${JSON.stringify(analysis?.jdAnalysis, null, 2)}\n\n## TAILORED RESUME HIGHLIGHTS\n\n${tailoredResume ? tailoredResume.substring(0, 1500) : "Not available"}\n\nWrite the follow-up email. This should be a new angle, NOT a repeat of the first email. Plain ASCII only.`;
    const response = await callClaude(FOLLOWUP_EMAIL_SYSTEM_PROMPT, userMessage);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse follow-up email", raw: response },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Follow-up generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
