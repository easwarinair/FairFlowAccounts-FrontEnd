import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const LoginAPICall = (data) => api.post("/login", data);
export const RegisterAPICall = (data) => api.post("/signup", data);
export const ProjectStatusAPICall = () => api.get("/project/status");
export const getProjects = () => api.get("/projects");
export const getProjectDetails = (id, hash) => api.get(`/projects/${id}/${hash}`);
