// Save user to localStorage
export function setCurrentUser(user) {
  if (user && typeof user === "object") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

// Get user from localStorage
export function getCurrentUser() {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
    return null;
  }
}

// Logout and redirect
export function logoutUser(redirect = "/login") {
  localStorage.removeItem("user");
  localStorage.removeItem("userId");

  // Optional: redirect to login page
  if (redirect) {
    window.location.href = redirect;
  }
}
