import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
interface PageProps {
  activatedPage: "login" | "register";
}

export default function LoginPage({ activatedPage }: PageProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/verify`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          navigate("/main");
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate("/main");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("Bilinmeyen bir hata oluştu!");
      }
    }
  };
  return (
    <div className="relative flex justify-center items-center p-4 h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65 -z-10"
        style={{ backgroundImage: "url('/_0tfsfwcpcqblosmseegz_0.png')" }}
      ></div>
      <div className="absolute text-2xl font-bold top-50 text-center">
        TodoList
      </div>
      <div className="flex w-full max-w-sm h-fill gap-8">
        <div className="flex-1 p-6 rounded-2xl h-full top-4 overflow-y-auto bg-white/50 backdrop-blur-sm shadow-lg">
          <div className="flex justify-between mb-6">
            <Link
              to="/login"
              className={`w-1/2 text-center py-2 rounded-l-xl border border-gray-300 transition ${
                activatedPage === "login"
                  ? "bg-gray-200 text-black font-semibold cursor-default"
                  : "bg-white/70 hover:bg-white"
              }`}
            >
              Giriş
            </Link>
            <Link
              to="/register"
              className={`w-1/2 text-center py-2 rounded-r-xl border border-gray-300 transition ${
                activatedPage === "register"
                  ? "bg-blue-500 text-white font-semibold cursor-default"
                  : "bg-white/70 hover:bg-white"
              }`}
            >
              Kayıt
            </Link>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="E-Posta"
              className="p-3 rounded-xl border border-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Şifre"
              className="p-3 rounded-xl border border-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="p-3 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-400 transition text-lg"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
