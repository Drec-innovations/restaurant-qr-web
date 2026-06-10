import { getAdminToken } from "@/features/auth/utils/get-admin-token";
const API_URL = import.meta.env.VITE_API_URL;

export async function updateOrderStatus(orderId: string, status: string) {
  const token = getAdminToken();

  const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update order status");
  }

  return res.json();
}
