import { twMerge } from "tailwind-merge";

const IconButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={twMerge([
        "cursor-pointer bg-primary-black text-white rounded-full border border-primary-black hover:bg-white hover:text-primary-black",
        className,
      ])}
    />
  );
};

export default IconButton;
