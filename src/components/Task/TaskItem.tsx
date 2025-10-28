// Import libraries
import { FaTrash } from "react-icons/fa6";

// Import components
import IconButton from "@components/shared/IconButton";
import Input from "@components/shared/Input";
import Tooltip from "@components/shared/Tooltip";
// import { Checkbox } from "@components/shared/Checkbox";
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
  const elem = (
    <div
      onDoubleClick={() => {
        onUpdate({
          isCompleted: !isCompleted,
          name,
          isDaily,
          points,
        });
      }}
      className={`w-full md:min-w-md md:max-w-md shadow-md shadow-primary-black ${
        isCompleted ? "bg-primary-red" : "bg-white"
      } cursor-pointer rounded-md border p-4 flex flex-col gap-3`}
    >
      <div className="flex justify-between gap-5">
        <div className="flex gap-4 w-full items-center">
          {/* <Input
            onChange={(e) => {
              onUpdate({ isCompleted, name: e.target.value, isDaily, points });
            }}
            value={name}
            placeholder="Task name"
            className="full px-1 py-1"
          /> */}
          <div className="flex gap-2 items-center">
            <Tooltip
              content={isDaily ? "It's a daily task" : "It's not a daily task"}
            >
              <img
                onClick={() => {
                  onUpdate({
                    isCompleted,
                    name,
                    isDaily: !isDaily,
                    points,
                  });
                }}
                src={isDaily ? "/images/pin.png" : "/images/unpin.png"}
                alt="pin icon"
                className="scale-75 cursor-pointer"
              />
            </Tooltip>
            {/* <Tooltip content={"Is it complete?"}>
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
              />
            </Tooltip> */}
          </div>
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
                onChange={(e) => {
                  onUpdate({
                    isCompleted,
                    name,
                    points: parseInt(e.target.value),
                    isDaily,
                  });
                }}
                className="px-1 py-1"
              />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <Confirm
              message="Are you sure you want to delete this task?"
              onConfirm={() => {
                if (onClickDelete) {
                  onClickDelete();
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

  if (!description) return elem;

  return <Tooltip content={description}>{elem}</Tooltip>;
};

export default TaskItem;
