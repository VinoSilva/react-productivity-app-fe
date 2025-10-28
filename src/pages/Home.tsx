// Import components
import AddTaskSection from "@components/Home/AddTaskSection";
import TaskListSection from "@components/Home/TaskListSection";
import HeaderSection from "@components/Home/HeaderSection";

const Home = () => {
  return (
    <div className="font-roboto p-4 min-h-screen">
      <AddTaskSection />
      <div className="mt-5">
        <HeaderSection />
      </div>
      <div className="mt-5">
        <TaskListSection />
      </div>
    </div>
  );
};

export default Home;
