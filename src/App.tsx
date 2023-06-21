import { useState, useEffect } from "react";
import "./App.css";
import TodoApp from "./TodoApp";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";

interface TodoAppData {
  id: string;
}

function App() {

  const [todoApps, setTodoApps] = useState<TodoAppData[]>(
    JSON.parse(localStorage.getItem("todoApps") || "[]") as TodoAppData[]
  );

  useEffect(() => {
    localStorage.setItem("todoApps", JSON.stringify(todoApps));
  }, [todoApps]);

  const addTodoApp = () => {
    const newTodoApp: TodoAppData = { id: uuidv4() };
    setTodoApps((prevTodoApps) => [...prevTodoApps, newTodoApp]);
  };

  const handleDeleteTodoApp = (todoAppId: string) => {
    setTodoApps((prevTodoApps) =>
      prevTodoApps.filter((todoApp) => todoApp.id !== todoAppId)
    );
  };


  return (
    <AnimatePresence initial={false}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto my-10 max-w-5xl w-[90vw]"
      style={todoApps.length === 0 ? {display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', marginTop: '0px', marginBottom: '0px'}: undefined}
      >
        {todoApps.map((todoApp) => (
          <TodoApp
            key={todoApp.id}
            storageKey={`todos_${todoApp.id}`}
            onDelete={() => handleDeleteTodoApp(todoApp.id)}
          />
        ))}
        {todoApps.length === 0 && <motion.h1 
        initial={{opacity: 0, scale: .5}}
        animate={{opacity: 1, scale: 1}}
        className="flex items-center"
        style={{fontFamily: 'Inter', fontWeight: '800', fontSize: '2rem'}}
        >Add Todo List</motion.h1>}
        <motion.button
          whileTap={{ x: -10 }}
          whileHover={{ scale: 1.05 }}
          className={`bg-amber-200 h-fit`}
          style={{width: todoApps.length === 0 ? '328px': undefined}}
          onClick={addTodoApp}
        >
          <AddIcon
            style={{ width: "100px", height: "161px", color: "#1e293b" }}
          />
        </motion.button>
      </div>
    </AnimatePresence>
  );
}

export default App;
