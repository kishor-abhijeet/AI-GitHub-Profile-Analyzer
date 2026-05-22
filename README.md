# AI GitHub Profile Analyzer

A production-ready MERN dashboard that analyzes public GitHub profiles with profile metrics, repository insights, language analytics, activity scoring, and an AI-style professional summary.

## Stack

- Frontend: React, Tailwind CSS, Axios, Recharts, Framer Motion
- Backend: Node.js, Express.js
- API: GitHub REST API

## Quick Start

```bash
npm run install:all
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Environment

Create `server/.env` from `server/.env.example`.

`GITHUB_TOKEN` is optional, but recommended to increase GitHub API rate limits.

## API

```http
GET /api/github/:username
```

The username can also be a GitHub profile URL encoded in the route.

Response:

```json
{
  "profile": {},
  "stats": {},
  "languages": [],
  "topRepos": [],
  "aiSummary": {}
}
```
