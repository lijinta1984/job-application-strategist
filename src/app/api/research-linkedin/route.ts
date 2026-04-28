import { NextRequest, NextResponse } from "next/server";
import { callClaude } from "@/lib/anthropic";
import { LINKEDIN_RESEARCH_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, analysis, companyName } = await request.json();

    if (!jobDescription || !analysis) {
      return NextResponse.json(
        { error: "Job description and analysis are required" },
        { status: 400 }
      );
    }

    const roleTitle = analysis.jdAnalysis?.roleTitle || "the target role";
    const company = companyName || "the target company";

    const userMessage = `## TARGET COMPANY\n${company}\n\n## TARGET ROLE\n${roleTitle}\n\n## JOB DESCRIPTION\n\n${jobDescription}\n\n## ANALYSIS\n\n${JSON.stringify(analysis, null, 2)}\n\nIdentify the best LinkedIn contacts to reach out to for this role at ${company}. Provide realistic suggestions based on typical org structures for this type of role. If you cannot find specific individuals, suggest the types of profiles and titles to search for on LinkedIn.`;
    const response = await callClaude(LINKEDIN_RESEARCH_SYSTEM_PROMPT, userMessage);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse LinkedIn research", raw: response },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...parsed,
      rawResearch: response,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "LinkedIn research failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
