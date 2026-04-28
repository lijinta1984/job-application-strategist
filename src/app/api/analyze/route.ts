import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/anthropic";
import { ANALYSIS_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, resume } = await request.json();

    if (!jobDescription || !resume) {
      return NextResponse.json(
        { error: "Both job description and resume are required" },
        { status: 400 }
      );
    }

    const userMessage = `## JOB DESCRIPTION\n\n${jobDescription}\n\n## RESUME\n\n${resume}`;
    const response = await callClaude(ANALYSIS_SYSTEM_PROMPT, userMessage);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse analysis response", rawAnalysis: response },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...parsed,
      rawAnalysis: response,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
