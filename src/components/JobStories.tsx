import { useEffect, useState } from "react";
import JobDetails, { JobDetailsProps } from "./JobDetails";
import LoadMoreJobs from "./LoadMoreJobs";
import CONSTANTS from "../constants";

const JobStories = () => {
  const [jobStories, setJobStories] = useState<JobDetailsProps[]>([]);
  const [itemIds, setItemIds] = useState<number[] | null>(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (currentPage === 0) fetchCurrentPageJobStories(currentPage);
  }, [currentPage]);

  const fetchCurrentPageJobStories = async (currPage: number) => {
    try {
      setCurrentPage(currPage + 1);
      setFetchingDetails(true);
      let itemsList = itemIds;
      if (itemsList == null) {
        const res = await fetch(CONSTANTS.GET_ALL_JOBS_STORIES);
        itemsList = await res.json();
        setItemIds(itemsList);
      }

      if (itemsList && itemsList.length > 0) {
        const itemIdsForPage = itemsList.slice(
          currPage * CONSTANTS.ITEMS_PER_PAGE,
          currPage * CONSTANTS.ITEMS_PER_PAGE + CONSTANTS.ITEMS_PER_PAGE
        );
        const itemStories = await Promise.all<JobDetailsProps>(
          itemIdsForPage.map((id: number) =>
            fetch(CONSTANTS.GET_JOB_DETAILS + `${id}.json`).then((res) =>
              res.json()
            )
          )
        );
        setJobStories([...jobStories, ...itemStories]);
      }
      setFetchingDetails(false);
    } catch (error) {
      console.log(error);

      setFetchingDetails(false);
    }
  };

  return (
    <div className="my-4">
      {jobStories.length > 0 ? (
        jobStories?.map((job: JobDetailsProps) => <JobDetails {...job} />)
      ) : (
        <div className="my-4 flex flex-1 min-h-screen justify-center items-center">
          <span className="text-3xl text-primary font-bold">Loading...</span>
        </div>
      )}
      <LoadMoreJobs
        isFecthing={fetchingDetails}
        fetchMoreJobs={() => fetchCurrentPageJobStories(currentPage)}
      />
    </div>
  );
};

export default JobStories;
