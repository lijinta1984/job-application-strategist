# Job Application Strategist

AI-powered job application workflow that guides you through 7 phases — from analyzing a job description to generating personalized outreach emails.

## Features

### Phase 1 — Input Collection
Paste or upload your job description and resume. Supports drag-and-drop file upload.

### Phase 2 — Deep Analysis
AI analyzes both documents, extracting hard/soft skills, keywords, company values, unstated expectations, skill gaps, and language mismatches.

### Phase 3 — Resume Tailoring
AI rewrites your resume to align with the target role — weaving JD keywords organically, reframing achievements, and maintaining ATS compatibility. Flags skill gaps.

### Phase 4 — LinkedIn Decision-Maker Research
AI identifies 3-5 key contacts at the target company ranked by proximity to the hiring decision, activity level, and shared connections.

### Phase 5 — LinkedIn Connection Note
Generates a 300-character connection request note for the recommended contact — specific, non-transactional, and pressure-free.

### Phase 6 — Outreach Email
Composes a first-contact email with a personalized hook, quantified achievements (WHY I MATTER), and a direct argument for fit (WHY I AM THE BEST FIT). Plain ASCII only.

### Phase 7 — Follow-Up Email
Generates a follow-up email with a new angle, additional value, and a reworded low-friction CTA. Designed to send 2 days after the first email.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Anthropic Claude API** (claude-sonnet-4-20250514) for all AI generation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
npm install
```

### Environment Setup

Copy the example env file and add your API key:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your Anthropic API key:

```
ANTHROPIC_API_KEY=your_key_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/           # Phase 2 — Deep analysis
│   │   ├── tailor-resume/     # Phase 3 — Resume tailoring
│   │   ├── research-linkedin/ # Phase 4 — LinkedIn research
│   │   ├── generate-connection-note/ # Phase 5
│   │   ├── generate-email/    # Phase 6 — Outreach email
│   │   └── generate-followup/ # Phase 7 — Follow-up email
│   ├── layout.tsx
│   └── page.tsx               # Main wizard orchestrator
├── components/
│   ├── PhaseIndicator.tsx     # Progress stepper
│   ├── Phase1Input.tsx        # JD + Resume input
│   ├── Phase2Analysis.tsx     # Analysis display
│   ├── Phase3Resume.tsx       # Tailored resume display
│   ├── Phase4LinkedIn.tsx     # Contact cards
│   ├── Phase5ConnectionNote.tsx
│   ├── Phase6Email.tsx
│   └── Phase7FollowUp.tsx
├── lib/
│   ├── anthropic.ts           # Claude API client
│   └── prompts.ts             # System prompts for each phase
└── types/
    └── index.ts               # TypeScript interfaces
```
