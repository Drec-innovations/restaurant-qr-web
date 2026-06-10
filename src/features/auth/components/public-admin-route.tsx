import { Navigate, Outlet } from "react-router-dom";

export default function PublicAdminRoute() {
  const session = localStorage.getItem("admin_session");

  if (session) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
