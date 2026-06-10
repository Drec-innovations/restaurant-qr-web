import { createBrowserRouter } from "react-router-dom";
import MenuPage from "@/features/menu/pages/menu-page";
import OrderSuccessPage from "@/features/orders/pages/order-success-page";

export const router = createBrowserRouter([
  {
    path: "/menu/:slug",
    element: <MenuPage />,
  },
  {
    path: "/order-success",
    element: <OrderSuccessPage />,
  },
]);
