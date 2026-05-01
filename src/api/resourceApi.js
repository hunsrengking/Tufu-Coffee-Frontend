import api from "./api";

export const userService = {
    getUsers: () => api.get("/users"),
    getUser: (id) => api.get(`/users/${id}`),
    createUser: (userData) => api.post("/users", userData),
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/users/${id}`),
    changePassword: (id, passwordData) => api.put(`/users/${id}/change-password`, passwordData),
};

export const authService = {
    login: (credentials) => api.post("/auth/login", credentials),
};