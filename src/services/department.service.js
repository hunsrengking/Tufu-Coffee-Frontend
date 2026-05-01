import api from "../api/api";

export const departmentService = {
    /**
     * Fetch all departments
     */
    getDepartments: () => api.get("/departments"),

    /**
     * Fetch a single department by ID
     */
    getDepartment: (id) => api.get(`/departments/${id}`),

    /**
     * Create a new department
     */
    createDepartment: (departmentData) => api.post("/departments", departmentData),

    /**
     * Update an existing department
     */
    updateDepartment: (id, departmentData) => api.put(`/departments/${id}`, departmentData),

    /**
     * Delete a department
     */
    deleteDepartment: (id) => api.delete(`/departments/${id}`),
};

export default departmentService;