import { createBrowserRouter } from "react-router-dom";
import MenuPage from "@/features/menu/pages/menu-page";
import OrderSuccessPage from "@/features/orders/pages/order-success-page";
import RestaurantOrdersPage from "@/features/orders/pages/restaurant-orders-page";
import RestaurantQrPage from "@/features/admin/pages/restaurant-qr-page";
import AdminMenuPage from "@/features/admin/pages/admin-menu-page";
import AdminLayout from "@/features/admin/layouts/admin-layout";

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
    path: "/admin",
    element: <AdminLayout />,
    children: [
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
]);
