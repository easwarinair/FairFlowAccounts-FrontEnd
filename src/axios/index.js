import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const LoginAPICall = (data) =>
  api.post("/login", data, { withCredentials: true });
export const RegisterAPICall = (data) =>
  api.post("/signup", data, { withCredentials: true });
export const LogoutAPI = () => api.get("/logout", { withCredentials: true });
export const getUserDataAPI = () => api.get("/user", { withCredentials: true });
export const ProjectStatusAPICall = () =>
  api.get("/project/status", { withCredentials: true });
export const getProjects = () =>
  api.get("/projects", { withCredentials: true });
export const getProjectDetails = (id, hash) =>
  api.get(`/projects/${id}/${hash}`, { withCredentials: true });
