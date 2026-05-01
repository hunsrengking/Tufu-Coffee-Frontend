/**
 * Permission utility to handle complex role and permission checks
 */
export const permissions = {
    /**
     * Check if a user has a specific permission
     * @param {Object} user - The user object from AuthContext
     * @param {string} permission - The permission string to check (e.g., 'CREATE_USER')
     * @returns {boolean}
     */
    has(user, permission) {
        if (!user) return false;
        
        // Super Admin bypass - can see everything
        if (user.role === 'Super Admin') return true;
        
        if (!user.permissions) return false;

        // Handle array of permissions (check if user has ANY of them)
        if (Array.isArray(permission)) {
            return permission.some(p => user.permissions.includes(p));
        }
        
        // Check single permission
        return user.permissions.includes(permission);
    },

    /**
     * Check if a user has any of the provided permissions
     * @param {Object} user 
     * @param {Array<string>} permissionList 
     */
    hasAny(user, permissionList) {
        return permissionList.some(p => this.has(user, p));
    },

    /**
     * Check if a user is an Admin
     */
    isAdmin(user) {
        return ['Admin', 'Super Admin'].includes(user?.role);
    }
};

export default permissions;