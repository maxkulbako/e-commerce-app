import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store.js";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFaundPage from "./pages/NotFaundPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PrivatRoute from "./pages/PrivatRoute.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import OrderPage from "./pages/OrderPage.jsx";

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
      { path: "cart", element: <CartPage /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "",
        element: <PrivatRoute />,
        children: [
          {
            path: "shipping",
            element: <ShippingPage />,
          },
          {
            path: "payment",
            element: <PaymentPage />,
          },
          {
            path: "placeorder",
            element: <PlaceOrder />,
          },
          {
            path: "order/:orderId",
            element: <OrderPage />,
          },
        ],
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
    <PayPalScriptProvider deferLoading={true}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PayPalScriptProvider>
  </StrictMode>
);
