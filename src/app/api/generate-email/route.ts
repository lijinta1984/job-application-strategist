import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/anthropic";
import { OUTREACH_EMAIL_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { recommendedContact, analysis, tailoredResume, jobDescription } =
      await request.json();

    if (!recommendedContact || !analysis || !tailoredResume) {
      return NextResponse.json(
        { error: "Contact, analysis, and tailored resume are required" },
        { status: 400 }
      );
    }

    const userMessage = `## RECOMMENDED CONTACT\n\nName: ${recommendedContact.name}\nTitle: ${recommendedContact.title}\nCompany: ${recommendedContact.company}\n\n## JOB DESCRIPTION\n\n${jobDescription}\n\n## JD ANALYSIS\n\n${JSON.stringify(analysis.jdAnalysis, null, 2)}\n\n## TAILORED RESUME\n\n${tailoredResume}\n\nCompose the outreach email. Follow all rules strictly. Plain ASCII only.`;
    const response = await callClaude(OUTREACH_EMAIL_SYSTEM_PROMPT, userMessage);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse email", raw: response },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
