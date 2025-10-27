import { twMerge } from "tailwind-merge";

const TextArea = ({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={twMerge([
        "w-full border placeholder-gray-300 border-primary-black rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-black focus:border-0",
        className || "",
      ])}
      {...props}
    />
  );
};

export default TextArea;
