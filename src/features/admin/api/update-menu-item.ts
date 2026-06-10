import { getAdminToken } from "@/features/auth/utils/admin-session";

const API_URL = import.meta.env.VITE_API_URL;

type UpdateMenuItemPayload = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
};

export async function updateMenuItem(
  itemId: string,
  payload: UpdateMenuItemPayload,
) {
  const token = getAdminToken();

  const res = await fetch(`${API_URL}/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to update menu item");
  }

  return data.menuItem;
}
