import { twMerge } from "tailwind-merge";

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      className={twMerge([
        "w-full placeholder-gray-300 font-roboto bg-white  border border-primary-black rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-black focus:border-0",
        className || "",
      ])}
      {...props}
    />
  );
};

export default Input;
