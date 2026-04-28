"use client";

import { useState } from "react";
import { ArrowRight, Copy, Check, Mail } from "lucide-react";
import { OutreachEmail, LinkedInContact } from "@/types";

interface Phase6EmailProps {
  email: OutreachEmail;
  recommendedContact: LinkedInContact;
  onProceed: () => void;
  isLoading: boolean;
}

export default function Phase6Email({
  email,
  recommendedContact,
  onProceed,
  isLoading,
}: Phase6EmailProps) {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const handleCopySubject = () => {
    navigator.clipboard.writeText(email.subject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(email.body);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Phase 6 — Outreach Email
        </h2>
        <p className="mt-2 text-gray-600">
          First-contact email for {recommendedContact.name}.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <Mail className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-900">Outreach Email</span>
        </div>

        {/* Subject */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Subject
              </span>
              <p className="text-gray-900 font-medium mt-1">{email.subject}</p>
            </div>
            <button
              onClick={handleCopySubject}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {copiedSubject ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Body
            </span>
            <button
              onClick={handleCopyBody}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {copiedBody ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Body
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
              {email.body}
            </pre>
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
              Composing Follow-Up...
            </>
          ) : (
            <>
              Generate Follow-Up Email
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
