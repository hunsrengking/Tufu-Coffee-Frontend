import { resourceApi } from "../api/resourceApi";

export const fetchUsers = async () => {
    try {
        const response = await resourceApi.getAllUsers();
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const fetchClients = async () => {
    try {
        const response = await resourceApi.getAllClients();
        return response.data;
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
};
