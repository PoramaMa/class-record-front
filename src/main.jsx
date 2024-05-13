import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./view/App.jsx";
import ClassRoom from "./view/Classroom.jsx";
import Register from "./view/Register.jsx";
import Student from "./view/Student.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/students",
    element: <Student />,
  },
  {
    path: "/add-student",
    element: <Student />,
  },
  {
    path: "/edit-student/:id",
    element: <Student />,
  },
  {
    path: "/view-student/:id",
    element: <Student />,
  },
  {
    path: "/classrooms",
    element: <ClassRoom />,
  },
  {
    path: "/add-classroom",
    element: <ClassRoom />,
  },
  {
    path: "/edit-classroom/:id",
    element: <ClassRoom />,
  },
  {
    path: "/view-classroom/:id",
    element: <ClassRoom />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/add-register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
