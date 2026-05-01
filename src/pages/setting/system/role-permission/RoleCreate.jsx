import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roleService } from '../../../../services/role.service';
import RoleForm from './RoleForm';
import AlertMessage from '../../../../components/AlertMessage';

const RoleCreate = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const handleCreateRole = async (formData) => {
    try {
      await roleService.createRole(formData);
      navigate('/settings/system/roles', {
        state: { message: 'Role created successfully!', type: 'success' }
      });
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.response?.data?.message || 'Failed to create role. Please try again.'
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AlertMessage 
        isOpen={alert.open} 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert({ ...alert, open: false })} 
      />

      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <button onClick={() => navigate('/settings/system/roles')} className="hover:text-blue-600 transition-colors">Roles</button>
          <i className="fa-solid fa-chevron-right text-[10px]"></i>
          <span className="text-slate-900 font-medium">Create Role</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create New Role</h1>
        <p className="text-slate-500 font-medium tracking-tight mt-1">Define a new system role and set its base properties.</p>
      </div>

      <div>
        <RoleForm 
          onSubmit={handleCreateRole} 
          submitText="Create Role" 
          onCancel={() => navigate('/settings/system/roles')} 
        />
      </div>
    </div>
  );
};

export default RoleCreate;
