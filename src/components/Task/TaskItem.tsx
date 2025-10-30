// Import libraries
import { FaTrash } from "react-icons/fa6";
import { MdPushPin, MdOutlinePushPin } from "react-icons/md";
import { memo } from "react";

// Import components
import IconButton from "@components/shared/IconButton";
import Input from "@components/shared/Input";
import Tooltip from "@components/shared/Tooltip";
// import { Checkbox } from "@components/shared/Checkbox";
import Confirm from "@components/shared/Confirm";
import { Checkbox } from "@components/shared/Checkbox";

type TUpdateValue = {
  points: number;
  isCompleted: boolean;
  name: string;
  isDaily: boolean;
};

interface TaskItemProps {
  id: string;
  name: string;
  onClickDelete?: (id: string) => void;
  points: number;
  description: string;
  isCompleted: boolean;
  isDaily: boolean;
  onUpdate: (val: { id: string; values: TUpdateValue }) => void;
}

const TaskItem = ({
  id,
  name,
  points,
  isCompleted,
  description,
  onClickDelete,
  onUpdate,
  isDaily,
}: TaskItemProps) => {
  const handleUpdate = (updates: Partial<TUpdateValue>) => {
    onUpdate({
      id,
      values: {
        name,
        points,
        isCompleted,
        isDaily,
        ...updates,
      },
    });
  };

  return (
    <div
      className={`w-full md:min-w-md md:max-w-md shadow-md shadow-primary-black ${
        isCompleted ? "bg-primary-red" : "bg-white"
      } cursor-pointer rounded-md border p-4 flex flex-col gap-3 relative`}
    >
      <div className="absolute  text-primary-red z-10 ml-5 left-full top-1/2 -translate-y-1/2">
        <Checkbox
          checked={isCompleted}
          onChange={(e) => handleUpdate({ isCompleted: e.target.checked })}
        />
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex gap-4 w-full items-center">
          <div className="flex gap-2 items-center">
            <Tooltip
              content={isDaily ? "It's a daily task" : "It's not a daily task"}
            >
              <span
                onClick={() => handleUpdate({ isDaily: !isDaily })}
                className="cursor-pointer"
              >
                {isDaily ? <MdPushPin /> : <MdOutlinePushPin />}
              </span>
            </Tooltip>
          </div>
          <Tooltip content={description} />
          <p
            className={`w-full break-all wrap-break-word ${
              isCompleted ? "text-white" : "text-primary-black"
            }`}
          >
            {name}
          </p>
          <div className="w-20 ml-4">
            <Tooltip content={"Points"}>
              <Input
                type="number"
                min={1}
                value={points}
                onChange={(e) =>
                  handleUpdate({ points: parseInt(e.target.value) })
                }
                sizes="sm"
                variant="no-outline"
              />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <Confirm
              message="Are you sure you want to delete this task?"
              onConfirm={() => {
                if (onClickDelete) {
                  onClickDelete(id);
                }
              }}
              onCancel={() => console.log("Cancelled")}
            >
              <IconButton className="p-1">
                <FaTrash className="text-xs" />
              </IconButton>
            </Confirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskItem);
