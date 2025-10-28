// Import libraries
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const input = tv({
  base: "w-full placeholder-gray-300 font-roboto bg-white  border border-primary-black rounded-lg px-3 py-2 outline-none ring-0 disabled:bg-grey",
  variants: {
    variant: {
      primary: "bg-white  border border-primary-black",
      "no-outline": "bg-white border-0",
    },
    sizes: {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary" | "no-outline";
  sizes?: "sm" | "md" | "lg";
};

const Input = ({ className, variant, sizes, ...props }: InputProps) => {
  return (
    <input
      type="text"
      className={twMerge([input({ variant, sizes }), className])}
      {...props}
    />
  );
};

export default Input;
