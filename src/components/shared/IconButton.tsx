import { twMerge } from "tailwind-merge";

const IconButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={twMerge([
        "cursor-pointer bg-primary-red text-white rounded-full border border-primary-red hover:bg-white hover:text-primary-red",
        className,
      ])}
    />
  );
};

export default IconButton;
