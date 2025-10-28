// Import libraries
import { useState } from "react";

// Import store
import TaskItem from "@components/Task/TaskItem";

// Import redux
import { removeTask, updateTask, updateTasks } from "@store/slices/taskSlices";

import { useAppDispatch, useAppSelector } from "@store/index";

const TaskListSection = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const [completeTaskAudio] = useState(new Audio("/audio/coin.wav"));

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggingId === null || draggingId === id) return;

    const newItems = [...tasks];
    const fromIndex = newItems.findIndex((item) => item.id === draggingId);
    const toIndex = newItems.findIndex((item) => item.id === id);

    // Move the dragged item
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);

    dispatch(updateTasks(newItems));
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  return (
    <div className="w-full flex flex-wrap gap-4 items-center">
      {tasks.map(({ name, points, description, id, isCompleted, isDaily }) => {
        return (
          <div
            key={id}
            draggable
            onDragStart={() => handleDragStart(id)}
            onDragOver={(e) => handleDragOver(e, id)}
            onDragEnd={handleDragEnd}
          >
            <TaskItem
              key={id}
              description={description}
              name={name}
              points={points}
              isCompleted={isCompleted}
              onClickDelete={() => {
                dispatch(removeTask(id));
              }}
              isDaily={isDaily}
              onUpdate={(values) => {
                if (isCompleted !== values.isCompleted && values.isCompleted) {
                  completeTaskAudio.play();
                }

                dispatch(updateTask({ description, id, ...values }));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TaskListSection;
