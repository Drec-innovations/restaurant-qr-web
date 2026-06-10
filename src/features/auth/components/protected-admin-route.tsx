import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const session = localStorage.getItem("admin_session");

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
