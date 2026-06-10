export async function updateOrderStatus(orderId: string, status: string) {
  const res = await fetch(
    `http://localhost:3500/api/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update order status");
  }

  return res.json();
}
