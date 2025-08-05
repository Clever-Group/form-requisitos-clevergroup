import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import Formulario from "./components/Formulario";

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="flex justify-end p-4">
        {/* <button
          onClick={() => setIsDark(!isDark)}
          className="text-sm bg-primary text-white px-4 py-2 rounded-xl"
        >
          {isDark ? "Modo Claro" : "Modo Escuro"}
        </button> */}
      </div>
      <ToastContainer />
      <Formulario />
    </div>
  );
}
