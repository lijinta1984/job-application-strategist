import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/anthropic";
import { CONNECTION_NOTE_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { recommendedContact, analysis, tailoredResume } = await request.json();

    if (!recommendedContact || !analysis) {
      return NextResponse.json(
        { error: "Recommended contact and analysis are required" },
        { status: 400 }
      );
    }

    const userMessage = `## RECOMMENDED CONTACT\n\nName: ${recommendedContact.name}\nTitle: ${recommendedContact.title}\nCompany: ${recommendedContact.company}\nRationale: ${recommendedContact.rationale}\n\n## ROLE ANALYSIS\n\n${JSON.stringify(analysis.jdAnalysis, null, 2)}\n\n## CANDIDATE BACKGROUND\n\n${tailoredResume ? tailoredResume.substring(0, 1000) : JSON.stringify(analysis.resumeAnalysis, null, 2)}\n\nWrite a LinkedIn connection request note for this contact. Remember: MAX 300 characters.`;
    const response = await callClaude(CONNECTION_NOTE_SYSTEM_PROMPT, userMessage);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse connection note", raw: response },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Connection note generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
