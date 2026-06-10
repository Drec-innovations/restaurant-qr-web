import { getAdminToken } from "@/features/auth/utils/admin-session";

const API_URL = import.meta.env.VITE_API_URL;

export async function deleteMenuItem(itemId: string) {
  const token = getAdminToken();

  const res = await fetch(`${API_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to delete menu item");
  }

  return data;
}
