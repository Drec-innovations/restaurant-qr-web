export function getAdminToken() {
  const session = localStorage.getItem("admin_session");

  if (!session) {
    return null;
  }

  try {
    const parsed = JSON.parse(session);
    return parsed.token || null;
  } catch {
    return null;
  }
}
