import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/anthropic";
import { TAILOR_RESUME_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, resume, analysis } = await request.json();

    if (!jobDescription || !resume || !analysis) {
      return NextResponse.json(
        { error: "Job description, resume, and analysis are required" },
        { status: 400 }
      );
    }

    const userMessage = `## JOB DESCRIPTION\n\n${jobDescription}\n\n## ORIGINAL RESUME\n\n${resume}\n\n## ANALYSIS\n\n${JSON.stringify(analysis, null, 2)}\n\nBased on this analysis, rewrite the resume to align with the target role. Follow all rules strictly.`;
    const response = await callClaude(TAILOR_RESUME_SYSTEM_PROMPT, userMessage);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse tailored resume", raw: response },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Resume tailoring failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
