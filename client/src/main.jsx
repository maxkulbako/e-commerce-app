import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./store.js";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFaundPage from "./pages/NotFaundPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

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
        path: "product/:productId",
        element: <ProductPage />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
