import { getAdminToken } from "@/features/auth/utils/get-admin-token";

const API_URL = import.meta.env.VITE_API_URL;

export async function getRestaurantOrders(restaurantId: string) {
  const token = getAdminToken();

  const res = await fetch(`${API_URL}/api/orders/restaurants/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant orders");
  }

  return res.json();
}
