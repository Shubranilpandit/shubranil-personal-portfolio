/**
 * Central REST API Client for Shubranil's Portfolio System
 */

const API_BASE = import.meta.env.VITE_API_URL || "";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = localStorage.getItem("tron_token");
  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || `HTTP ${response.status}: Grid request failed`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  // Public Data
  getHealth: () => request("/api/health"),
  getProfile: () => request("/api/profile"),
  getSkills: () => request("/api/skills"),
  getProjects: (category = "", featured = false) => {
    const params = new URLSearchParams();
    if (category && category !== "All") params.append("category", category);
    if (featured) params.append("featured", "true");
    const qs = params.toString() ? `?${params.toString()}` : "";
    return request(`/api/projects${qs}`);
  },
  getProject: (id) => request(`/api/projects/${id}`),
  getEducation: () => request("/api/education"),
  getExperience: () => request("/api/experience"),
  getAchievements: () => request("/api/achievements"),
  getGithub: () => request("/api/github"),
  postContact: (data) => request("/api/contact", { method: "POST", body: JSON.stringify(data) }),

  // Auth
  login: (username, password) => request("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  getMe: () => request("/api/auth/me"),

  // Admin CRUD
  getOverview: () => request("/api/admin/overview"),
  updateProfile: (data) => request("/api/admin/profile", { method: "PUT", body: JSON.stringify(data) }),

  // Projects CRUD
  createProject: (data) => request("/api/admin/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) => request(`/api/admin/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) => request(`/api/admin/projects/${id}`, { method: "DELETE" }),

  // Skills CRUD
  createSkill: (data) => request("/api/admin/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id, data) => request(`/api/admin/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id) => request(`/api/admin/skills/${id}`, { method: "DELETE" }),

  // Education CRUD
  createEducation: (data) => request("/api/admin/education", { method: "POST", body: JSON.stringify(data) }),
  updateEducation: (id, data) => request(`/api/admin/education/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteEducation: (id) => request(`/api/admin/education/${id}`, { method: "DELETE" }),

  // Experience CRUD
  createExperience: (data) => request("/api/admin/experience", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id, data) => request(`/api/admin/experience/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteExperience: (id) => request(`/api/admin/experience/${id}`, { method: "DELETE" }),

  // Achievements CRUD
  createAchievement: (data) => request("/api/admin/achievements", { method: "POST", body: JSON.stringify(data) }),
  updateAchievement: (id, data) => request(`/api/admin/achievements/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteAchievement: (id) => request(`/api/admin/achievements/${id}`, { method: "DELETE" }),

  // Contact messages
  getContacts: (status = "") => {
    const qs = status ? `?status=${status}` : "";
    return request(`/api/admin/contacts${qs}`);
  },
  updateContactStatus: (id, status) => request(`/api/admin/contacts/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteContact: (id) => request(`/api/admin/contacts/${id}`, { method: "DELETE" }),
};
