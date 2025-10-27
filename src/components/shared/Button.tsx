import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const button = tv({
  base: "px-4 py-2 font-roboto rounded-lg font-medium focus:outline-none transition flex items-center gap-2 cursor-pointer disabled:bg-grey",
  variants: {
    variant: {
      primary:
        "bg-primary-red border-[1px] border-primary text-white hover:bg-lighter-red",
      secondary:
        "bg-primary-black text-white border-[1px] hover:bg-white hover:text-primary-black",
    },
    size: {
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

const Button = ({ variant, className, size, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge([button({ variant, size }), className])}
      {...props}
    />
  );
};

export default Button;
