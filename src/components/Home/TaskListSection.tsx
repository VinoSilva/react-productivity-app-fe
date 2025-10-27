// Import libraries
import { useState } from "react";

// Import store
import TaskItem from "@components/Task/TaskItem";

// Import redux
import { removeTask, updateTask } from "@store/slices/taskSlices";

import { useAppDispatch, useAppSelector } from "@store/index";

const TaskListSection = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const [completeTaskAudio] = useState(new Audio("/audio/coin.wav"));

  return (
    <div className="w-full flex flex-col gap-10 items-center">
      {tasks.map(({ name, points, description, id, isCompleted }) => {
        return (
          <TaskItem
            description={description}
            name={name}
            points={points}
            isCompleted={isCompleted}
            onClickDelete={() => {
              dispatch(removeTask(id));
            }}
            key={id}
            onUpdate={(values) => {
              if (isCompleted !== values.isCompleted && values.isCompleted) {
                completeTaskAudio.play();
              }

              dispatch(updateTask({ description, id, ...values }));
            }}
          />
        );
      })}
    </div>
  );
};

export default TaskListSection;
