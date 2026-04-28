"use client";

import { Check } from "lucide-react";

const PHASES = [
  { num: 1, label: "Input" },
  { num: 2, label: "Analysis" },
  { num: 3, label: "Resume" },
  { num: 4, label: "LinkedIn" },
  { num: 5, label: "Connect" },
  { num: 6, label: "Email" },
  { num: 7, label: "Follow-Up" },
];

interface PhaseIndicatorProps {
  currentPhase: number;
  onPhaseClick: (phase: number) => void;
}

export default function PhaseIndicator({
  currentPhase,
  onPhaseClick,
}: PhaseIndicatorProps) {
  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {PHASES.map((phase, index) => {
          const isCompleted = currentPhase > phase.num;
          const isCurrent = currentPhase === phase.num;
          const isClickable = phase.num < currentPhase;

          return (
            <div key={phase.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onPhaseClick(phase.num)}
                  disabled={!isClickable}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-200
                    ${isCompleted
                      ? "bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600"
                      : isCurrent
                        ? "bg-blue-600 text-white ring-4 ring-blue-200"
                        : "bg-gray-200 text-gray-500 cursor-default"
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : phase.num}
                </button>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCurrent
                      ? "text-blue-600"
                      : isCompleted
                        ? "text-emerald-600"
                        : "text-gray-400"
                  }`}
                >
                  {phase.label}
                </span>
              </div>
              {index < PHASES.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mt-[-1rem] ${
                    currentPhase > phase.num ? "bg-emerald-400" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
