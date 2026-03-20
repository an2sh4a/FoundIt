const API = import.meta.env.VITE_API_BASE_URL || "/api";

// Common response handler
async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  let payload = null;

  try {
    payload = isJson ? await res.json() : await res.text();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const message =
      typeof payload === "string"
        ? payload || "Request failed"
        : payload?.error || payload?.message || "Request failed";

    throw new Error(message);
  }

  return payload;
}

// ================= AUTH =================
export async function signup(data) {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
}

export async function login(data) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
}

// ================= REPORT =================
export async function reportLost(data) {
  const res = await fetch(`${API}/report-lost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
}

export async function reportFound(data) {
  const res = await fetch(`${API}/report-found`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
}

// ================= FETCH =================
export async function getFoundItems() {
  const res = await fetch(`${API}/found-items`);
  return parseResponse(res);
}

export async function getLostItems() {
  const res = await fetch(`${API}/lost-items`);
  return parseResponse(res);
}

// ================= CLAIM =================
export async function claimItem(data) {
  const res = await fetch(`${API}/claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
}