import React from "react";
import type { Todo } from "../types";

interface Props {
  id: number;
  text: string;
  description: string;
  category: string;
  completed: boolean;
  date: string;
  toggleTodo: (id: number, forceTrue?: boolean) => void;
  removeTodo: (id: number) => void;
  onEditTodo: (todo: Todo) => void;
}

export default function TodoItem({
  id,
  text,
  description,
  completed,
  date,
  category,
  toggleTodo,
  removeTodo,
  onEditTodo,
}: Props) {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <li className="flex justify-between p-4 border border-amber-300 backdrop-blur-3xl rounded-2xl relative">
      <div className="flex-1 min-w-0 pr-4">
        <span
          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
            completed ? "bg-gray-400 text-white" : "bg-blue-100 text-blue-600"
          }`}
        >
          {category}
        </span>
        <h3
          className={`text-lg font-semibold mt-1 ${
            completed ? "line-through text-gray-500" : ""
          }`}
        >
          {text}
        </h3>
        <p
          className={`text-sm text-gray-800 mt-1 break-words ${
            completed ? "line-through" : ""
          }`}
        >
          {description}
        </p>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => {
            const isConfirmed = window.confirm(
              "Görevi silmek istediğinizden emin misiniz?"
            );
            if (isConfirmed) {
              removeTodo(id);
            }
          }}
          className="text-red-500 hover:text-red-700 transition"
          aria-label="Görevi sil"
        >
          <i className="ri-close-fill text-2xl"></i>
        </button>

        <button
          onClick={() => {
            if (!completed) {
              const isConfirmed = window.confirm(
                "Görevi tamamladığınızdan emin misiniz?"
              );
              if (isConfirmed) {
                toggleTodo(id, true);
              }
            }
          }}
          className={`text-green-500 hover:text-green-700 transition ${
            completed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={completed}
          aria-label="Görevi tamamla"
        >
          <i className="ri-check-line text-2xl"></i>
        </button>

        <button
          onClick={() => {
            if (!completed) {
              const isConfirmed = window.confirm(
                "Görevi değiştirmek istediğinizden emin misiniz ?"
              );
              if (isConfirmed) {
                onEditTodo({
                  id,
                  text,
                  description,
                  category,
                  date,
                  completed,
                });
              }
            }
          }}
          className={`text-orange-500 hover:text-orange-700 transition`}
          aria-label="Görevi düzenle"
        >
          <i className="ri-refresh-line text-2xl"></i>
        </button>
      </div>

      <p
        className={`absolute bottom-4 right-4 text-xs text-gray-500 ${
          completed ? "line-through" : ""
        }`}
      >
        {formattedDate}
      </p>
    </li>
  );
}
