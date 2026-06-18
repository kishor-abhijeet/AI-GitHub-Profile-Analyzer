import { Bot, CheckCircle2, GraduationCap, TrendingUp } from 'lucide-react';

const SummaryPanel = ({ aiSummary }) => (
  <section className="rounded-3xl border border-mint/20 bg-summary p-7 text-slate-100 shadow-glow sm:p-10">
    <div className="mb-7 flex items-center gap-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/18 text-white">
        <Bot size={22} />
      </span>
      <div>
        <h2 className="text-3xl font-black">AI Profile Summary</h2>
        <p className="mt-1 text-sm font-semibold text-white/70">{aiSummary.headline}</p>
      </div>
    </div>
    <p className="max-w-4xl text-base font-semibold leading-8 text-white/78">{aiSummary.summary}</p>

    <div className="mt-9 grid gap-6 md:grid-cols-3">
      <SummaryList title="Strengths" items={aiSummary.strengths} icon={CheckCircle2} />
      <SummaryList title="Growth" items={aiSummary.growth} icon={TrendingUp} />
      <SummaryList title="Learning Path" items={aiSummary.learningPath} icon={GraduationCap} />
    </div>
  </section>
);

const SummaryList = ({ title, items, icon: Icon }) => (
  <div>
    <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.18em] text-white/80">
      <Icon size={15} />
      {title}
    </h3>
    <ul className="space-y-3 text-sm font-semibold text-white/72">
      {items.map((item) => (
        <li key={item}>- {item}</li>
      ))}
    </ul>
  </div>
);

export default SummaryPanel;
