import { getAdminToken } from "@/features/auth/utils/get-admin-token";

type CreateMenuItemPayload = {
  name: string;
  description?: string;
  price: number;
};

const API_URL = import.meta.env.VITE_API_URL;

export async function createMenuItem(
  categoryId: string,
  payload: CreateMenuItemPayload,
) {
  const token = getAdminToken();

  const res = await fetch(`${API_URL}/categories/${categoryId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create menu item");
  }

  return res.json();
}
