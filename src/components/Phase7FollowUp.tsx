"use client";

import { useState } from "react";
import { Copy, Check, Mail, PartyPopper } from "lucide-react";
import { FollowUpEmail, LinkedInContact } from "@/types";

interface Phase7FollowUpProps {
  followUpEmail: FollowUpEmail;
  recommendedContact: LinkedInContact;
  onRestart: () => void;
}

export default function Phase7FollowUp({
  followUpEmail,
  recommendedContact,
  onRestart,
}: Phase7FollowUpProps) {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const handleCopySubject = () => {
    navigator.clipboard.writeText(followUpEmail.subject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(followUpEmail.body);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Phase 7 — Follow-Up Email
        </h2>
        <p className="mt-2 text-gray-600">
          Send this 2 days after your initial email to{" "}
          {recommendedContact.name}.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <Mail className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-gray-900">Follow-Up Email</span>
          <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
            Send after 2 days
          </span>
        </div>

        {/* Subject */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Subject
              </span>
              <p className="text-gray-900 font-medium mt-1">
                {followUpEmail.subject}
              </p>
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
              {followUpEmail.body}
            </pre>
          </div>
        </div>
      </div>

      {/* Completion */}
      <div className="mt-8 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200 p-8 text-center">
        <PartyPopper className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          All Phases Complete
        </h3>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Your job application strategy is ready. You have a tailored resume,
          LinkedIn research, a connection note, an outreach email, and a
          follow-up email. Go get that role.
        </p>
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-xl font-semibold text-blue-600 border-2 border-blue-200 hover:bg-blue-50 transition-colors"
        >
          Start New Application
        </button>
      </div>
    </div>
  );
}
