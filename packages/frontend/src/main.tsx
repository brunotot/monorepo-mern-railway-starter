import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { $AppConfig, convertToRoutes } from "./core/config/index.ts";
import { RootErrorPage, RootLayoutPage } from "./core/pages/index.ts";
import "./main.css";

const router = createBrowserRouter([
  {
    element: <RootLayoutPage />,
    errorElement: <RootErrorPage />,
    children: convertToRoutes($AppConfig.navigationRoutes),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
