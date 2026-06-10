type AdminSession = {
  admin: {
    email: string;
  };
  token: string;
};

const SESSION_KEY = "admin_session";

export function saveAdminSession(session: AdminSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getAdminSession(): AdminSession | null {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session) as AdminSession;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function getAdminToken() {
  return getAdminSession()?.token || null;
}

export function clearAdminSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAdminLoggedIn() {
  return Boolean(getAdminSession()?.token);
}
