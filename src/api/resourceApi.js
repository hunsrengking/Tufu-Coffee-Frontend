import api from "./api";

export const resourceApi = {
    getAllUsers: () => api.get("/users"),
    getByIdUser: (id) => api.get(`/users/${id}`),
    createUser: (data) => api.post("/users", data),
    updateUser: (id, data) => api.put(`/users/${id}`, data),
    deleteUser: (id) => api.delete(`/users/${id}`),

    getAllProducts: () => api.get("/products"),
    getByIdProduct: (id) => api.get(`/products/${id}`),
    createProduct: (data) => api.post("/products", data),
    updateProduct: (id, data) => api.put(`/products/${id}`, data),
    deleteProduct: (id) => api.delete(`/products/${id}`),

    getAllOrders: () => api.get("/orders"),
    getByIdOrder: (id) => api.get(`/orders/${id}`),
    createOrder: (data) => api.post("/orders", data),
    updateOrder: (id, data) => api.put(`/orders/${id}`, data),
    deleteOrder: (id) => api.delete(`/orders/${id}`),

    getAllOrderItems: () => api.get("/order-items"),
    getByIdOrderItem: (id) => api.get(`/order-items/${id}`),
    createOrderItem: (data) => api.post("/order-items", data),
    updateOrderItem: (id, data) => api.put(`/order-items/${id}`, data),
    deleteOrderItem: (id) => api.delete(`/order-items/${id}`),

    getAllClients: () => api.get("/clients"),
    getByIdClient: (id) => api.get(`/clients/${id}`),
    createClient: (data) => api.post("/clients/register", data),
    updateClient: (id, data) => api.put(`/clients/${id}`, data),
    deleteClient: (id) => api.delete(`/clients/${id}`),

};