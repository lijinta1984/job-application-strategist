"use client";

import { useState } from "react";
import { ArrowRight, Copy, Check, MessageSquare } from "lucide-react";
import { ConnectionNote, LinkedInContact } from "@/types";

interface Phase5ConnectionNoteProps {
  connectionNote: ConnectionNote;
  recommendedContact: LinkedInContact;
  onProceed: () => void;
  isLoading: boolean;
}

export default function Phase5ConnectionNote({
  connectionNote,
  recommendedContact,
  onProceed,
  isLoading,
}: Phase5ConnectionNoteProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(connectionNote.note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOverLimit = connectionNote.characterCount > 300;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Phase 5 — LinkedIn Connection Note
        </h2>
        <p className="mt-2 text-gray-600">
          Connection request note for {recommendedContact.name}.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Connection Note</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-medium ${
                isOverLimit ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {connectionNote.characterCount}/300 characters
            </span>
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
          </div>
        </div>
        <div className="p-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <p className="text-gray-800 text-base leading-relaxed">
              {connectionNote.note}
            </p>
          </div>
        </div>
        {isOverLimit && (
          <div className="px-6 pb-4">
            <p className="text-sm text-red-600">
              Warning: This note exceeds LinkedIn&apos;s 300-character limit. You may
              need to trim it before sending.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h4 className="text-sm font-semibold text-gray-500 mb-2">
          Sending to
        </h4>
        <p className="font-medium text-gray-900">{recommendedContact.name}</p>
        <p className="text-sm text-gray-600">
          {recommendedContact.title} at {recommendedContact.company}
        </p>
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
              Composing Email...
            </>
          ) : (
            <>
              Compose Outreach Email
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
