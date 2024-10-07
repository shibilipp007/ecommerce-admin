import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicLayout() {
  const login = useSelector((state) => state.login);

  return login.loggedIn ? <Navigate to={"/"} /> : <Outlet />;
}
