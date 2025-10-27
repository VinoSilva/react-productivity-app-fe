// Import libraries
import { useState } from "react";

const useBoolean = (params?: { initialValue?: boolean }) => {
  const [val, setVal] = useState<boolean>(params?.initialValue || false);

  const toggle = () => {
    setVal((prev) => !prev);
  };

  return {
    val,
    toggle,
  };
};

export default useBoolean;
