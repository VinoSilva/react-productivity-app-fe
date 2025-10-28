// Import libraries
import { FaTrash } from "react-icons/fa6";

// Import components
import IconButton from "@components/shared/IconButton";
import Input from "@components/shared/Input";
import Tooltip from "@components/shared/Tooltip";
import { Checkbox } from "@components/shared/Checkbox";
import Confirm from "@components/shared/Confirm";

interface TaskItemProps {
  name: string;
  onClickDelete?: () => void;
  points: number;
  description: string;
  isCompleted: boolean;
  isDaily: boolean;
  onUpdate: (values: {
    points: number;
    isCompleted: boolean;
    name: string;
    isDaily: boolean;
  }) => void;
}

const TaskItem = ({
  name,
  points,
  isCompleted,
  description,
  onClickDelete,
  onUpdate,
  isDaily,
}: TaskItemProps) => {
  return (
    <div
      draggable
      className="w-full md:max-w-md shadow-md shadow-primary-black rounded-md border p-4 flex flex-col gap-3"
    >
      <div className="flex gap-4 justify-between items-start">
        <div className="flex flex-col gap-4">
          <Checkbox
            checked={isCompleted}
            onChange={(e) => {
              onUpdate({
                isCompleted: e.target.checked,
                name,
                isDaily,
                points,
              });
            }}
            label="Complete"
          />
          <Tooltip content={"Is it a daily task"}>
            <Checkbox
              checked={isDaily}
              onChange={(e) => {
                onUpdate({
                  isCompleted,
                  name,
                  isDaily: e.target.checked,
                  points,
                });
              }}
              label="Is it a daily task?"
            />
          </Tooltip>
        </div>
        {description ? <Tooltip content={description} /> : <></>}
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex w-full items-center">
          <Input
            onChange={(e) => {
              onUpdate({ isCompleted, name: e.target.value, isDaily, points });
            }}
            className="w-full"
            value={name}
            placeholder="Task name"
          />
          <div className="w-32 ml-4">
            <Input
              type="number"
              min={1}
              value={points}
              onChange={(e) => {
                onUpdate({
                  isCompleted,
                  name,
                  points: parseInt(e.target.value),
                  isDaily,
                });
              }}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Confirm
            message="Are you sure you want to delete this task?"
            onConfirm={() => {
              if (onClickDelete) {
                onClickDelete();
              }
            }}
            onCancel={() => console.log("Cancelled")}
          >
            <IconButton className="p-2">
              <FaTrash className="text-xs" />
            </IconButton>
          </Confirm>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
