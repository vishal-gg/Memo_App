import React, { useEffect, useState, useRef } from "react";
import TodoList from "./TodoList";
import { todoType } from "./interfaces/model";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "@mui/material";
import {motion} from 'framer-motion'

interface Props {
  storageKey: string;
  onDelete: () => void;
}

function TodoApp({ storageKey, onDelete }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const taskRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState(() => {
    const storedColor = localStorage.getItem(`${storageKey}-color`);
    return storedColor || "#fafaf9";
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [title, setTitle] = useState(() => {
    const storedTitle = localStorage.getItem(`${storageKey}-title`);
    return storedTitle || "";
  });
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<todoType[]>(() => {
    const storedTodos = localStorage.getItem(storageKey);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (task) {
      setTask("");
      const newTaskList = [
        ...taskList,
        {
          id: Date.now(),
          task: task,
          completion: false,
        },
      ];
      setTaskList(newTaskList);
    }
  };

  const handleDelete = () => {
    if (deleteConfirmation) {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(`${storageKey}-title`);
      localStorage.removeItem(`${storageKey}-color`);
      onDelete();
    }
    setDeleteConfirmation(true);
  };

  const handleSelectedColor = (color: string) => {
    setSelectedColor(color);
    localStorage.setItem(`${storageKey}-color`, color);
  };

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(taskList));
    localStorage.setItem(`${storageKey}-title`, title);
  }, [storageKey, taskList, title]);

  useEffect(() => {
    !title && titleRef.current?.focus();
  }, []);


  return (
    <motion.div
      initial={{opacity: 0, scale: .5}}
      animate={{opacity: 1, scale: 1}}
      className="relative transition-colors h-fit p-3 drop-shadow-lg"
      style={{ backgroundColor: selectedColor, overflowWrap: "break-word" }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
        onKeyDown={(e) => e.key === "Enter" && taskRef.current?.focus()}
        className={`px-2 focus:outline-none w-[90%] bg-transparent text-xl font-semibold ${
          selectedColor === "#fafaf9" ? undefined : "placeholder-stone-50"
        } ${selectedColor !== '#fafaf9' ? "drop-shadow-md" : undefined}`}
        style={{ color: selectedColor === "#fafaf9" ? "#020617" : "white" }}
      />
      <hr className="my-1" />
      {taskList.map((todos) => (
        <TodoList
          todos={todos}
          key={todos.id}
          taskList={taskList}
          setTaskList={setTaskList}
          selectedColor={selectedColor}
        />
      ))}
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="+ Add task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          ref={taskRef}
          className={`pl-4 my-2 focus:outline-none bg-transparent w-full ${
            selectedColor === "#fafaf9" ? undefined : "placeholder-stone-50"
          } ${selectedColor !== '#fafaf9' ? "drop-shadow-md" : undefined}`}
          style={{ color: selectedColor === "#fafaf9" ? "#020617" : "white" }}
          onKeyDown={(e) => e.key === "Enter" && handleFormSubmit(e)}
        />
        {task && (
          <motion.div
          initial={{scale: .5}}
          animate={{scale: 1}}
          transition={{type: 'tween', duration: .1}}
          >
            <IconButton onClick={handleFormSubmit} type="button">
                <ControlPointIcon />
            </IconButton>
          </motion.div>
        )}
      </div>
      <IconButton
        style={{ position: "absolute", right: 0, top: 1 }}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
      <div className="flex">
        <IconButton aria-label="delete" color="inherit" onClick={handleDelete}>
          {deleteConfirmation ? (
            <CheckIcon />
          ) : (
            <Tooltip title="Delete Card" placement="right">
              <DeleteIcon />
            </Tooltip>
          )}
        </IconButton>
        {deleteConfirmation && (
          <motion.div 
           initial={{opacity: 0, x: -10}}
           animate={{opacity: 1, x: 0}}
          >
            <IconButton
              color="inherit"
              onClick={() => setDeleteConfirmation(false)}
            >
              <CloseIcon />
            </IconButton>
          </motion.div>
        )}
      </div>
      <div className="flex justify-center gap-1">
        <span
          onClick={() => handleSelectedColor("#fb7185")}
          className={`h-5 aspect-[1] bg-rose-500 rounded-full active:scale-[.8] transition-transform cursor-pointer hover:scale-110 ${selectedColor !== '#fafaf9' ? "drop-shadow-md" : undefined}`}
        ></span>
        <span
          onClick={() => handleSelectedColor("#4ade80")}
          className={`h-5 aspect-[1] bg-green-500 rounded-full active:scale-[.8] transition-transform cursor-pointer hover:scale-110 ${selectedColor !== '#fafaf9' ? "drop-shadow-md" : undefined}`}
        ></span>
        <span
          onClick={() => handleSelectedColor("#38bdf8")}
          className={`h-5 aspect-[1] bg-sky-500 rounded-full active:scale-[.8] transition-transform cursor-pointer hover:scale-110 ${selectedColor !== '#fafaf9' ? "drop-shadow-md" : undefined}`}
        ></span>
        <span
          onClick={() => handleSelectedColor("#fbbf24")}
          className={`h-5 aspect-[1] bg-amber-500 rounded-full active:scale-[.8] transition-transform cursor-pointer hover:scale-110 ${selectedColor !== '#fafaf9' ? "drop-shadow-md" : undefined}`}
        ></span>
        <span
          onClick={() => handleSelectedColor("#fafaf9")}
          className={`h-5 aspect-[1] bg-stone-50 rounded-full active:scale-[.8] transition-transform cursor-pointer hover:scale-110 ${selectedColor !== '#fafaf9' ? "drop-shadow-md" : undefined}`}
        ></span>
      </div>
    </motion.div>
  );
}

export default TodoApp;
