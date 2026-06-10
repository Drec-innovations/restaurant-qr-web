import { getAdminToken } from "@/features/auth/utils/get-admin-token";

export async function getRestaurantOrders(restaurantId: string) {
  const token = getAdminToken();

  const res = await fetch(
    `http://localhost:3500/api/orders/restaurants/${restaurantId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant orders");
  }

  return res.json();
}
