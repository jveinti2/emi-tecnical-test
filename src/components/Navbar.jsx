import { lazy } from "react";
import { NavLink } from "react-router-dom";

const routes = [
  {
    name: "Task list",
    path: "/",
    component: lazy(() => import("../components/Task")),
    exact: true,
  },
  {
    name: "Create task",
    path: "/form",
    component: lazy(() => import("../components/Form")),
    exact: true,
  },
];

export default function Navbar() {
  return (
    <>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Emi test
            </span>
          </a>

          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {routes.map((route, index) => (
                <li
                  key={index}
                  className="flex items-center py-1 md:py-0 text-white
                "
                >
                  <NavLink
                    to={route.path}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
