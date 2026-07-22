const LoadingDashboard = () => (
  <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
    <div className="animate-pulse space-y-8">
      <div className="h-64 rounded-3xl bg-white/8" />
      <div className="grid gap-5 md:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-36 rounded-lg bg-white/8" />
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <div className="h-80 rounded-3xl bg-white/8" />
        <div className="h-80 rounded-3xl bg-white/8" />
      </div>
    </div>
  </div>
);

export default LoadingDashboard;
