const API_URL = import.meta.env.VITE_API_URL;

type AdminLoginPayload = {
  email: string;
  password: string;
};

export async function adminLogin(payload: AdminLoginPayload) {
  const res = await fetch(`${API_URL}/api/auth/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}
