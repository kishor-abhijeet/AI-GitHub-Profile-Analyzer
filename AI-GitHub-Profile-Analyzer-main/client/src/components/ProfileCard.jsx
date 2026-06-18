import { Building2, CalendarDays, Link as LinkIcon, MapPin } from 'lucide-react';
import { formatDate, formatNumber } from '../utils/formatters.js';

const ProfileCard = ({ profile, stats }) => (
  <section className="rounded-3xl border border-white/10 bg-panel p-6 shadow-glow sm:p-10">
    <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-center">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <img
          src={profile.avatarUrl}
          alt={`${profile.login} avatar`}
          className="h-32 w-32 shrink-0 rounded-full border-4 border-slate-700 object-cover"
        />
        <div>
          <h2 className="text-3xl font-black text-slate-100">{profile.name || profile.login}</h2>
          <a
            href={profile.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block font-mono text-sm font-bold text-lavender"
          >
            @{profile.login}
          </a>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            {profile.bio || 'No profile bio is available, so the analysis focuses on repositories and public metrics.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs font-bold text-slate-400">
            {profile.location ? (
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} /> {profile.location}
              </span>
            ) : null}
            {profile.company ? (
              <span className="inline-flex items-center gap-2">
                <Building2 size={14} /> {profile.company}
              </span>
            ) : null}
            {profile.blog ? (
              <a className="inline-flex items-center gap-2 text-lavender" href={profile.blog} target="_blank" rel="noreferrer">
                <LinkIcon size={14} /> Website
              </a>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={14} /> Joined {formatDate(profile.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Metric label="Followers" value={formatNumber(stats.followers)} />
        <Metric label="Following" value={formatNumber(stats.following)} />
        <Metric label="Public Repos" value={formatNumber(stats.totalRepositories)} />
        <Metric label="Account Age" value={`${stats.accountAgeYears}y`} />
      </div>
    </div>
  </section>
);

const Metric = ({ label, value }) => (
  <div className="rounded-lg border border-white/10 bg-white/5 p-5 text-center">
    <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-black text-slate-100">{value}</p>
  </div>
);

export default ProfileCard;
