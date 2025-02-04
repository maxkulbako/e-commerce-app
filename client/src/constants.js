export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:8001" : "/";
export const PRODUCTS_URL = "api/products";
export const UPLOAD_URL = "api/upload";
export const USERS_URL = "api/users";
export const ORDERS_URL = "api/orders";
export const PAYPAL_URL = "api/config/paypal";
