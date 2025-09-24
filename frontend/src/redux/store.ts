import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

function loadFromLocal() {
  try {
    const data = localStorage.getItem("todos");
    if (data === null) {
      return undefined;
    } else {
      return { todo: { todos: JSON.parse(data) } };
    }
  } catch (error) {
    console.error("localstorage parse error", error);
    return undefined;
  }
}

export const store = configureStore({
  preloadedState: loadFromLocal(),
  reducer: {
    todo: todoReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const todos = state.todo.todos;
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("localstorage save error", error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
