import React, { useState } from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types";

interface Props {
  todos: Todo[];
  toggleTodo: (id: number, forceTrue?: boolean) => void;
  removeTodo: (id: number) => void;
  onEditTodo: (todo: Todo) => void;
}

export default function TodoList({
  todos,
  toggleTodo,
  removeTodo,
  onEditTodo,
}: Props) {
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const handleFilterClick = (filterCat: string) => {
    setActiveFilter(filterCat);
  };

  const categories = ["Tümü", "Genel", "İş", "Kişisel", "Önemli"];

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === "Tümü") {
      return true;
    }
    return todo.category === activeFilter;
  });

  return (
    <>
      <div className="flex justify-between gap-2 mt-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleFilterClick(cat)}
            className={`flex-1 px-3 py-1 text-sm font-semibold rounded-md transition ${
              activeFilter === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            description={todo.description}
            category={todo.category}
            date={todo.date}
            completed={todo.completed}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            onEditTodo={() => onEditTodo(todo)}
          />
        ))}
      </ul>
    </>
  );
}
