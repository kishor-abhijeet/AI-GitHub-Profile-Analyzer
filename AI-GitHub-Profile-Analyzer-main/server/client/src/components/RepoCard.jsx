import { ExternalLink, GitFork, Star } from 'lucide-react';
import { formatDate, formatNumber } from '../utils/formatters.js';

const RepoCard = ({ repo }) => (
  <article className="flex h-full flex-col rounded-lg border border-white/10 bg-panel p-6 transition hover:-translate-y-1 hover:border-lavender/40">
    <div className="mb-4 flex items-start justify-between gap-4">
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="text-xl font-black text-slate-100 transition hover:text-lavender"
      >
        {repo.name}
      </a>
      <span className="rounded-full border border-lavender/30 bg-lavender/10 px-3 py-1 font-mono text-[10px] font-black uppercase text-lavender">
        {repo.isPrivate ? 'Private' : 'Public'}
      </span>
    </div>
    <p className="line-clamp-3 min-h-20 flex-1 leading-7 text-slate-400">
      {repo.description || 'No repository description has been provided yet.'}
    </p>
    <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-xs font-bold text-slate-500">
      {repo.language ? <span className="text-mint">{repo.language}</span> : null}
      <span className="inline-flex items-center gap-1">
        <Star size={14} /> {formatNumber(repo.stars)}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitFork size={14} /> {formatNumber(repo.forks)}
      </span>
      <span>Updated {formatDate(repo.updatedAt)}</span>
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      {repo.topics.slice(0, 3).map((topic) => (
        <span key={topic} className="rounded bg-white/8 px-2 py-1 font-mono text-[11px] font-bold text-slate-300">
          {topic}
        </span>
      ))}
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="ml-auto inline-flex items-center gap-1 text-sm font-black text-lavender"
      >
        View <ExternalLink size={14} />
      </a>
    </div>
  </article>
);

export default RepoCard;
