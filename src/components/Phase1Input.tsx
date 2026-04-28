"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Briefcase, ArrowRight, Loader2 } from "lucide-react";

interface Phase1InputProps {
  jobDescription: string;
  resume: string;
  onJobDescriptionChange: (value: string) => void;
  onResumeChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function Phase1Input({
  jobDescription,
  resume,
  onJobDescriptionChange,
  onResumeChange,
  onSubmit,
  isLoading,
}: Phase1InputProps) {
  const [dragOverJD, setDragOverJD] = useState(false);
  const [dragOverResume, setDragOverResume] = useState(false);
  const [parsingJD, setParsingJD] = useState(false);
  const [parsingResume, setParsingResume] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleFileRead = useCallback(
    async (file: File, setter: (value: string) => void, setParsingState: (v: boolean) => void) => {
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith(".txt")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result;
          if (typeof text === "string") {
            setter(text);
          }
        };
        reader.readAsText(file);
        return;
      }

      setParsingState(true);
      setParseError(null);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/parse-file", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          setParseError(data.error || "Failed to parse file");
          return;
        }
        setter(data.text);
      } catch {
        setParseError("Failed to parse file. Please try pasting the text directly.");
      } finally {
        setParsingState(false);
      }
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, setter: (value: string) => void, setParsingState: (v: boolean) => void) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileRead(file, setter, setParsingState);
      }
    },
    [handleFileRead]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void, setParsingState: (v: boolean) => void) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileRead(file, setter, setParsingState);
      }
    },
    [handleFileRead]
  );

  const canSubmit = jobDescription.trim().length > 50 && resume.trim().length > 50;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Phase 1 — Input Collection
        </h2>
        <p className="mt-2 text-gray-600">
          Provide your job description and resume to get started. Paste the text
          or upload a file.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Description */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Briefcase className="w-4 h-4 text-blue-600" />
            Job Description
          </label>
          <div
            className={`relative border-2 rounded-xl transition-colors ${
              dragOverJD
                ? "border-blue-400 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverJD(true);
            }}
            onDragLeave={() => setDragOverJD(false)}
            onDrop={(e) => {
              setDragOverJD(false);
              handleDrop(e, onJobDescriptionChange, setParsingJD);
            }}
          >
            <textarea
              value={jobDescription}
              onChange={(e) => onJobDescriptionChange(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full h-72 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-sm"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <label className="cursor-pointer flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors bg-white px-2 py-1 rounded-lg border border-gray-200">
                <Upload className="w-3 h-3" />
                Upload
                <input
                  type="file"
                  accept=".txt,.doc,.docx,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileInput(e, onJobDescriptionChange, setParsingJD)}
                />
              </label>
              {parsingJD && <Loader2 className="w-3 h-3 animate-spin text-blue-500" />}
              <span className="text-xs text-gray-400">
                {jobDescription.length} chars
              </span>
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FileText className="w-4 h-4 text-emerald-600" />
            Resume
          </label>
          <div
            className={`relative border-2 rounded-xl transition-colors ${
              dragOverResume
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverResume(true);
            }}
            onDragLeave={() => setDragOverResume(false)}
            onDrop={(e) => {
              setDragOverResume(false);
              handleDrop(e, onResumeChange, setParsingResume);
            }}
          >
            <textarea
              value={resume}
              onChange={(e) => onResumeChange(e.target.value)}
              placeholder="Paste your current resume here..."
              className="w-full h-72 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent text-sm"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <label className="cursor-pointer flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors bg-white px-2 py-1 rounded-lg border border-gray-200">
                <Upload className="w-3 h-3" />
                Upload
                <input
                  type="file"
                  accept=".txt,.doc,.docx,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileInput(e, onResumeChange, setParsingResume)}
                />
              </label>
              {parsingResume && <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />}
              <span className="text-xs text-gray-400">
                {resume.length} chars
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isLoading}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white
            transition-all duration-200
            ${
              canSubmit && !isLoading
                ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-blue-300"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Begin Analysis
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {parseError && (
        <p className="text-center mt-3 text-sm text-red-600">
          {parseError}
        </p>
      )}

      {!canSubmit && (jobDescription.length > 0 || resume.length > 0) && (
        <p className="text-center mt-3 text-sm text-amber-600">
          Both inputs need at least 50 characters to proceed.
        </p>
      )}
    </div>
  );
}
