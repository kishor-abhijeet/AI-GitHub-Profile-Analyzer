# AI GitHub Profile Analyzer

A production-ready MERN dashboard that analyzes public GitHub profiles with profile metrics, repository insights, language analytics, activity scoring, and a real Gemini-powered professional summary.

## Stack

- Frontend: React, Tailwind CSS, Axios, Recharts, Framer Motion
- Backend: Node.js, Express.js
- APIs: GitHub REST API, Google Gemini API
- AI model: Gemini 3.5 Flash via `@google/genai`

## Setup

```bash
npm run install:all
```

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
GITHUB_TOKEN=
GEMINI_API_KEY=your_google_ai_studio_key
GEMINI_MODEL=gemini-3.5-flash
```

`GITHUB_TOKEN` is optional, but recommended for higher GitHub API rate limits.

`GEMINI_API_KEY` enables the real AI summary. You can create a free key in Google AI Studio. If the key is missing or Gemini fails, the app automatically uses a rule-based fallback summary so the dashboard still works.

## Run

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## API

```http
GET /api/github/:username
```

Response:

```json
{
  "profile": {},
  "stats": {},
  "languages": [],
  "topRepos": [],
  "aiSummary": {
    "headline": "",
    "summary": "",
    "strengths": [],
    "growth": [],
    "learningPath": [],
    "provider": "Google Gemini",
    "model": "gemini-3.5-flash",
    "isAiGenerated": true
  }
}
```

## Screenshots

<img width="1913" height="1029" alt="image" src="https://github.com/user-attachments/assets/26a5ed34-bd57-43e1-a64f-7ce60c84dc3b" />
<img width="1911" height="1021" alt="image" src="https://github.com/user-attachments/assets/9683a414-b408-4403-a0c1-905451b41f1f" />

