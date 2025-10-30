// Import components
import AddTaskSection from "@components/Home/AddTaskSection";
import TaskListSection from "@components/Home/TaskListSection";
import HeaderSection from "@components/Home/HeaderSection";

// Smooth drag
// Right click to go back to position
// Scroll smooth when dragging
// Write test for reducer
// Redesign task form to have proper error spaces
// Write test for Task Form

const Home = () => {
  return (
    <div className="font-roboto md:p-4 min-h-screen" id="scroll-container">
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
