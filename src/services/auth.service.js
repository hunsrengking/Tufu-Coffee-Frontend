import api from "../api/api";

/**
 * Auth Service - Handles authentication and session management
 */
export const authService = {
    /**
     * Login with credentials
     * @param {Object} credentials - { email, password }
     */
    login: (credentials) => {
        return api.post("/auth/login", credentials);
    },

    /**
     * Logout user and clear session
     */
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    },

    /**
     * Send forgot password request
     */
    forgotPassword: (email) => {
        return api.post("/auth/forgotpassword", { email });
    },

    /**
     * Verify OTP
     */
    verifyOTP: (verifyData) => {
        return api.post("/auth/verifyotp", verifyData);
    },

    /**
     * Reset password
     */
    resetPassword: (resetData) => {
        return api.post("/auth/resetpassword", resetData);
    }
};


export default authService;
