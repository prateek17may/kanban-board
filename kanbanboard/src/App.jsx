import { useState } from "react";
import Board from "./components/Board";
import "./index.css";

export default function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <header>
        <h1>Kanban Board</h1>
        <button onClick={toggleTheme}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </header>
      <Board />
    </div>
  );
}
