import { createSlice } from "@reduxjs/toolkit";

interface TodoState {}

const initialState: TodoState = {};

export const todoSlice = createSlice({
  name: "",
  initialState,
  reducers: {},
});

export const {} = todoSlice.actions;
export default todoSlice.reducer;
