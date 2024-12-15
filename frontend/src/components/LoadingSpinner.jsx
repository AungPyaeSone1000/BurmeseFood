const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-300 opacity-80">
      <div className="relative">
        <div className="w-20 h-20 border-emerald-300 border-2 rounded-full" />
        <div className="w-20 h-20 border-emerald-600 border-t-2 animate-spin rounded-full absolute left-0 top-0 "></div>
        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
