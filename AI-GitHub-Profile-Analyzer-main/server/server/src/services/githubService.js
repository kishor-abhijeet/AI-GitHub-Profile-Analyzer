import githubClient from './githubClient.js';
import { generateProfileSummary } from './summaryService.js';

const MAX_REPOS = 100;

export const analyzeGithubProfile = async (username) => {
  const [profileResponse, reposResponse] = await Promise.all([
    githubClient.get(`/users/${username}`).catch((error) => {
      if (error.response?.status === 404) {
        const notFound = new Error(`GitHub user "${username}" was not found.`);
        notFound.statusCode = 404;
        throw notFound;
      }
      throw error;
    }),
    githubClient.get(`/users/${username}/repos`, {
      params: {
        per_page: MAX_REPOS,
        sort: 'updated',
        direction: 'desc'
      }
    })
  ]);

  const profile = normalizeProfile(profileResponse.data);
  const repos = reposResponse.data.filter((repo) => !repo.fork);
  const stats = buildStats(profileResponse.data, repos);
  const languages = buildLanguageAnalytics(repos);
  const topRepos = buildTopRepos(repos);
  const aiSummary = generateProfileSummary({ profile, stats, languages, topRepos });

  return {
    profile,
    stats,
    languages,
    topRepos,
    aiSummary
  };
};

const normalizeProfile = (profile) => ({
  login: profile.login,
  name: profile.name,
  avatarUrl: profile.avatar_url,
  htmlUrl: profile.html_url,
  bio: profile.bio,
  company: profile.company,
  blog: profile.blog,
  location: profile.location,
  email: profile.email,
  twitterUsername: profile.twitter_username,
  followers: profile.followers,
  following: profile.following,
  publicRepos: profile.public_repos,
  createdAt: profile.created_at,
  updatedAt: profile.updated_at
});

const buildStats = (profile, repos) => {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languageSet = new Set(repos.map((repo) => repo.language).filter(Boolean));
  const pushedWithinYear = repos.filter((repo) => {
    const pushedAt = new Date(repo.pushed_at).getTime();
    const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
    return pushedAt >= oneYearAgo;
  }).length;

  const accountAgeYears = Math.max(
    1,
    Math.round((Date.now() - new Date(profile.created_at).getTime()) / (365 * 24 * 60 * 60 * 1000))
  );

  const activityScore = Math.min(
    100,
    Math.round(
      profile.followers * 0.08 +
        totalStars * 0.25 +
        totalForks * 0.2 +
        repos.length * 1.5 +
        languageSet.size * 4 +
        pushedWithinYear * 2
    )
  );

  return {
    followers: profile.followers,
    following: profile.following,
    totalRepositories: profile.public_repos,
    analyzedRepositories: repos.length,
    totalStars,
    totalForks,
    topLanguage: getTopLanguage(repos),
    languageCount: languageSet.size,
    accountAgeYears,
    recentlyActiveRepos: pushedWithinYear,
    activityScore
  };
};

const getTopLanguage = (repos) => {
  const counts = repos.reduce((acc, repo) => {
    if (!repo.language) return acc;
    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
};

const buildLanguageAnalytics = (repos) => {
  const totals = repos.reduce((acc, repo) => {
    if (!repo.language) return acc;
    const weight = Math.max(1, repo.size) + repo.stargazers_count * 10 + repo.forks_count * 5;
    acc[repo.language] = (acc[repo.language] || 0) + weight;
    return acc;
  }, {});

  const grandTotal = Object.values(totals).reduce((sum, value) => sum + value, 0) || 1;

  return Object.entries(totals)
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / grandTotal) * 100)
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
};

const buildTopRepos = (repos) =>
  [...repos]
    .sort((a, b) => {
      const aScore = a.stargazers_count * 3 + a.forks_count * 2 + a.watchers_count;
      const bScore = b.stargazers_count * 3 + b.forks_count * 2 + b.watchers_count;
      return bScore - aScore;
    })
    .slice(0, 6)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      htmlUrl: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      topics: repo.topics || [],
      isPrivate: repo.private,
      updatedAt: repo.updated_at
    }));
