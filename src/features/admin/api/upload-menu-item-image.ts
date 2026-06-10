import { getAdminToken } from "@/features/auth/utils/admin-session";

const API_URL = import.meta.env.VITE_API_URL;

export async function uploadMenuItemImage(file: File) {
  const token = getAdminToken();

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_URL}/api/uploads/menu-item-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to upload image");
  }

  return data.imageUrl as string;
}
