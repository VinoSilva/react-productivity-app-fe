// Import libraries
import { FaPlus } from "react-icons/fa6";
import { type ComponentProps } from "react";
import { nanoid } from "@reduxjs/toolkit";

// Import components
import Button from "@components/shared/Button";
import Modal from "@components/shared/Modal";
import TaskForm from "@components/Task/TaskForm";

// Import hooks
import useBoolean from "@hooks/useBoolean";

// Import redux
import { useAppDispatch, useAppSelector } from "@store/index";
import { addTask } from "@store/slices/taskSlices";

const AddTaskSection = () => {
  const { toggle, val } = useBoolean();

  const dispatch = useAppDispatch();

  const points = useAppSelector((state) => state.tasks.points);

  const onSubmit: ComponentProps<typeof TaskForm>["onSubmit"] = ({
    name,
    points,
    description,
    isDaily,
  }) => {
    dispatch(
      addTask({
        description,
        id: nanoid(),
        isCompleted: false,
        name,
        points,
        isDaily,
      })
    );

    if (val) {
      toggle();
    }
  };

  return (
    <div className="flex justify-end items-center-safe gap-4">
      <p>
        <span className="text-primary-red">{points}</span>{" "}
        {points > 1 ? "Points" : "Point"}{" "}
      </p>
      <Button onClick={toggle}>
        Add Task <FaPlus />
      </Button>
      <Modal title="Add New Task" isOpen={val} onClose={toggle}>
        <TaskForm onSubmit={onSubmit} />
      </Modal>
    </div>
  );
};

export default AddTaskSection;
