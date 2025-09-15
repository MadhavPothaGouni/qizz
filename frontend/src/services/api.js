import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 All backend routes start from here
});

// Add JWT token if available (for protected routes)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const fetchQuiz = () => API.get("/quizzes");
export const submitQuiz = (data) => API.post("/quizzes/submit", data);
export const fetchResult = (userId) => API.get(`/result/${userId}`);
export const generateCertificate = (userId) =>
  API.get(`/certificate/${userId}`, { responseType: "blob" }); // 👈 PDF download
