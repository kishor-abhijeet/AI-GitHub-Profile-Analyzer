const getPrimaryLanguage = (languages) => languages[0]?.name || 'multi-language';

const getSeniority = (stats) => {
  if (stats.activityScore >= 85 || stats.totalStars >= 1000) return 'high-impact';
  if (stats.activityScore >= 65 || stats.totalStars >= 100) return 'experienced';
  if (stats.totalRepositories >= 15) return 'active';
  return 'emerging';
};

export const generateProfileSummary = ({ profile, stats, languages, topRepos }) => {
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
    learningPath
  };
};
