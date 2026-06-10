import { getAdminToken } from "@/features/auth/utils/admin-session";

const API_URL = import.meta.env.VITE_API_URL;

export async function createCategory(restaurantId: string, name: string) {
  const token = getAdminToken();

  const res = await fetch(`${API_URL}/restaurants/${restaurantId}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("Failed to create category");
  }

  return res.json();
}
