import api from "../api/api";

export const roleService = {
    /**
     * Fetch all roles
     */
    getRoles: () => api.get("/roles"),

    /**
     * Fetch a single role by ID
     */
    getRole: (id) => api.get(`/roles/${id}`),

    /**
     * Create a new role
     */
    createRole: (roleData) => api.post("/roles", roleData),

    /**
     * Update an existing role
     */
    updateRole: (id, roleData) => api.put(`/roles/${id}`, roleData),

    /**
     * Delete a role
     */
    deleteRole: (id) => api.delete(`/roles/${id}`),

    /**
     * Fetch all permissions
     */
    getPermissions: () => api.get("/roles/permissions"),
};

export default roleService;
