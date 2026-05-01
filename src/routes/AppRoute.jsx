import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import UserList from '../pages/users/UserList'
import UserCreate from '../pages/users/UserCreate'
import UserEdit from '../pages/users/UserEdit'
import UserDetail from '../pages/users/UserDetail'
import Dashboard from '../pages/dashboard/Dashboard'
import MainLayouts from '../layouts/MainLayouts'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoute = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute><MainLayouts /></ProtectedRoute>}>
                <Route path="/dashboard" element={<ProtectedRoute requiredPermission="VIEW_DASHBOARD"><Dashboard /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute requiredPermission="READ_USER"><UserList /></ProtectedRoute>} />
                <Route path="/users/create" element={<ProtectedRoute requiredPermission="CREATE_USER"><UserCreate /></ProtectedRoute>} />
                <Route path="/users/edit/:id" element={<ProtectedRoute requiredPermission="UPDATE_USER"><UserEdit /></ProtectedRoute>} />
                <Route path="/users/:id" element={<ProtectedRoute requiredPermission="READ_USER"><UserDetail /></ProtectedRoute>} />
                <Route path="/orders" element={<div className="p-8">Orders Page (Coming Soon)</div>} />
                <Route path="/products" element={<div className="p-8">Products Page (Coming Soon)</div>} />
                <Route path="/settings" element={<div className="p-8">Settings Page (Coming Soon)</div>} />
            </Route>

            {/* Default Redirects */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

export default AppRoute