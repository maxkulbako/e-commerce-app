import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
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
import PrivatRoute from "./components/PrivatRoute.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrdersListPage from "./pages/admin/OrdersListPage.jsx";
import ProductsListPage from "./pages/admin/ProductsListPage.jsx";
import ProductEditPage from "./pages/admin/ProductEditPage.jsx";
import UsersListPage from "./pages/admin/UsersListPage.jsx";
import UserEditPage from "./pages/admin/UserEditPage.jsx";

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
        path: "search/:keyword/",
        element: <HomePage />,
      },
      {
        path: "page/:pageNumber",
        element: <HomePage />,
      },
      {
        path: "search/:keyword/page/:pageNumber",
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
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "admin/orderslist/",
            element: <OrdersListPage />,
          },
          {
            path: "admin/productlist",
            element: <ProductsListPage />,
          },
          {
            path: "admin/productlist/:pageNumber",
            element: <ProductsListPage />,
          },
          {
            path: "admin/product/:productId/edit",
            element: <ProductEditPage />,
          },
          {
            path: "admin/userslist",
            element: <UsersListPage />,
          },
          {
            path: "admin/user/:userId/edit",
            element: <UserEditPage />,
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
    <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </PayPalScriptProvider>
    </HelmetProvider>
  </StrictMode>
);
