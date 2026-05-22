import { Link, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchHero = ({ query, setQuery, onSubmit, loading }) => (
  <section className="mx-auto max-w-4xl px-5 pb-24 pt-20 text-center sm:px-8">
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
      <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.24em] text-mint">
        Developer intelligence dashboard
      </p>
      <h1 className="text-4xl font-black leading-tight text-slate-100 sm:text-6xl">
        Analyze Any GitHub Profile with <span className="text-lavender">Intelligence</span>
      </h1>
      <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
        Gain deep insights into developer patterns, language proficiency, repository impact, and technical momentum.
      </p>
    </motion.div>

    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.55 }}
      onSubmit={onSubmit}
      className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 rounded-lg border border-white/10 bg-panel/65 p-2 shadow-glow sm:flex-row"
    >
      <label className="flex min-h-14 flex-1 items-center gap-3 rounded-md border border-white/5 bg-ink/60 px-4 text-left">
        <Link size={18} className="shrink-0 text-slate-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="https://github.com/username"
          className="w-full bg-transparent text-sm font-semibold text-slate-100 outline-none placeholder:text-slate-500"
          aria-label="GitHub username or profile URL"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-lavender px-7 text-sm font-black text-violet-950 transition hover:bg-violet disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Search size={17} />
        {loading ? 'Analyzing...' : 'Analyze Profile'}
      </button>
    </motion.form>
  </section>
);

export default SearchHero;
