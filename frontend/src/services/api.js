import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getQuizQuestions = (quizId) => API.get(`/quizzes/${quizId}`);
export const submitAnswers = (data) => API.post("/certificate", data);
