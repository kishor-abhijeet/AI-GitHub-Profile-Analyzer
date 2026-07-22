import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, accent = 'lavender', helper }) => {
  const accents = {
    lavender: 'bg-lavender/15 text-lavender',
    violet: 'bg-violet/20 text-lavender',
    mint: 'bg-mint/15 text-mint',
    cyan: 'bg-cyan/15 text-cyan'
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-lg border border-white/10 bg-panel p-6 transition hover:border-white/20"
    >
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-md ${accents[accent]}`}>
        <Icon size={21} />
      </div>
      <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-100">{value}</p>
      {helper ? <p className="mt-1 text-xs font-semibold text-slate-500">{helper}</p> : null}
    </motion.article>
  );
};

export default StatCard;
