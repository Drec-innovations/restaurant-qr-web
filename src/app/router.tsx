import { createBrowserRouter } from "react-router-dom";
import MenuPage from "@/features/menu/pages/menu-page";

export const router = createBrowserRouter([
  {
    path: "/menu/:slug",
    element: <MenuPage />,
  },
]);
