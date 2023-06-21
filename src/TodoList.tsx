import React, { useState, useEffect, useRef } from "react";
import { todoType } from "./interfaces/model";
import Checkbox from "@mui/material/Checkbox";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

interface Props {
  todos: todoType;
  taskList: todoType[];
  setTaskList: React.Dispatch<React.SetStateAction<todoType[]>>;
  selectedColor: string;
}

function TodoList({ todos, taskList, setTaskList, selectedColor }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todos.task);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isNewTask, setIsNewTask] = useState(true);

  const handleDeleteClick = () => {
    setTaskList(taskList.filter((item) => item.id !== todos.id));
  };

  const toggleCompletion = (id: number) => {
    const updatedList = taskList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completion: !item.completion,
        };
      }
      return item;
    });
    setTaskList(updatedList);
  };

  const handleUpdateTask = (id: number) => {
    const updatedList = taskList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          task: updatedTask,
        };
      }
      return item;
    });
    updatedTask ? setTaskList(updatedList) : setUpdatedTask(todos.task);
    setIsEditing(false);
    setIsNewTask(false);
  };

  const handleCancelEdit = () => {
    setUpdatedTask(todos.task);
    setIsEditing(false);
    setIsNewTask(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  let style: React.CSSProperties = {
    color: selectedColor !== "#fafaf9" ? "white" : "black",
    textShadow:
      selectedColor !== "#fafaf9" ? "0 1px 2px rgb(0 0 0 / 40%)" : undefined,
  };

  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateTask(todos.id);
          }}
          className="flex justify-between"
        >
          <div className="flex w-full">
            <Checkbox
              size="small"
              color="default"
              checked={todos.completion}
              onChange={() => toggleCompletion(todos.id)}
              id={`todo-${todos.id}`}
              style={{
                color: selectedColor !== "#fafaf9" ? "white" : undefined,
              }}
            />
            <input
              ref={inputRef}
              type="text"
              value={updatedTask}
              onChange={(e) => setUpdatedTask(e.target.value)}
              className="outline-none w-full bg-transparent"
              style={style}
            />
          </div>
          <div className="flex">
            <IconButton type="submit">
              <CheckIcon />
            </IconButton>
            <motion.button
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="opacity-60"
              type="button"
              onClick={handleCancelEdit}
            >
              <CloseIcon />
            </motion.button>
          </div>
        </form>
      ) : (
        <motion.ul
          initial={isNewTask ? { opacity: 0, x: -10, height: 0 } : {}}
          animate={{ opacity: 1, x: 0, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex w-full items-center overflow-hidden">
            <Checkbox
              size="small"
              color="default"
              checked={todos.completion}
              onChange={() => toggleCompletion(todos.id)}
              id={`todo-${todos.id}`}
              style={{
                color: selectedColor !== "#fafaf9" ? "white" : undefined,
              }}
              className={`${todos.completion && "opacity-50"}`}
            />
            <li
              className={`w-full ${
                todos.completion && "line-through opacity-50"
              }`}
              style={style}
            >
              {todos.task}
            </li>
          </div>
          <div className="flex">
            <IconButton
              className={`${
                todos.completion && "pointer-events-none opacity-30"
              }`}
              onClick={() => setIsEditing(true)}
            >
              <EditNoteIcon />
            </IconButton>
            <button className="opacity-70 pb-[2px]" onClick={handleDeleteClick}>
              <Tooltip title="Remove Task" placement="right">
                <DeleteTwoToneIcon />
              </Tooltip>
            </button>
          </div>
        </motion.ul>
      )}
    </div>
  );
}

export default TodoList;
