import { createBrowserRouter } from "react-router-dom";
import MenuPage from "@/features/menu/pages/menu-page";
import OrderSuccessPage from "@/features/orders/pages/order-success-page";
import RestaurantOrdersPage from "@/features/orders/pages/restaurant-orders-page";
import RestaurantQrPage from "@/features/admin/pages/restaurant-qr-page";
import AdminMenuPage from "@/features/admin/pages/admin-menu-page";
import AdminLayout from "@/features/admin/layouts/admin-layout";
import AdminDashboardPage from "@/features/admin/pages/admin-dashboard-page";
import AdminLoginPage from "@/features/admin/pages/admin-login-page";
import ProtectedAdminRoute from "@/features/auth/components/protected-admin-route";
import PublicAdminRoute from "@/features/auth/components/public-admin-route";

export const router = createBrowserRouter([
  {
    path: "/menu/:slug",
    element: <MenuPage />,
  },
  {
    path: "/order-success",
    element: <OrderSuccessPage />,
  },
  {
    element: <PublicAdminRoute />,
    children: [
      {
        path: "/admin/login",
        element: <AdminLoginPage />,
      },
    ],
  },
  {
    element: <ProtectedAdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: "menu",
            element: <AdminMenuPage />,
          },
          {
            path: "orders",
            element: <RestaurantOrdersPage />,
          },
          {
            path: "qr",
            element: <RestaurantQrPage />,
          },
        ],
      },
    ],
  },
]);
