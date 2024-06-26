import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { auth } = useAuth();

  return auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default PrivateRoutes;
