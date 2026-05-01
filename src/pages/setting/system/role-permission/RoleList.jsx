import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { roleService } from '../../../../services/role.service'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import AlertMessage from '../../../../components/AlertMessage'

const RoleList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await roleService.getRoles();
            setRoles(response.data.data || []);
        } catch (error) {
            setAlert({
                open: true,
                type: 'error',
                message: 'Failed to fetch roles. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();

        if (location.state?.message) {
            setAlert({
                open: true,
                type: location.state.type || 'success',
                message: location.state.message
            });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Handlers
    const handleCreateRole = () => {
        navigate('/settings/system/roles/create');
    };

    const handleViewRole = (role) => {
        navigate(`/settings/system/roles/${role.id}`);
    };

    if (loading) return <LoadingSpinner fullPage text="Fetching roles..." />;

    return (
        <div className="space-y-6">
            <AlertMessage
                isOpen={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Role Management</h1>
                    <p className="text-slate-500 font-medium tracking-tight mt-1">Configure and manage system roles and permissions.</p>
                </div>
            </div>

            <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 border-b border-slate-100">
                    <div className="relative w-full max-w-sm">
                        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>
                        <input
                            type="text"
                            placeholder="Filter roles..."
                            className="h-11 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20 border-0"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleCreateRole} className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700">
                            <i className="fa-solid fa-plus text-sm"></i>
                            Create Role
                        </button>
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr className="hover:bg-slate-50 transition-colors">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {roles.length > 0 ? (
                                roles.map((role) => (
                                    <tr
                                        key={role.id}
                                        onClick={() => handleViewRole(role)}
                                        className="hover:bg-slate-50 transition-colors cursor-pointer group/row"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold uppercase">
                                                    {role.name?.charAt(0) || 'R'}
                                                </div>
                                                <span className="font-bold text-slate-900">{role.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {role.description || 'No description provided.'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${role.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {role.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-slate-400 font-medium">
                                        No roles found in the system.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Showing {roles.length} roles</span>
                </div>
            </div>
        </div>
    )
}

export default RoleList;