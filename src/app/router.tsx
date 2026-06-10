import { createBrowserRouter } from "react-router-dom";
import MenuPage from "@/features/menu/pages/menu-page";
import OrderSuccessPage from "@/features/orders/pages/order-success-page";
import RestaurantOrdersPage from "@/features/orders/pages/restaurant-orders-page";

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
    path: "/admin/orders",
    element: <RestaurantOrdersPage />,
  },
]);
