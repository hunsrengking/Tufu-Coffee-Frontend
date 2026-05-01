import api from "../api/api";

export const employeesService = {
    /**
     * Fetch all users/employees
     */
    getEmployees: () => api.get("/employees"),

    /**
     * Fetch a single user by ID
     */
    getEmployee: (id) => api.get(`/employees/${id}`),

    /**
     * Create a new user
     */
    createEmployee: (userData) => api.post("/employees", userData),

    /**
     * Update an existing user
     */
    updateEmployee: (id, userData) => api.put(`/employees/${id}`, userData),

    /**
     * Delete a user
     */
    deleteEmployee: (id) => api.delete(`/employees/${id}`),

};

export default employeesService;
