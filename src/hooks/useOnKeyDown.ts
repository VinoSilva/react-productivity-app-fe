// Import libraries
import { useEffect } from "react";

const useOnKeyDown = ({
  callbackFn,
  keys,
}: {
  callbackFn: (e: KeyboardEvent) => void;
  keys: string[];
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) callbackFn(e);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [callbackFn, keys]);
};

export default useOnKeyDown;
