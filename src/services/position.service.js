import api from "../api/api";

export const positionService = {
    /**
     * Fetch all positions
     */
    getPosition: () => api.get("/positions"),

    /**
     * Fetch a single position by ID
     */
    getPositionById: (id) => api.get(`/positions/${id}`),

    /**
     * Create a new position
     */
    createPosition: (positionData) => api.post("/positions", positionData),

    /**
     * Update an existing position
     */
    updatePosition: (id, positionData) => api.put(`/positions/${id}`, positionData),

    /**
     * Delete a position
     */
    deletePosition: (id) => api.delete(`/positions/${id}`),
};

export default positionService;
