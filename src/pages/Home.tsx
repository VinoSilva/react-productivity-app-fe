// Import components
import AddTaskSection from "@components/Home/AddTaskSection";
import TaskListSection from "@components/Home/TaskListSection";
import HeaderSection from "@components/Home/HeaderSection";

// Responsiveness test
// Smooth drag
// Right click to go back to position
// Filter at the top for not completed
// Write test for reducer
// Scroll smooth when dragging (Maybe click to select)
// Make add task a floating button (A plus button only)
// Memoize and optimize the list
// Refactor code (Where do points calculation logic go?)
// Redesign task form to have proper error spaces

const Home = () => {
  return (
    <div className="font-roboto md:p-4 min-h-screen">
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
