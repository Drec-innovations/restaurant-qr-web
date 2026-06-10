import { Navigate, Outlet } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/admin-session";

export default function PublicAdminRoute() {
  if (isAdminLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
