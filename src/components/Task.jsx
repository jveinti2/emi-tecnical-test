import { useContext } from "react";
import { TaskContext } from "../context/Task";
import Form from "./Form";

export default function Task(task) {
  const { setTasks } = useContext(TaskContext);

  const handleChangeTaskState = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <a
      href="#"
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {task.title}
      </h5>
      <div className="flex items-center mb-4">
        <input
          id={task.id}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={task.completed}
          onChange={() => handleChangeTaskState(task.id)}
        />
        <label
          htmlFor={task.id}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          <span
            className={
              task.completed
                ? `bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300`
                : `bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300`
            }
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </label>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Due date: {task.dueDate}</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-bold">notes </p>
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {task.notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
      <div>
        <button
          className="ms-2 text-sm font-medium text-red-600 bg-red-200 px-2 py-1 rounded"
          onClick={() => handleDeleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </a>
  );
}
