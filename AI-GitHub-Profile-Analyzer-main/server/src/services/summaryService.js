import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

const getPrimaryLanguage = (languages) => languages[0]?.name || 'multi-language';

const getSeniority = (stats) => {
  if (stats.activityScore >= 85 || stats.totalStars >= 1000) return 'high-impact';
  if (stats.activityScore >= 65 || stats.totalStars >= 100) return 'experienced';
  if (stats.totalRepositories >= 15) return 'active';
  return 'emerging';
};

export const generateProfileSummary = async ({ profile, stats, languages, topRepos }) => {
  const fallbackSummary = generateFallbackProfileSummary({ profile, stats, languages, topRepos });

  if (!process.env.GEMINI_API_KEY) {
    return fallbackSummary;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: buildGeminiPrompt({ profile, stats, languages, topRepos }),
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = parseGeminiJson(response.text);

    return {
      headline: parsed.headline || fallbackSummary.headline,
      summary: parsed.summary || fallbackSummary.summary,
      strengths: normalizeList(parsed.strengths, fallbackSummary.strengths),
      growth: normalizeList(parsed.growth, fallbackSummary.growth),
      learningPath: normalizeList(parsed.learningPath, fallbackSummary.learningPath),
      provider: 'Google Gemini',
      model: GEMINI_MODEL,
      isAiGenerated: true
    };
  } catch (error) {
    console.warn(`Gemini summary failed: ${error.message}`);
    return {
      ...fallbackSummary,
      provider: 'Rule-based fallback',
      model: GEMINI_MODEL,
      isAiGenerated: false,
      fallbackReason: 'Gemini summary generation failed.'
    };
  }
};

const generateFallbackProfileSummary = ({ profile, stats, languages, topRepos }) => {
  const primaryLanguage = getPrimaryLanguage(languages);
  const secondaryLanguage = languages[1]?.name;
  const seniority = getSeniority(stats);
  const article = /^[aeiou]/i.test(seniority) ? 'an' : 'a';
  const visibleRepos = topRepos.slice(0, 2).map((repo) => repo.name).join(' and ');

  const strengths = [
    stats.totalStars > 50 ? 'Open-source impact' : 'Public project consistency',
    stats.totalForks > 25 ? 'Reusable project design' : 'Portfolio breadth',
    languages.length > 3 ? 'Polyglot development' : `${primaryLanguage} focus`
  ];

  const growth = [
    stats.totalRepositories < 10 ? 'Publish more production samples' : 'Improve project documentation',
    stats.totalStars < 25 ? 'Add demos and usage examples' : 'Convert popular work into case studies',
    stats.activityScore < 60 ? 'Increase recent contribution cadence' : 'Showcase architecture decisions'
  ];

  const learningPath = [
    secondaryLanguage ? `Deepen ${secondaryLanguage} ecosystem work` : 'Explore a second backend or frontend stack',
    'Add automated testing signals',
    'Document measurable product outcomes'
  ];

  const summary = `${profile.name || profile.login} presents as ${article} ${seniority} developer with a strong ${primaryLanguage} footprint across ${stats.totalRepositories} public repositories. Their portfolio shows ${stats.totalStars} stars, ${stats.totalForks} forks, and a ${stats.activityScore}/100 activity score, suggesting ${stats.activityScore >= 70 ? 'healthy project momentum and visible community value' : 'solid public work with room to amplify recent contribution signals'}. ${visibleRepos ? `Highlighted repositories such as ${visibleRepos} give the profile clear technical anchors.` : 'A few polished flagship repositories would make the profile easier to evaluate quickly.'}`;

  return {
    headline: `${seniority[0].toUpperCase()}${seniority.slice(1)} ${primaryLanguage} Developer`,
    summary,
    strengths,
    growth,
    learningPath,
    provider: 'Rule-based fallback',
    model: null,
    isAiGenerated: false
  };
};

const buildGeminiPrompt = ({ profile, stats, languages, topRepos }) => `
You are a senior technical recruiter and developer profile analyst.
Create a concise professional GitHub profile summary from the public GitHub analytics below.

Return ONLY valid JSON with this exact shape:
{
  "headline": "short professional headline",
  "summary": "90-130 word professional profile summary",
  "strengths": ["3 short strengths"],
  "growth": ["3 short growth suggestions"],
  "learningPath": ["3 short learning path suggestions"]
}

Rules:
- Be accurate and do not invent employers, degrees, private activity, or technologies not supported by the data.
- Keep the tone polished, recruiter-friendly, and specific.
- Mention measurable signals such as stars, forks, repositories, languages, and activity score where useful.

GitHub profile:
${JSON.stringify(
  {
    login: profile.login,
    name: profile.name,
    bio: profile.bio,
    company: profile.company,
    location: profile.location,
    followers: stats.followers,
    following: stats.following,
    totalRepositories: stats.totalRepositories,
    analyzedRepositories: stats.analyzedRepositories,
    totalStars: stats.totalStars,
    totalForks: stats.totalForks,
    topLanguage: stats.topLanguage,
    languageCount: stats.languageCount,
    activityScore: stats.activityScore,
    languages: languages.map(({ name, percentage }) => ({ name, percentage })),
    topRepos: topRepos.slice(0, 5).map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stars,
      forks: repo.forks,
      topics: repo.topics
    }))
  },
  null,
  2
)}
`;

const parseGeminiJson = (text = '') => {
  const cleaned = text
    .trim()
    .replace(/^```json/i, '')
    .replace(/^```/, '')
    .replace(/```$/, '')
    .trim();

  return JSON.parse(cleaned);
};

const normalizeList = (value, fallback) => {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.map((item) => String(item).trim()).filter(Boolean).slice(0, 3);
  return cleaned.length ? cleaned : fallback;
};

