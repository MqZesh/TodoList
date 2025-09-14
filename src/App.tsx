import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "./redux/todoSlice";
import TodoInput from "./comp/TodoInput";
import TodoList from "./comp/TodoList";
import type { Todo } from "./types";
import type { RootState } from "./redux/store";
function App() {
  const allTodos = useSelector((state: RootState) => state.todo.todos);
  const [filterCategory, setFilterCategory] = useState("Tümü");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const dispatch = useDispatch();

  const handleAddTodo = (
    text: string,
    description: string,
    category: string,
    date: string
  ) => {
    dispatch(addTodo({ text, description, category, date }));
    setEditingTodo(null);
  };
  const filteredTodos = allTodos.filter((todo) => {
    if (filterCategory === "Tümü") {
      return true;
    } else {
      return todo.category === filterCategory;
    }
  });
  const handleToggleTodo = (id: number, forceTrue?: boolean) => {
    dispatch(toggleTodo({ id, forceTrue }));
  };
  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    dispatch(removeTodo(todo.id));
  };

  return (
    <div className="relative flex justify-center items-center p-4 h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65 -z-10"
        style={{ backgroundImage: "url('/_0tfsfwcpcqblosmseegz_0.png')" }}
      ></div>

      <div className="flex w-full max-w-4xl h-fill gap-8">
        <div className="flex-1 p-4 rounded-2xl h-full top-4 overflow-y-auto bg-white/50 backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-4">Yeni Görev Ekle</h1>
          <TodoInput addTodo={handleAddTodo} editingTodo={editingTodo} />
        </div>

        <div className="flex-1 p-4 w-full rounded-2xl overflow-y-auto h-[434px] bg-white/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4">Görevler</h2>
          <TodoList
            todos={filteredTodos}
            toggleTodo={handleToggleTodo}
            removeTodo={handleRemoveTodo}
            onEditTodo={handleEditTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
