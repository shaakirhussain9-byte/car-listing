
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
const PrivateRoute = () => {
  const { currentUser } = useAppContext();
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;