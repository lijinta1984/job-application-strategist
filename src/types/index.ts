export interface AnalysisResult {
  jdAnalysis: {
    roleTitle: string;
    seniorityLevel: string;
    reportingStructure: string;
    hardSkills: string[];
    softSkills: string[];
    companyValues: string[];
    keywords: string[];
    unstatedExpectations: string[];
  };
  resumeAnalysis: {
    currentPositioning: string;
    narrativeArc: string;
    overlappingSkills: string[];
    gaps: string[];
    languageMismatches: string[];
    reframableAchievements: string[];
  };
  rawAnalysis: string;
}

export interface TailoredResume {
  resume: string;
  skillGaps: string[];
}

export interface LinkedInContact {
  name: string;
  title: string;
  company: string;
  rationale: string;
  proximityScore: string;
  activityLevel: string;
  sharedConnections: string;
}

export interface LinkedInResearch {
  contacts: LinkedInContact[];
  recommendedContact: LinkedInContact;
  recommendationReason: string;
  rawResearch: string;
}

export interface ConnectionNote {
  note: string;
  characterCount: number;
}

export interface OutreachEmail {
  subject: string;
  body: string;
}

export interface FollowUpEmail {
  subject: string;
  body: string;
}

export interface WorkflowState {
  phase: number;
  jobDescription: string;
  resume: string;
  companyName: string;
  analysis: AnalysisResult | null;
  tailoredResume: TailoredResume | null;
  linkedInResearch: LinkedInResearch | null;
  connectionNote: ConnectionNote | null;
  outreachEmail: OutreachEmail | null;
  followUpEmail: FollowUpEmail | null;
  isLoading: boolean;
  error: string | null;
}
