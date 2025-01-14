import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFaundPage from "./pages/NotFaundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product:id",
        element: <div>Product Page</div>,
      },
      {
        path: "login",
        element: <div>Login Page</div>,
      },
      {
        path: "*",
        element: <NotFaundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
