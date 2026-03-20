const API = "http://localhost:8080";

export async function signup(data) {
  return fetch(API + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export async function login(data) {
  return fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export async function reportLost(data) {
  return fetch(API + "/report-lost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export async function reportFound(data) {
  return fetch(API + "/report-found", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export async function getFoundItems() {
  const res = await fetch(API + "/found-items");
  return res.json();
}

export async function getLostItems() {
  const res = await fetch(API + "/lost-items");
  return res.json();
}

export async function claimItem(data) {
  return fetch(API + "/claim", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}