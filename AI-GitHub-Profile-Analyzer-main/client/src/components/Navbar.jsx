import { Github, UserCircle } from 'lucide-react';

const Navbar = () => (
  <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
      <a href="/" className="flex items-center gap-3 font-bold text-slate-100">
        <span className="flex h-7 w-7 items-center justify-center rounded border border-lavender/50 bg-lavender/10 text-lavender">
          <Github size={16} />
        </span>
        AI GitHub Profile Analyzer
      </a>

      <div className="hidden items-center gap-8 text-sm font-semibold text-slate-400 md:flex">
        <a className="transition hover:text-slate-100" href="#dashboard">
          Dashboard
        </a>
        <a className="transition hover:text-slate-100" href="#repositories">
          Repositories
        </a>
        <a className="transition hover:text-slate-100" href="#activity">
          Activity
        </a>
      </div>

      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-lavender/50 hover:text-white"
      >
        <UserCircle size={17} />
        GitHub
      </a>
    </nav>
  </header>
);

export default Navbar;
