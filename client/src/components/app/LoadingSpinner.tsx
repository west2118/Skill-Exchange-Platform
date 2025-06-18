import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = () => {
  return (
    <div className="w-full min-h-[95vh] flex items-center justify-center">
      <ClipLoader
        color="#22c55e" // Tailwind green-500
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
