"use client";

import { ArrowRight, Star, User, Activity, Link2 } from "lucide-react";
import { LinkedInResearch } from "@/types";

interface Phase4LinkedInProps {
  research: LinkedInResearch;
  onProceed: () => void;
  isLoading: boolean;
}

function ProximityBadge({ level }: { level: string }) {
  const colorMap: Record<string, string> = {
    High: "bg-emerald-100 text-emerald-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorMap[level] || colorMap.Low}`}>
      {level}
    </span>
  );
}

export default function Phase4LinkedIn({
  research,
  onProceed,
  isLoading,
}: Phase4LinkedInProps) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Phase 4 — LinkedIn Decision-Maker Research
        </h2>
        <p className="mt-2 text-gray-600">
          Key contacts identified and ranked by proximity to the hiring decision.
        </p>
      </div>

      <div className="space-y-4">
        {research.contacts.map((contact, i) => {
          const isRecommended =
            contact.name === research.recommendedContact.name;
          return (
            <div
              key={i}
              className={`bg-white rounded-2xl border-2 p-5 transition-all ${
                isRecommended
                  ? "border-blue-400 ring-2 ring-blue-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {isRecommended && (
                      <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
                    )}
                    <h4 className="font-bold text-gray-900">{contact.name}</h4>
                    {isRecommended && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {contact.title} at {contact.company}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    {contact.rationale}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-500">Proximity:</span>
                      <ProximityBadge level={contact.proximityScore} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-500">Activity:</span>
                      <ProximityBadge level={contact.activityLevel} />
                    </div>
                    {contact.sharedConnections && (
                      <div className="flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-500 truncate max-w-[200px]">
                          {contact.sharedConnections}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-200 ml-4">
                  #{i + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {research.recommendationReason && (
        <div className="mt-6 bg-blue-50 rounded-xl border border-blue-200 p-5">
          <h4 className="font-semibold text-blue-800 mb-2">
            Why {research.recommendedContact.name}?
          </h4>
          <p className="text-sm text-blue-700">
            {research.recommendationReason}
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={onProceed}
          disabled={isLoading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Connection Note...
            </>
          ) : (
            <>
              Generate Connection Note
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
