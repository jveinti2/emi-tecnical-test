import { useContext } from "react";
import { TaskContext } from "../context/Task";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Router, useNavigate } from "react-router-dom";

export default function Form() {
  const { setTasks } = useContext(TaskContext);
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: "",
      currentState: false,
      notes: [
        {
          text: "",
        },
      ],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      dueDate: Yup.string().required("Due date is required"),
      currentState: Yup.boolean(),
      notes: Yup.array().of(
        Yup.object().shape({
          text: Yup.string().required("Note is required"),
        })
      ),
    }),

    onSubmit: (values) => {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: prevTasks.length + 1,
          title: values.title,
          description: values.description,
          dueDate: values.dueDate,
          currentState: values.currentState,
          completed: values.currentState,
          notes: values.notes.map((note) => note.text),
        },
      ]);
      formik.resetForm();
      navigation("/");
    },
  });

  const handleAddNote = () => {
    if (formik.values.notes.some((note) => note.text === "")) {
      toast.error("Please fill the current note before adding a new one");
      return;
    }

    formik.setFieldValue("notes", [
      ...formik.values.notes,
      {
        text: "",
      },
    ]);
  };

  return (
    <>
      <div className=" p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg">
        <form>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="mb-5">
                <label
                  htmlFor="tiel"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="New task for de db.json"
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formik.errors.title && formik.touched.title ? formik.errors.title : null}
                </p>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formik.errors.description && formik.touched.description
                    ? formik.errors.description
                    : null}
                </p>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="dueDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Due date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formik.errors.dueDate && formik.touched.dueDate ? formik.errors.dueDate : null}
                </p>
              </div>
              <div className="mb-5">
                <label className="inline-flex items-center mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="currentState"
                    checked={formik.values.currentState}
                    onChange={formik.handleChange}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {formik.values.currentState ? "Active" : "Inactive"}
                  </span>
                </label>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formik.errors.currentState && formik.touched.currentState
                    ? formik.errors.currentState
                    : null}
                </p>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex items-baseline gap-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Notes
                </label>
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="text-sm font-medium text-blue-600 bg-blue-200 px-2 py-1 rounded"
                >
                  add note
                </button>
              </div>
              {formik.values.notes.map((note, index) => (
                <div key={index}>
                  <label
                    htmlFor={`note-${index}`} // Cambiado para hacer único el id de cada nota
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Note {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`note-${index}`} // Cambiado para hacer único el id de cada nota
                    value={note.text}
                    onChange={(e) => {
                      const newNotes = [...formik.values.notes];
                      newNotes[index].text = e.target.value;
                      formik.setFieldValue("notes", newNotes);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a note"
                  />
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.notes &&
                    formik.touched.notes &&
                    formik.touched.notes[index] &&
                    formik.touched.notes[index].text
                      ? formik.errors.notes[index].text
                      : null}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={formik.handleSubmit}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save task
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Decline
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
