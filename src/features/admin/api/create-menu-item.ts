import { getAdminToken } from "@/features/auth/utils/get-admin-token";

type CreateMenuItemPayload = {
  name: string;
  description?: string;
  price: number;
};

export async function createMenuItem(
  categoryId: string,
  payload: CreateMenuItemPayload,
) {
  const token = getAdminToken();

  const res = await fetch(
    `http://localhost:3500/categories/${categoryId}/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to create menu item");
  }

  return res.json();
}
