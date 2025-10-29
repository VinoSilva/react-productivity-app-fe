// Import libraries
import { useEffect, useMemo, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";

// Import hooks
import useBoolean from "@hooks/useBoolean";

type Option = {
  label: string | number;
  value: string | number;
  id: string | number;
};

interface OptionProps {
  options: Option[];
  style?: React.CSSProperties;
  value: string | number;
  onChange: (val: string | number) => void;
}

const Select = ({ options, style, onChange, value }: OptionProps) => {
  const { val, toggle } = useBoolean();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && val) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [val, toggle]);

  const label = useMemo(() => {
    const val = options.find((option) => option.value === value);

    return val?.label || "";
  }, [options, value]);

  return (
    <div
      style={style}
      onClick={() => {
        if (!val) {
          toggle();
        }
      }}
      ref={ref}
      className="relative flex justify-between items-center cursor-pointer px-2 py-1 rounded-md border-primary-black border-[0.5px] gap-2"
    >
      <p>{label}</p>
      <FaChevronDown className="text-primary-black" />
      {val ? (
        <div className="absolute top-full rounded-md left-0 w-full bg-white border-[0.5px] z-10 mt-2">
          {options.map(({ label, value, id }) => (
            <div
              key={id}
              onClick={() => {
                onChange(value);
                toggle();
              }}
              className="cursor-pointer hover:bg-primary-red hover:opacity-35  p-2"
            >
              {label}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Select;
