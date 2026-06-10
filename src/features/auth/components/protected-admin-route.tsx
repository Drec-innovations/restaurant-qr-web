import { Navigate, Outlet } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/admin-session";

export default function ProtectedAdminRoute() {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
