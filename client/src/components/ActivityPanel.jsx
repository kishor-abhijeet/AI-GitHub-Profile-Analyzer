import { Clock3, Flame, GitCommitHorizontal } from 'lucide-react';
import { scoreGrade } from '../utils/formatters.js';

const ActivityPanel = ({ stats }) => {
  const activeBlocks = Math.max(1, Math.round(stats.activityScore / 8));
  const blocks = Array.from({ length: 52 }, (_, index) => index < activeBlocks);

  return (
    <section id="activity" className="rounded-3xl border border-white/10 bg-panel p-7 sm:p-9">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="text-2xl font-black text-slate-100">Contribution Activity</h2>
          <p className="mt-3 font-mono text-sm font-bold text-slate-400">
            {stats.recentlyActiveRepos} repositories updated in the last year
          </p>
          <div className="mt-8 grid grid-cols-13 gap-1.5">
            {blocks.map((active, index) => (
              <span
                key={index}
                className={`h-4 rounded-sm ${active ? 'bg-mint/80' : 'bg-white/7'}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="mt-5 flex justify-between font-mono text-xs font-bold text-slate-500">
            <span>Low</span>
            <span>Profile Activity</span>
            <span>High</span>
          </div>
        </div>

        <div className="space-y-5">
          <ActivityMetric icon={Flame} label="Activity Score" value={`${stats.activityScore}/100`} helper={`Grade ${scoreGrade(stats.activityScore)}`} />
          <ActivityMetric icon={GitCommitHorizontal} label="Active Repos" value={stats.recentlyActiveRepos} helper="Updated within 12 months" />
          <ActivityMetric icon={Clock3} label="Account Age" value={`${stats.accountAgeYears} Years`} helper="Public GitHub history" />
        </div>
      </div>
    </section>
  );
};

const ActivityMetric = ({ icon: Icon, label, value, helper }) => (
  <div className="rounded-lg border border-white/10 bg-white/5 p-5">
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint/10 text-mint">
        <Icon size={20} />
      </span>
      <div>
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-black text-slate-100">{value}</p>
      </div>
    </div>
    <p className="mt-3 text-sm font-semibold text-slate-400">{helper}</p>
  </div>
);

export default ActivityPanel;
