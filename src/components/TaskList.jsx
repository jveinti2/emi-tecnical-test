import { useState, useContext } from "react";
import { TaskContext } from "../context/Task";
import Task from "./Task";

export default function TaskList() {
  const { tasks } = useContext(TaskContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4); // Cambia este valor según la cantidad de tareas que quieras mostrar por página

  // Calcular los índices de inicio y fin de las tareas para la página actual
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-2">
      <section className="grid gap-2 md:grid-cols-4">
        {currentTasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </section>

      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              onClick={() => paginate(currentPage - 1)}
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
            <li key={index}>
              <a
                onClick={() => paginate(index + 1)}
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li>
            <a
              onClick={() => paginate(currentPage + 1)}
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
