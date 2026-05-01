import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roleService } from '../../../../services/role.service';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AlertMessage from '../../../../components/AlertMessage';

const RoleView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [allPermissions, setAllPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });
    const [assignedPermissionIds, setAssignedPermissionIds] = useState(new Set());
    const [activeGroup, setActiveGroup] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [roleRes, permRes] = await Promise.all([
                roleService.getRole(id),
                roleService.getPermissions()
            ]);

            const roleData = roleRes.data.data;
            const permsData = permRes.data.data || [];

            setRole(roleData);
            setAllPermissions(permsData);

            const assignedIds = new Set(roleData.permissions.map(p => p.id));
            setAssignedPermissionIds(assignedIds);

            if (permsData.length > 0) {
                setActiveGroup(permsData[0].group_name || 'General');
            }
        } catch (error) {
            setAlert({
                open: true,
                type: 'error',
                message: 'Failed to fetch role data.'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleTogglePermission = (permissionId) => {
        if (!isEditing) return;

        const newAssigned = new Set(assignedPermissionIds);
        if (newAssigned.has(permissionId)) {
            newAssigned.delete(permissionId);
        } else {
            newAssigned.add(permissionId);
        }
        setAssignedPermissionIds(newAssigned);
    };

    const handleSavePermissions = async () => {
        try {
            setSaving(true);
            await roleService.updateRole(id, {
                permissionIds: Array.from(assignedPermissionIds)
            });
            setAlert({
                open: true,
                type: 'success',
                message: 'Permissions updated successfully!'
            });
            setIsEditing(false);
        } catch (error) {
            setAlert({
                open: true,
                type: 'error',
                message: 'Failed to update permissions.'
            });
        } finally {
            setSaving(false);
        }
    };

    const handleSelectAll = () => {
        if (!isEditing) return;
        const groupPerms = groupedPermissions[activeGroup] || [];
        const newAssigned = new Set(assignedPermissionIds);
        groupPerms.forEach(perm => newAssigned.add(perm.id));
        setAssignedPermissionIds(newAssigned);
    };

    const handleDeselectAll = () => {
        if (!isEditing) return;
        const groupPerms = groupedPermissions[activeGroup] || [];
        const newAssigned = new Set(assignedPermissionIds);
        groupPerms.forEach(perm => newAssigned.delete(perm.id));
        setAssignedPermissionIds(newAssigned);
    };

    const handleCancelEdit = () => {
        const originalIds = new Set(role.permissions.map(p => p.id));
        setAssignedPermissionIds(originalIds);
        setIsEditing(false);
    };

    const groupedPermissions = allPermissions.reduce((acc, perm) => {
        const group = perm.group_name || 'General';
        if (!acc[group]) acc[group] = [];
        acc[group].push(perm);
        return acc;
    }, {});

    const groups = Object.keys(groupedPermissions);

    if (loading) return <LoadingSpinner fullPage text="Loading role details..." />;
    if (!role) return <div className="p-8 text-center text-slate-500 font-medium">Role not found.</div>;

    return (
        <div className="space-y-6 animate-fade-in pb-10 min-h-screen">
            <AlertMessage
                isOpen={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />

            {/* Header Profile */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-4 flex-1">
                            <div className="grid grid-cols-[100px_1fr] gap-4">
                                <span className="text-sm font-bold text-slate-500">Name</span>
                                <span className="text-sm font-bold text-slate-900">{role.name}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-4">
                                <span className="text-sm font-bold text-slate-500">Description</span>
                                <span className="text-sm font-medium text-slate-600">{role.description || 'No description provided.'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 self-start md:self-center bg-blue-900 p-1 rounded-lg shadow-lg">
                            <button
                                onClick={() => isEditing ? handleCancelEdit() : setIsEditing(true)}
                                className={`px-4 py-2 text-[11px] font-bold text-white uppercase hover:bg-blue-800 transition-colors border-r border-blue-800 flex items-center gap-1.5 ${isEditing ? 'bg-rose-700' : ''}`}
                            >
                                {isEditing ? (
                                    <><i className="fa-solid fa-xmark"></i> Cancel</>
                                ) : (
                                    <><i className="fa-solid fa-pen-to-square"></i> Edit</>
                                )}
                            </button>
                            <button className="px-4 py-2 text-[11px] font-bold text-white uppercase hover:bg-blue-800 transition-colors border-r border-blue-800">
                                Disable
                            </button>
                            <button className="px-4 py-2 text-[11px] font-bold text-white uppercase hover:bg-blue-800 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Permissions Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <h2 className="text-2xl font-bold text-slate-700">Permissions: <span className="text-slate-900">{activeGroup}</span></h2>
                    {isEditing && (
                        <button
                            onClick={handleSavePermissions}
                            disabled={saving}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:opacity-50 animate-fade-in"
                        >
                            {saving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-save"></i>}
                            Submit
                        </button>
                    )}
                </div>

                <div className="flex flex-col md:flex-row h-[500px]">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-slate-50/50 border-r border-slate-100 overflow-y-auto">
                        <div className="divide-y divide-slate-100">
                            {groups.map(group => (
                                <button
                                    key={group}
                                    onClick={() => setActiveGroup(group)}
                                    className={`w-full text-left px-6 py-4 text-sm font-bold transition-all hover:bg-slate-100 flex items-center justify-between group ${activeGroup === group ? 'bg-white text-blue-600 border-l-4 border-blue-600' : 'text-slate-500'
                                        }`}
                                >
                                    <span className="uppercase tracking-tight">{group}</span>
                                    <i className={`fa-solid fa-chevron-right text-[10px] transition-transform ${activeGroup === group ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`}></i>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col bg-white">
                        {isEditing && (
                            <div className="px-8 py-3 border-b border-slate-50 bg-slate-50/20 flex items-center gap-4 animate-fade-in">
                                <button 
                                    onClick={handleSelectAll}
                                    className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-700 flex items-center gap-1.5"
                                >
                                    <i className="fa-solid fa-check-double"></i> Select All
                                </button>
                                <div className="h-3 w-px bg-slate-200"></div>
                                <button 
                                    onClick={handleDeselectAll}
                                    className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-rose-600 flex items-center gap-1.5"
                                >
                                    <i className="fa-solid fa-square-minus"></i> Deselect All
                                </button>
                            </div>
                        )}
                        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                            {groupedPermissions[activeGroup]?.map(perm => (
                                <label
                                    key={perm.id}
                                    className={`flex items-center gap-4 px-8 py-4 transition-colors ${isEditing ? 'hover:bg-slate-50 cursor-pointer' : 'opacity-80 cursor-default'} group`}
                                >
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={assignedPermissionIds.has(perm.id)}
                                            onChange={() => handleTogglePermission(perm.id)}
                                            disabled={!isEditing}
                                            className={`peer h-5 w-5 appearance-none rounded border-2 transition-all ${isEditing
                                                    ? 'border-slate-300 bg-white checked:bg-blue-600 checked:border-blue-600 cursor-pointer'
                                                    : 'border-slate-200 bg-slate-50 checked:bg-slate-400 checked:border-slate-400 cursor-default'
                                                }`}
                                        />
                                        <i className="fa-solid fa-check absolute text-[10px] text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></i>
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-xs font-bold uppercase tracking-widest ${isEditing ? 'text-slate-800' : 'text-slate-500'}`}>
                                            {perm.name.replace(/_/g, ' ')}
                                        </p>
                                    </div>
                                </label>
                            ))}

                            {(!groupedPermissions[activeGroup] || groupedPermissions[activeGroup].length === 0) && (
                                <div className="p-12 text-center text-slate-400 font-medium">
                                    No permissions found in this group.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleView;
