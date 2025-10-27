import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

type ConfirmProps = {
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
};

const Confirm: React.FC<ConfirmProps> = ({
  message = "Are you sure?",
  onConfirm,
  onCancel,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{children}</div>

      {open && (
        <div
          className="absolute z-50 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-3
                     animate-fade-in"
        >
          <p className="text-sm text-gray-700 mb-3">{message}</p>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                setOpen(false);
                onCancel?.();
              }}
              size="sm"
              variant="secondary"
            >
              No
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                onConfirm();
              }}
              size="sm"
            >
              Yes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirm;
