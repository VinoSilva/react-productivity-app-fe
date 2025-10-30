import { FaPlus } from "react-icons/fa6";
import { type ComponentProps, useCallback } from "react";
import { nanoid } from "@reduxjs/toolkit";

// Import components
import Modal from "@components/shared/Modal";
import TaskForm from "@components/Task/TaskForm";
import IconButton from "@components/shared/IconButton";

// Import hooks
import useBoolean from "@hooks/useBoolean";

import { useAppDispatch, useAppSelector } from "@store/index";
import { addTask } from "@store/slices/taskSlices";

const AddTaskSection = () => {
  const dispatch = useAppDispatch();
  const { val: isModalOpen, toggle: toggleModal } = useBoolean();

  const points = useAppSelector((state) => state.tasks.points);

  const handleCloseModal = useCallback(() => {
    if (isModalOpen) toggleModal();
  }, [isModalOpen, toggleModal]);

  const handleSubmit: ComponentProps<typeof TaskForm>["onSubmit"] = useCallback(
    ({ name, points, description, isDaily }) => {
      dispatch(
        addTask({
          id: nanoid(),
          name,
          points,
          description,
          isDaily,
          isCompleted: false,
        })
      );
      handleCloseModal();
    },
    [dispatch, handleCloseModal]
  );

  const pointsLabel = `${points > 1 ? "Points" : "Point"}`;

  return (
    <div className="flex justify-end items-center-safe gap-4 px-2 pt-4">
      <p className="text-primary-black text-lg font-roboto">
        <span className="text-primary-red">{points}</span> {pointsLabel}
      </p>
      <IconButton
        className="p-2 bg-primary-red border-primary-red text-lg hover:bg-white hover:text-primary-red fixed bottom-10 right-2"
        onClick={toggleModal}
      >
        <FaPlus />
      </IconButton>

      <Modal
        title="Add New Task"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <TaskForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

export default AddTaskSection;
