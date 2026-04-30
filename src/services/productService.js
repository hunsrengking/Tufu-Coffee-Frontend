import { resourceApi } from "../api/resourceApi";

export const fetchProducts = async () => {
    try {
        const response = await resourceApi.getAllProducts();
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await resourceApi.getAllOrders();
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const createProduct = async (data) => {
    try {
        const response = await resourceApi.createProduct(data);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};
