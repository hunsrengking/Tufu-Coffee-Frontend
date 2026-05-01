import api from "../api/api";

export const userService = {
    /**
     * Fetch all users/employees
     */
    getUsers: () => api.get("/users"),

    /**
     * Fetch a single user by ID
     */
    getUser: (id) => api.get(`/users/${id}`),

    /**
     * Create a new user
     */
    createUser: (userData) => api.post("/users", userData),

    /**
     * Update an existing user
     */
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),

    /**
     * Delete a user
     */
    deleteUser: (id) => api.delete(`/users/${id}`),

    /**
     * Change user password
     */
    changePassword: (id, passwordData) => api.put(`/users/${id}/change-password`, passwordData),
};

export default userService;
