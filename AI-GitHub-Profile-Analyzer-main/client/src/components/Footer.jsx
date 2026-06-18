import { Github } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-white/8 bg-ink px-5 py-12 sm:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 font-bold text-slate-300">
        <Github size={18} className="text-lavender" />
        AI GitHub Analyzer
      </div>
      <p className="font-mono text-xs font-bold">Built with React, Node.js, GitHub API, and AI-style analytics</p>
      <div className="flex gap-6 font-semibold">
        <a href="#dashboard" className="hover:text-slate-200">
          Dashboard
        </a>
        <a href="#repositories" className="hover:text-slate-200">
          Repos
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
