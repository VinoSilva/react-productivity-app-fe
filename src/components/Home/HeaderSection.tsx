// Import libraries
import { useMemo, useState } from "react";

// Import store
import Button from "@components/shared/Button";

// Import redux
import { clearAllTasks, submitTasks } from "@store/slices/taskSlices";

import { useAppDispatch, useAppSelector } from "@store/index";

const HeaderSection = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const [finishedTasksAudio] = useState(new Audio("/audio/1-up.wav"));

  const points = useMemo(() => {
    return tasks.reduce((prev, cur) => {
      return prev + (cur.isCompleted ? cur.points : 0);
    }, 0);
  }, [tasks]);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="font-roboto text-3xl font-semibold">
        <span className="text-primary-red">{points}</span>{" "}
        {points > 1 ? "Points" : "Point"}{" "}
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            dispatch(clearAllTasks());
          }}
        >
          Clear All
        </Button>
        <Button
          onClick={() => {
            finishedTasksAudio.play();
            dispatch(submitTasks());
          }}
        >
          Finished For The Day
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
