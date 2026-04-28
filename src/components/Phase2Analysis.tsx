"use client";

import { ArrowRight, Brain, Target, AlertTriangle } from "lucide-react";
import { AnalysisResult } from "@/types";

interface Phase2AnalysisProps {
  analysis: AnalysisResult;
  onProceed: () => void;
  isLoading: boolean;
}

function TagList({
  items,
  color,
}: {
  items: string[];
  color: "blue" | "emerald" | "amber" | "purple" | "red" | "gray";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    red: "bg-red-50 text-red-700 border-red-200",
    gray: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`px-3 py-1 rounded-full text-xs font-medium border ${colorMap[color]}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Phase2Analysis({
  analysis,
  onProceed,
  isLoading,
}: Phase2AnalysisProps) {
  const { jdAnalysis, resumeAnalysis } = analysis;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Phase 2 — Deep Analysis
        </h2>
        <p className="mt-2 text-gray-600">
          Comprehensive analysis of the job description and your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JD Analysis */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Job Description Analysis
            </h3>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-1">Role</div>
            <p className="text-gray-900 font-medium">{jdAnalysis.roleTitle}</p>
            <p className="text-sm text-gray-600">
              {jdAnalysis.seniorityLevel} · {jdAnalysis.reportingStructure}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Hard Skills & Tools
            </div>
            <TagList items={jdAnalysis.hardSkills} color="blue" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Soft Skills
            </div>
            <TagList items={jdAnalysis.softSkills} color="purple" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Company Values & Culture
            </div>
            <TagList items={jdAnalysis.companyValues} color="emerald" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Key Keywords
            </div>
            <TagList items={jdAnalysis.keywords} color="amber" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Unstated Expectations
            </div>
            <ul className="space-y-1">
              {jdAnalysis.unstatedExpectations.map((item, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Resume Analysis */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">Resume Analysis</h3>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-1">
              Current Positioning
            </div>
            <p className="text-sm text-gray-700">
              {resumeAnalysis.currentPositioning}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-1">
              Narrative Arc
            </div>
            <p className="text-sm text-gray-700">{resumeAnalysis.narrativeArc}</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Overlapping Skills
            </div>
            <TagList items={resumeAnalysis.overlappingSkills} color="emerald" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Gaps to Address
            </div>
            <TagList items={resumeAnalysis.gaps} color="red" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Language Mismatches
            </div>
            <ul className="space-y-1">
              {resumeAnalysis.languageMismatches.map((item, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">~</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Reframable Achievements
            </div>
            <ul className="space-y-1">
              {resumeAnalysis.reframableAchievements.map((item, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onProceed}
          disabled={isLoading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Tailoring Resume...
            </>
          ) : (
            <>
              Proceed to Resume Tailoring
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
