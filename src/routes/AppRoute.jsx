import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import UserList from '../pages/users/UserList'
import Dashboard from '../pages/dashboard/Dashboard'
import MainLayouts from '../layouts/MainLayouts'

const AppRoute = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route element={<MainLayouts />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UserList />} />
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