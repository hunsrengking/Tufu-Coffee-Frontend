import api from "../api/api";

export const productService = {
    /**
     * Fetch all products
     */
    getProducts: () => api.get("/products"),

    /**
     * Create a new product
     */
    createProduct: (data) => api.post("/products", data),

    /**
     * Fetch all orders
     */
    getOrders: () => api.get("/orders"),
};

export default productService;
