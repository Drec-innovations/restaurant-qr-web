import { clearAdminSession } from "@/features/auth/utils/admin-session";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Menu",
    href: "/admin/menu",
  },
  {
    label: "Orders",
    href: "/admin/orders",
  },
  {
    label: "QR Code",
    href: "/admin/qr",
  },
];

export default function AdminLayout() {
  const location = useLocation();

  const navigate = useNavigate();

  function handleLogout() {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold">Restaurant Admin</h1>
              <p className="text-sm text-muted-foreground">
                Manage your menu, orders, and QR code.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="text-sm border rounded px-3 py-2"
            >
              Logout
            </button>
          </div>

          <nav className="flex gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm px-3 py-2 rounded border ${
                    active
                      ? "bg-black text-white"
                      : "bg-background text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
