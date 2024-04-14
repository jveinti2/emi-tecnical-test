import { Toaster } from "react-hot-toast";
import "./App.css";
import Form from "./components/Form";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/Task";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <TaskProvider>
        <Toaster />
        <Navbar />
        <div className="space-y-2 p-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </TaskProvider>
    </>
  );
}

export default App;
