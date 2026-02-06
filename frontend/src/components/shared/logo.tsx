const Logo = () => {
  return (
    <div className="mb-12 flex flex-col items-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-primary/80 mb-4 shadow-lg">
        <svg
          className="w-8 h-8 text-primary-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-primary">JobGeek</h1>
      <p className="text-muted-foreground mt-2">Build careers. Hire smarter.</p>
    </div>
  );
};

export default Logo;
