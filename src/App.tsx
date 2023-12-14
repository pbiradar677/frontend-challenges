import Header from "./components/Header";
import JobStories from "./components/JobStories";

const App = () => {
  return (
    <div className="bg-secondary flex flex-1 flex-col  p-10 md:items-center">
      <Header />
      <JobStories />
    </div>
  );
};

export default App;
