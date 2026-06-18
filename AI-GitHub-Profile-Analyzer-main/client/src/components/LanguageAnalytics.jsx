import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#b9a7ff', '#42e985', '#e6a8ff', '#49c7d8', '#ffd166', '#ef476f', '#8ecae6', '#a3e635'];

const LanguageAnalytics = ({ languages, repoCount }) => (
  <section className="rounded-3xl border border-white/10 bg-panel p-7 sm:p-8">
    <h2 className="mb-6 text-xl font-black text-slate-100">Language Analytics</h2>
    <div className="relative mx-auto h-52 max-w-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={languages} dataKey="percentage" nameKey="name" innerRadius={60} outerRadius={82} paddingAngle={4}>
            {languages.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#111a2b',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: '8px',
              color: '#e2e8f0'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-slate-100">{repoCount}</span>
        <span className="font-mono text-xs font-bold uppercase text-slate-500">Repos</span>
      </div>
    </div>

    <div className="mt-6 space-y-4">
      {languages.map((language, index) => (
        <div key={language.name}>
          <div className="mb-2 flex items-center justify-between font-mono text-xs font-bold text-slate-300">
            <span>{language.name}</span>
            <span>{language.percentage}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/8">
            <div
              className="h-full rounded-full"
              style={{ width: `${language.percentage}%`, backgroundColor: COLORS[index % COLORS.length] }}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default LanguageAnalytics;
