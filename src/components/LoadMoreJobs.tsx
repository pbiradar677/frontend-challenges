type LoadMoreJobsProps = {
  isFecthing: boolean;
  fetchMoreJobs: () => void;
};
const LoadMoreJobs = ({ isFecthing, fetchMoreJobs }: LoadMoreJobsProps) => {
  return (
    <button
      disabled={isFecthing}
      onClick={fetchMoreJobs}
      className={`${
        !isFecthing ? "bg-primary" : "bg-gray-500"
      } px-4 py-2 rounded-md text-white text-lg font-semibold`}
    >
      {isFecthing ? "Loading jobs" : "Load more jobs"}
    </button>
  );
};
export default LoadMoreJobs;
