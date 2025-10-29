// Import libraries
import { type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface FormItemProps {
  label?: string;
  error?: string;
  className?: string;
  showError?: boolean;
}

const FormItem = ({
  children,
  error,
  label,
  className,
  showError = true,
}: PropsWithChildren<FormItemProps>) => {
  return (
    <div className={twMerge(["flex flex-col ", className || ""])}>
      {label && (
        <label className="text-sm font-lora font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className={"relative"}>{children}</div>

      <p
        style={{ display: showError ? "initial" : "none" }}
        className="text-sm text-red-500 h-4"
      >
        {error}
      </p>
    </div>
  );
};

export default FormItem;
