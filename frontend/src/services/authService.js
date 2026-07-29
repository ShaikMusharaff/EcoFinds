import api from "./api";

export const signupUser = (userData) =>
    api.post("/auth/signup", userData);

export const loginUser = (userData) =>
    api.post("/auth/login", userData);

export const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
};