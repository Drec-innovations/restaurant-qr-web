export async function createCategory(restaurantId: string, name: string) {
  const res = await fetch(
    `http://localhost:3500/restaurants/${restaurantId}/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to create category");
  }

  return res.json();
}
