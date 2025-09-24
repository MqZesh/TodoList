import React, { useEffect, useState } from "react";
import type { Todo } from "../types";

interface Props {
  addTodo: (
    text: string,
    description: string,
    category: string,
    date: string
  ) => void;
  editingTodo: Todo | null;
}

export default function TodoInput({ addTodo, editingTodo }: Props) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Genel");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setDescription(editingTodo.description);
      setCategory(editingTodo.category);
      setDate(editingTodo.date);
    }
  }, [editingTodo]);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim() || !description.trim()) {
      alert("Lütfen görev başlığı ve açıklamasını doldurunuz !");
      return;
    } else {
      const isConfirmed = window.confirm(
        "Görevi eklemek istediğinizden emin misiniz ?"
      );
      if (isConfirmed) {
        const localTodos = localStorage.getItem("todos");
        const Todos = localTodos ? JSON.parse(localTodos) : [];
        const isDuplicate = Todos.some(
          (Todo: Todo) => Todo.text === text || Todo.description === description
        );
        if (isDuplicate) {
          alert("Bu başlık veya açıklama ile zaten bir görev mevcut !");
          return;
        }
      }
    }
    const finalDate = date || new Date().toISOString().slice(0, 10);
    addTodo(text, description, category, finalDate);
    setText("");
    setDescription("");
    setCategory("Genel");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Görev başlığı ..."
        className="border border-gray-300 p-3 rounded-md backdrop-blur-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Görev açıklaması..."
        className="border border-gray-300 p-3 rounded-md backdrop-blur-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
        rows={3}
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="border border-gray-300 backdrop-blur-3xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition appearance-none px-3 py-3"
      >
        <option value="Genel">Genel</option>
        <option value="İş">İş</option>
        <option value="Kişisel">Kişisel</option>
        <option value="Önemli">Önemli</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        className="border border-gray-300 bg-transparent p-3 backdrop-blur-3xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Ekle
      </button>
    </form>
  );
}
