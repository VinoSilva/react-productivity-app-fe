import React, { useId } from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Optional label text shown to the right of the control.
   * If you want custom label nodes, wrap the component yourself.
   */
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className = "",
  ...rest
}) => {
  const generatedId = useId();
  const inputId = id ?? `custom-checkbox-${generatedId}`;

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {/* Real checkbox for accessibility — hidden but focusable */}
      <input
        id={inputId}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />

      {/* Visible custom circle */}
      <span
        aria-hidden
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-300 transition-colors
          peer-checked:border-primary-red peer-checked:bg-white
          ${disabled ? "pointer-events-none" : ""}`}
      >
        {/* Inner dot that appears when checked */}
        <span
          className={`w-2.5 h-2.5 rounded-full transform transition-transform duration-200  bg-primary-red ${
            checked ? "scale-100" : "scale-0"
          }`}
        />
      </span>

      {/* Optional label text */}
      {label ? (
        <span className="text-sm text-gray-700 peer-disabled:text-gray-400">
          {label}
        </span>
      ) : null}
    </label>
  );
};
