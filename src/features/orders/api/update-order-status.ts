import { getAdminToken } from "@/features/auth/utils/get-admin-token";

export async function updateOrderStatus(orderId: string, status: string) {
  const token = getAdminToken();

  const res = await fetch(
    `http://localhost:3500/api/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update order status");
  }

  return res.json();
}
