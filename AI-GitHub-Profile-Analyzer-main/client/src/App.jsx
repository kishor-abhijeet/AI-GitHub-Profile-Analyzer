import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Code2, GitFork, Star } from 'lucide-react';
import { analyzeGithubProfile } from './api/githubApi.js';
import ActivityPanel from './components/ActivityPanel.jsx';
import EmptyState from './components/EmptyState.jsx';
import ErrorBanner from './components/ErrorBanner.jsx';
import Footer from './components/Footer.jsx';
import LanguageAnalytics from './components/LanguageAnalytics.jsx';
import LoadingDashboard from './components/LoadingDashboard.jsx';
import Navbar from './components/Navbar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import RepoCard from './components/RepoCard.jsx';
import SearchHero from './components/SearchHero.jsx';
import StatCard from './components/StatCard.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import { formatNumber, scoreGrade } from './utils/formatters.js';

const App = () => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const stats = analysis?.stats;

  const statCards = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: 'Total Stars',
        value: formatNumber(stats.totalStars),
        icon: Star,
        accent: 'lavender',
        helper: 'Across analyzed repos'
      },
      {
        label: 'Total Forks',
        value: formatNumber(stats.totalForks),
        icon: GitFork,
        accent: 'violet',
        helper: 'Community reuse'
      },
      {
        label: 'Most Used',
        value: stats.topLanguage,
        icon: Code2,
        accent: 'mint',
        helper: `${stats.languageCount} languages detected`
      },
      {
        label: 'Activity Score',
        value: scoreGrade(stats.activityScore),
        icon: Activity,
        accent: 'cyan',
        helper: `${stats.activityScore}/100 profile signal`
      }
    ];
  }, [stats]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!query.trim()) {
      setError('Enter a GitHub username or profile URL to analyze.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await analyzeGithubProfile(query.trim());
      setAnalysis(data);
      window.requestAnimationFrame(() => {
        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (requestError) {
      setAnalysis(null);
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          'Unable to analyze this GitHub profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-page" />
      <Navbar />
      <main>
        <SearchHero query={query} setQuery={setQuery} onSubmit={handleSubmit} loading={loading} />
        <ErrorBanner message={error} />
        {loading ? <LoadingDashboard /> : null}
        {!loading && !analysis ? <EmptyState /> : null}
        {!loading && analysis ? (
          <motion.div
            id="dashboard"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-7xl space-y-14 px-5 pb-24 sm:px-8"
          >
            <ProfileCard profile={analysis.profile} stats={analysis.stats} />

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
              <SummaryPanel aiSummary={analysis.aiSummary} />
              <LanguageAnalytics languages={analysis.languages} repoCount={analysis.stats.analyzedRepositories} />
            </section>

            <section id="repositories" className="space-y-7">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-black text-slate-100">Top Repositories</h2>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Ranked by stars, forks, and watcher signals.
                  </p>
                </div>
                <a
                  href={analysis.profile.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-black uppercase tracking-[0.16em] text-lavender"
                >
                  View all {analysis.stats.totalRepositories}
                </a>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {analysis.topRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </section>

            <ActivityPanel stats={analysis.stats} />
          </motion.div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default App;
