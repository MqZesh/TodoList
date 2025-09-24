import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import type { Todo } from "../types";
import { addTodo, removeTodo, toggleTodo } from "../redux/todoSlice";
import TodoInput from "../comp/TodoInput";
import TodoList from "../comp/TodoList";
import axios from "axios";

export default function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logout = async () => {
    try {
      await axios
        .post(
          `http://localhost:3000/auth/logout`,
          {},
          {
            withCredentials: true,
          }
        )

        .then(() => {
          navigate("/login");
        });
      console.log("logout");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/verify`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          const { user } = response.data;
          setUserName(user.userName);
          setIsAuthenticated(true);
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return;
  }

  return (
    <div className="relative flex justify-center items-center p-4 h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65 -z-10"
        style={{ backgroundImage: "url('/_0tfsfwcpcqblosmseegz_0.png')" }}
      ></div>
      <div
        className="flex right-4 absolute top-4 cursor-pointer "
        onClick={logout}
      >
        <div className="flex text-center items-center  gap-2 text-xl font-semibold p-4 rounded-2xl h-full top-4 overflow-y-auto bg-white/50 backdrop-blur-sm">
          <i className=" text-red-500 ri-logout-box-line"></i>
          <h2 className="text-red-500 ">Çıkış</h2>
        </div>
      </div>
      <div className="flex left-4 cursor-default absolute top-4">
        <div className="flex text-center items-center gap-2 text-xl font-semibold p-4 rounded-2xl h-full top-4 overflow-y-auto bg-white/50 backdrop-blur-sm">
          <i className="ri-brain-line"></i>
          <h2 className="">{userName}</h2>
        </div>
      </div>

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
