// Import libraries
import React, {
  useCallback,
  useMemo,
  useState,
  type ComponentProps,
} from "react";

// Import store
import TaskItem from "@components/Task/TaskItem";

// Import redux
import { removeTask, updateTask, updateTasks } from "@store/slices/taskSlices";
import { useAppDispatch, useAppSelector } from "@store/index";

// Import component
import TaskListFilter, { type FilterFormValues } from "./TaskListFilter";
import { defaultFilterValues } from "./TaskListFilter.constants";

const TaskListSection = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<FilterFormValues>(defaultFilterValues);

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

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter.showDailyTasks && !task.isDaily) return false;

      if (filter.taskType === "complete" && task.isCompleted) return true;
      else if (filter.taskType === "incomplete" && !task.isCompleted)
        return true;

      return true;
    });
  }, [filter, tasks]);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(removeTask(id));
    },
    [dispatch]
  );

  const handleUpdate = useCallback<ComponentProps<typeof TaskItem>["onUpdate"]>(
    ({ id, values }) => {
      if (values.isCompleted) {
        completeTaskAudio.play();
      }

      dispatch(updateTask({ id, ...values }));
    },
    [dispatch, completeTaskAudio]
  );

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-start">
      <TaskListFilter onChangeFilter={setFilter} filter={filter} />
      {filteredTasks.map(
        ({ name, points, description, id, isCompleted, isDaily }) => {
          return (
            <div
              key={id}
              draggable
              onDragStart={() => {
                handleDragStart(id);
              }}
              onDragOver={(e) => {
                handleDragOver(e, id);
              }}
              onDragEnd={handleDragEnd}
              className="w-full flex justify-center"
            >
              <TaskItem
                description={description}
                name={name}
                points={points}
                isCompleted={isCompleted}
                onClickDelete={handleDelete}
                isDaily={isDaily}
                onUpdate={handleUpdate}
                id={id}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default TaskListSection;
