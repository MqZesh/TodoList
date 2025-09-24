import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex justify-center items-center p-4 h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65 -z-10"
        style={{ backgroundImage: "url('/_0tfsfwcpcqblosmseegz_0.png')" }}
      ></div>

      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold">Home Page</h1>
        <div className="flex gap-2 mt-3">
          <button
            className="font-bold cursor-pointer"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            className="font-bold cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
