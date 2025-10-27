// store/localStorage.ts
export const loadState = <T>(key: string, fallback: T): T => {
  try {
    const serialized = localStorage.getItem(key);
    if (!serialized) return fallback;
    return JSON.parse(serialized) as T;
  } catch (err) {
    console.error("Could not load state", err);
    return fallback;
  }
};

export const saveState = (key: string, state: unknown) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

export const downloadState = (key: string) => {
  const storedData = localStorage.getItem(key);

  if (storedData) {
    const jsonObject = JSON.parse(storedData);

    const jsonString = JSON.stringify(jsonObject, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json"; // file name
    link.click();

    // Step 5: Cleanup
    URL.revokeObjectURL(url);
  } else {
    console.error("No data found in localStorage for the given key.");
  }
};
