// Import components
import AddTaskSection from "@components/Home/AddTaskSection";
import TaskListSection from "@components/Home/TaskListSection";
import HeaderSection from "@components/Home/HeaderSection";

// Smooth drag
// Right click to go back to position
// Filter at the top for not completed
// Break word instead of all
// Change from 20 points to 20 points today
// Make pin not get squished when watching in small screen
// Write test for reducer
// Make no outline for the number input (variant)
// Scroll smooth when dragging (Maybe click to select)
// Make add task a floating button (A plus button only)
// Memoize and optimize the list
// Refactor code (Where do points calculation logic go?)

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
