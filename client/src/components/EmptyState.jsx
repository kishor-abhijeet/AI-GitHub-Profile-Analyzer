import { Github, Sparkles } from 'lucide-react';

const EmptyState = () => (
  <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
    <div className="rounded-3xl border border-white/10 bg-panel p-8 sm:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-lavender/15 text-lavender">
            <Sparkles size={24} />
          </span>
          <h2 className="text-3xl font-black text-slate-100">Ready for a live GitHub analysis</h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-400">
            Enter a username or profile URL above to generate profile statistics, repository rankings, language analytics,
            activity scoring, and a professional summary from public GitHub data.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-ink/60 p-6">
          <Github className="mb-5 text-mint" size={32} />
          <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Try examples</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {['vercel', 'torvalds', 'gaearon', 'yyx990803'].map((name) => (
              <span key={name} className="rounded-md bg-white/8 px-3 py-2 font-mono text-sm font-bold text-slate-300">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default EmptyState;
