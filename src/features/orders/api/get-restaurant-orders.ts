export async function getRestaurantOrders(restaurantId: string) {
  const res = await fetch(
    `http://localhost:3500/api/orders/restaurants/${restaurantId}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant orders");
  }

  return res.json();
}
