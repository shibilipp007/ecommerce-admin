import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  const login = useSelector((state) => state.login);

  return login.loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
}
