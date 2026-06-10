import { getAdminToken } from "@/features/auth/utils/get-admin-token";
const API_URL = import.meta.env.VITE_API_URL;

export async function updateMenuItemAvailability(
  itemId: string,
  isAvailable: boolean,
) {
  const token = getAdminToken();

  const res = await fetch(`${API_URL}/items/${itemId}/availability`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isAvailable }),
  });

  if (!res.ok) {
    throw new Error("Failed to update item availability");
  }

  return res.json();
}
