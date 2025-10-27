// Import libraries
import { useDispatch, useSelector } from "react-redux";

// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { type TasksState } from "./slices/taskSlices";
// import toastsReducer from "./toastSlice";
// import dialogReducer from "./dialogSlice";
import { loadState } from "./localStorage";
import { persistNotesMiddleware } from "./persistMiddleware";

const PERSIST_KEY = "tasks-app";

const preloadedState = {
  tasks: loadState<TasksState>(PERSIST_KEY, { tasks: [], points: 0 }),
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    // toasts: toastsReducer,
    // dialog: dialogReducer,
  },
  preloadedState,
  middleware: (getDefault) => getDefault().concat(persistNotesMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector = useSelector.withTypes<RootState>();
