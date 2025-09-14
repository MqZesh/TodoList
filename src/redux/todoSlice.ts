import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../types";

interface TodoState {
  todos: Todo[];
}
const initialState: TodoState = { todos: [] };

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{
        text: string;
        description: string;
        category: string;
        date: string;
      }>
    ) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload.text,
        description: action.payload.description,
        category: action.payload.category,
        date: action.payload.date,
        completed: false,
      });
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },

    toggleTodo: (
      state,
      action: PayloadAction<{ id: number; forceTrue?: boolean }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        if (action.payload.forceTrue !== undefined) {
          todo.completed = action.payload.forceTrue;
        } else {
          todo.completed = !todo.completed;
        }
      }
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
