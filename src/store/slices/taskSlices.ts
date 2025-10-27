import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Task = {
  id: string;
  name: string;
  description: string;
  points: number;
  isCompleted: boolean;
};

export type TasksState = {
  tasks: Task[];
  points: number;
};

const initialState: TasksState = {
  tasks: [],
  points: 0,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    clearAllTasks: (state) => {
      state.tasks = [];
    },
    submitTasks: (state) => {
      let points = 0;
      const nonCompletedTasks: Task[] = [];

      state.tasks.forEach((task) => {
        if (task.isCompleted) {
          points += task.points;
        } else {
          nonCompletedTasks.push(task);
        }
      });

      state.tasks = nonCompletedTasks;
      state.points += points;
    },
    updateTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  clearAllTasks,
  submitTasks,
  updateTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
