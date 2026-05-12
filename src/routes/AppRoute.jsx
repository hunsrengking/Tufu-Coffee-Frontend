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
import Organization from '../pages/setting/organization/Organization'
import EmployeeList from '../pages/setting/organization/employees/EmployeesList'
import EmployeeCreate from '../pages/setting/organization/employees/EmployeesCreate'
import EmployeeEdit from '../pages/setting/organization/employees/EmployeesEdit'
import EmployeeDetail from '../pages/setting/organization/employees/EmployeesDetail'
import System from '../pages/setting/system/System'
import RoleList from '../pages/setting/system/role-permission/RoleList'
import RoleCreate from '../pages/setting/system/role-permission/RoleCreate'
import RoleView from '../pages/setting/system/role-permission/RoleView'
import ContentManagementSystem from '../pages/cms/ContentManagementSystem'

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
                <Route path="/orders" element={<div className="font-medium text-slate-500">Orders Page (Coming Soon)</div>} />
                <Route path="/products" element={<div className="font-medium text-slate-500">Products Page (Coming Soon)</div>} />
                <Route path="/cms" element={<ContentManagementSystem/>} />
                <Route path="/settings" element={<div className="font-medium text-slate-500">Settings Page (Coming Soon)</div>} />
                <Route path="/settings/organization" element={<Organization/>} />
                <Route path="/organization/employee" element={<ProtectedRoute requiredPermission="READ_USER"><EmployeeList /></ProtectedRoute>} />
                <Route path="/organization/employee/create" element={<ProtectedRoute requiredPermission="CREATE_USER"><EmployeeCreate /></ProtectedRoute>} />
                <Route path="/organization/employee/edit/:id" element={<ProtectedRoute requiredPermission="UPDATE_USER"><EmployeeEdit /></ProtectedRoute>} />
                <Route path="/organization/employee/:id" element={<ProtectedRoute requiredPermission="READ_USER"><EmployeeDetail /></ProtectedRoute>} />
                <Route path="/settings/system" element={<System/>} />
                <Route path="/settings/system/roles" element={<RoleList />} />
                <Route path="/settings/system/roles/create" element={<RoleCreate />} />
                <Route path="/settings/system/roles/:id" element={<RoleView />} />
            </Route>

            {/* Default Redirects */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

export default AppRoute