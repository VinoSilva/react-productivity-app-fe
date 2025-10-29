import { useMemo, useRef, useCallback } from "react";
import Button from "@components/shared/Button";
import { clearAllTasks, submitTasks } from "@store/slices/taskSlices";
import { useAppDispatch, useAppSelector } from "@store/index";
import Confirm from "@components/shared/Confirm";

const HeaderSection = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);

  // Persist audio instance — useRef avoids re-renders
  const finishedTasksAudio = useRef(new Audio("/audio/1-up.wav"));

  // Compute total points
  const points = useMemo(
    () =>
      tasks.reduce(
        (sum, task) => sum + (task.isCompleted ? task.points : 0),
        0
      ),
    [tasks]
  );

  // Check if any task is completed
  const hasCompletedTasks = useMemo(
    () => tasks.some((task) => task.isCompleted),
    [tasks]
  );

  // Handlers
  const handleClearAll = useCallback(() => {
    dispatch(clearAllTasks());
  }, [dispatch]);

  const handleSubmitTasks = useCallback(() => {
    const audio = finishedTasksAudio.current;
    audio.currentTime = 0;
    audio.play();
    dispatch(submitTasks());
  }, [dispatch]);

  const pointsLabel = points === 1 ? "Point" : "Points";

  return (
    <div className="flex flex-col items-center w-full">
      <p className="font-roboto text-3xl font-semibold">
        <span className="text-primary-red">{points}</span> {pointsLabel} Today
      </p>

      <div className="flex gap-4 mt-5">
        <Confirm onConfirm={handleClearAll}>
          <Button>Clear All</Button>
        </Confirm>
        <Button
          onClick={handleSubmitTasks}
          disabled={!hasCompletedTasks}
          variant={"primary"}
        >
          Finished For The Day
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
