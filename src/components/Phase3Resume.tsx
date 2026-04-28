"use client";

import { useState } from "react";
import { ArrowRight, Copy, Check, AlertTriangle, FileText } from "lucide-react";
import { TailoredResume } from "@/types";

interface Phase3ResumeProps {
  tailoredResume: TailoredResume;
  companyName: string;
  onCompanyNameChange: (value: string) => void;
  onProceed: () => void;
  isLoading: boolean;
}

export default function Phase3Resume({
  tailoredResume,
  companyName,
  onCompanyNameChange,
  onProceed,
  isLoading,
}: Phase3ResumeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tailoredResume.resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([tailoredResume.resume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailored-resume.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Phase 3 — Tailored Resume
        </h2>
        <p className="mt-2 text-gray-600">
          Your resume has been rewritten to align with the target role.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Tailored Resume</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Download .txt
            </button>
          </div>
        </div>
        <div className="p-6 max-h-[500px] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
            {tailoredResume.resume}
          </pre>
        </div>
      </div>

      {tailoredResume.skillGaps.length > 0 && (
        <div className="mt-6 bg-amber-50 rounded-xl border border-amber-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h4 className="font-semibold text-amber-800">
              Skill Gaps to Address
            </h4>
          </div>
          <ul className="space-y-2">
            {tailoredResume.skillGaps.map((gap, i) => (
              <li
                key={i}
                className="text-sm text-amber-700 flex items-start gap-2"
              >
                <span className="mt-0.5">-</span>
                {gap}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-3">
          Before we research LinkedIn contacts, what company is this role at?
        </h4>
        <input
          type="text"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          placeholder="e.g., Google, Stripe, Acme Corp..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onProceed}
          disabled={isLoading || !companyName.trim()}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white
            transition-all duration-200
            ${
              !isLoading && companyName.trim()
                ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Researching LinkedIn...
            </>
          ) : (
            <>
              Research LinkedIn Contacts
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
