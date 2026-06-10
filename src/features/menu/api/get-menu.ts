const API_URL = import.meta.env.VITE_API_URL;

export async function getMenu(slug: string) {
  const res = await fetch(`${API_URL}/menu/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }

  return res.json();
}
