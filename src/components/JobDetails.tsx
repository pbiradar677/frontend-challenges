export type JobDetailsProps = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const JobDetails = ({ by, time, title, url }: JobDetailsProps) => {
  let date = new Date(time);
  let formattedDate = date.toLocaleDateString();
  let formattedTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return (
    <div className="bg-white rounded-lg p-4 my-4 shadow-lg">
      <h2 className="text-2xl font-bold">
        <a href={url} target="_blank">
          {title}
        </a>
      </h2>
      <div className="flex flex-row mt-1 gap-x-4 flex-wrap">
        <span>By {by}</span>
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};

export default JobDetails;
