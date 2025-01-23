import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const PrivatRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivatRoute;
