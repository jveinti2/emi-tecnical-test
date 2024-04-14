import { createContext, useState, useEffect } from "react";
import db from "../db/db.json";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(
      db.tasks.map((task) => ({
        ...task,
        id: uuidv4(),
      }))
    );
  }, []);

  return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>;
};
