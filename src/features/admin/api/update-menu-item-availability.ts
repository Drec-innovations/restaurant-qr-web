export async function updateMenuItemAvailability(
  itemId: string,
  isAvailable: boolean,
) {
  const res = await fetch(
    `http://localhost:3500/items/${itemId}/availability`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAvailable }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update item availability");
  }

  return res.json();
}
