import { type Middleware } from "@reduxjs/toolkit";
import { saveState } from "./localStorage";

export const PERSIST_KEY = "tasks-app";

export const persistNotesMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const result = next(action);

    // after every action, save only tasks slice
    const state = storeAPI.getState();
    saveState(PERSIST_KEY, state.tasks);

    return result;
  };
