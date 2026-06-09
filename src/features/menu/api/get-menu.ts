export async function getMenu(slug: string) {
  const res = await fetch(`http://localhost:3500/menu/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }

  return res.json();
}
