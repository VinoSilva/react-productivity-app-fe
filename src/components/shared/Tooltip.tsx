// Import libraries
import { useRef, useState, type JSX, type PropsWithChildren } from "react";
import { FaInfo } from "react-icons/fa6";

interface TooltipProps {
  content?: JSX.Element | string | number;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({
  content,
  position = "top",
  children,
}: PropsWithChildren<TooltipProps>) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | undefined>(0);

  const showTooltip = () => {
    timeoutRef.current = window.setTimeout(() => setVisible(true), 150);
  };

  const hideTooltip = () => {
    if (timeoutRef.current !== 0) {
      clearTimeout(timeoutRef.current);
      setVisible(false);
    }
  };

  // Position classes
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
    left: "right-full top-1/2 -translate-y-1/2 mr-1",
    right: "left-full top-1/2 -translate-y-1/2 ml-1",
  };

  if (!content) return null;

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0} // allows keyboard focus
      className="relative inline-block"
    >
      {children ? (
        children
      ) : (
        <div className="min-w-5 min-h-5 rounded-md bg-primary-black flex items-center justify-center">
          <FaInfo className="text-xs text-white" />
        </div>
      )}
      {visible && (
        <div
          className={`absolute ${
            positionClasses[position as keyof typeof positionClasses]
          } 
                bg-gray-900 text-white text-xs px-2 py-1 rounded-md
                whitespace-nowrap shadow-lg z-50 animate-fadeIn`}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${
              position === "top"
                ? "top-full -translate-y-1/2 left-1/2 -translate-x-1/2"
                : position === "bottom"
                ? "bottom-full left-1/2 -translate-x-1/2"
                : position === "left"
                ? "left-full top-1/2 -translate-y-1/2"
                : "right-full top-1/2 -translate-y-1/2"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
