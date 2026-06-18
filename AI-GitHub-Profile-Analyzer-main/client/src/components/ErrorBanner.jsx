import { AlertTriangle } from 'lucide-react';

const ErrorBanner = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mx-auto -mt-14 mb-12 max-w-4xl px-5 sm:px-8">
      <div className="flex items-start gap-3 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-4 text-sm text-red-100">
        <AlertTriangle className="mt-0.5 shrink-0 text-red-300" size={18} />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorBanner;
