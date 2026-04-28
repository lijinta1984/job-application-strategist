"use client";

import { useState, useCallback } from "react";
import { Rocket } from "lucide-react";
import { WorkflowState } from "@/types";
import PhaseIndicator from "@/components/PhaseIndicator";
import Phase1Input from "@/components/Phase1Input";
import Phase2Analysis from "@/components/Phase2Analysis";
import Phase3Resume from "@/components/Phase3Resume";
import Phase4LinkedIn from "@/components/Phase4LinkedIn";
import Phase5ConnectionNote from "@/components/Phase5ConnectionNote";
import Phase6Email from "@/components/Phase6Email";
import Phase7FollowUp from "@/components/Phase7FollowUp";

const INITIAL_STATE: WorkflowState = {
  phase: 1,
  jobDescription: "",
  resume: "",
  companyName: "",
  analysis: null,
  tailoredResume: null,
  linkedInResearch: null,
  connectionNote: null,
  outreachEmail: null,
  followUpEmail: null,
  isLoading: false,
  error: null,
};

export default function Home() {
  const [state, setState] = useState<WorkflowState>(INITIAL_STATE);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  }, []);

  const handlePhase1Submit = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: state.jobDescription,
          resume: state.resume,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setState((prev) => ({
        ...prev,
        analysis: data,
        phase: 2,
        isLoading: false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    }
  }, [state.jobDescription, state.resume, setError]);

  const handlePhase2Proceed = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/tailor-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: state.jobDescription,
          resume: state.resume,
          analysis: state.analysis,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Resume tailoring failed");
      setState((prev) => ({
        ...prev,
        tailoredResume: data,
        phase: 3,
        isLoading: false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Resume tailoring failed");
    }
  }, [state.jobDescription, state.resume, state.analysis, setError]);

  const handlePhase3Proceed = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/research-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: state.jobDescription,
          analysis: state.analysis,
          companyName: state.companyName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "LinkedIn research failed");
      setState((prev) => ({
        ...prev,
        linkedInResearch: data,
        phase: 4,
        isLoading: false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "LinkedIn research failed");
    }
  }, [state.jobDescription, state.analysis, state.companyName, setError]);

  const handlePhase4Proceed = useCallback(async () => {
    if (!state.linkedInResearch) return;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/generate-connection-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recommendedContact: state.linkedInResearch.recommendedContact,
          analysis: state.analysis,
          tailoredResume: state.tailoredResume?.resume,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Connection note generation failed");
      setState((prev) => ({
        ...prev,
        connectionNote: data,
        phase: 5,
        isLoading: false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection note generation failed");
    }
  }, [state.linkedInResearch, state.analysis, state.tailoredResume, setError]);

  const handlePhase5Proceed = useCallback(async () => {
    if (!state.linkedInResearch) return;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recommendedContact: state.linkedInResearch.recommendedContact,
          analysis: state.analysis,
          tailoredResume: state.tailoredResume?.resume,
          jobDescription: state.jobDescription,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Email generation failed");
      setState((prev) => ({
        ...prev,
        outreachEmail: data,
        phase: 6,
        isLoading: false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Email generation failed");
    }
  }, [state.linkedInResearch, state.analysis, state.tailoredResume, state.jobDescription, setError]);

  const handlePhase6Proceed = useCallback(async () => {
    if (!state.linkedInResearch) return;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/generate-followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recommendedContact: state.linkedInResearch.recommendedContact,
          analysis: state.analysis,
          tailoredResume: state.tailoredResume?.resume,
          originalEmail: state.outreachEmail,
          jobDescription: state.jobDescription,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Follow-up generation failed");
      setState((prev) => ({
        ...prev,
        followUpEmail: data,
        phase: 7,
        isLoading: false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Follow-up generation failed");
    }
  }, [state.linkedInResearch, state.analysis, state.tailoredResume, state.outreachEmail, state.jobDescription, setError]);

  const handleRestart = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const handlePhaseClick = useCallback((phase: number) => {
    setState((prev) => ({ ...prev, phase }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Job Application Strategist
            </h1>
            <p className="text-xs text-gray-500">
              AI-powered outreach workflow
            </p>
          </div>
        </div>
      </header>

      {/* Phase Indicator */}
      <PhaseIndicator
        currentPhase={state.phase}
        onPhaseClick={handlePhaseClick}
      />

      {/* Error Banner */}
      {state.error && (
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-red-600 font-medium text-sm flex-1">
              {state.error}
            </span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Phase Content */}
      <main className="pb-16">
        {state.phase === 1 && (
          <Phase1Input
            jobDescription={state.jobDescription}
            resume={state.resume}
            onJobDescriptionChange={(v) =>
              setState((prev) => ({ ...prev, jobDescription: v }))
            }
            onResumeChange={(v) =>
              setState((prev) => ({ ...prev, resume: v }))
            }
            onSubmit={handlePhase1Submit}
            isLoading={state.isLoading}
          />
        )}

        {state.phase === 2 && state.analysis && (
          <Phase2Analysis
            analysis={state.analysis}
            onProceed={handlePhase2Proceed}
            isLoading={state.isLoading}
          />
        )}

        {state.phase === 3 && state.tailoredResume && (
          <Phase3Resume
            tailoredResume={state.tailoredResume}
            companyName={state.companyName}
            onCompanyNameChange={(v) =>
              setState((prev) => ({ ...prev, companyName: v }))
            }
            onProceed={handlePhase3Proceed}
            isLoading={state.isLoading}
          />
        )}

        {state.phase === 4 && state.linkedInResearch && (
          <Phase4LinkedIn
            research={state.linkedInResearch}
            onProceed={handlePhase4Proceed}
            isLoading={state.isLoading}
          />
        )}

        {state.phase === 5 &&
          state.connectionNote &&
          state.linkedInResearch && (
            <Phase5ConnectionNote
              connectionNote={state.connectionNote}
              recommendedContact={state.linkedInResearch.recommendedContact}
              onProceed={handlePhase5Proceed}
              isLoading={state.isLoading}
            />
          )}

        {state.phase === 6 &&
          state.outreachEmail &&
          state.linkedInResearch && (
            <Phase6Email
              email={state.outreachEmail}
              recommendedContact={state.linkedInResearch.recommendedContact}
              onProceed={handlePhase6Proceed}
              isLoading={state.isLoading}
            />
          )}

        {state.phase === 7 &&
          state.followUpEmail &&
          state.linkedInResearch && (
            <Phase7FollowUp
              followUpEmail={state.followUpEmail}
              recommendedContact={state.linkedInResearch.recommendedContact}
              onRestart={handleRestart}
            />
          )}
      </main>
    </div>
  );
}
