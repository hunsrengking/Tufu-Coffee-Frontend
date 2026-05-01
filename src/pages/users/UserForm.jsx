import React, { useState, useEffect } from 'react';
import { roleService } from '../../services/role.service';
import { employeesService } from '../../services/employees.service';

const UserForm = ({ initialData, onSubmit, submitText = 'Save Changes', onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    recovery_email: '',
    password: '',
    role_id: '',
    employee_id: '',
    is_active: true,
    ...initialData
  });

  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        const response = await roleService.getRoles();
        setRoles(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoadingRoles(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        setLoadingEmployees(true);
        const response = await employeesService.getEmployees();
        setEmployees(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchRoles();
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        role_id: initialData.role_id || '',
        employee_id: initialData.employee_id || '',
        recovery_email: initialData.recovery_email || ''
      }));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      role_id: formData.role_id ? parseInt(formData.role_id) : null,
      employee_id: formData.employee_id ? parseInt(formData.employee_id) : null
    };
    onSubmit(submissionData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-200 overflow-hidden w-full">
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700  tracking-wider">Username <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={formData.username || ''}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="Username"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700  tracking-wider">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              required
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="Email"
            />
          </div>

          {/* Recovery Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700  tracking-wider">Recovery Email</label>
            <input
              type="email"
              value={formData.recovery_email || ''}
              onChange={(e) => setFormData({ ...formData, recovery_email: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="e.g. recovery@example.com"
            />
          </div>

          {/* Password - Only show for new users */}
          {!initialData && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700  tracking-wider">Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                required={!initialData}
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
                placeholder="Password"
              />
            </div>
          )}

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700  tracking-wider">Role <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                required
                value={formData.role_id || ''}
                onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 appearance-none bg-white"
                disabled={loadingRoles}
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none"></i>
            </div>
          </div>

          {/*Employee */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 tracking-wider">Employee</label>
            <div className="relative">
              <select
                value={formData.employee_id || ''}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 appearance-none bg-white"
                disabled={loadingEmployees}
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name} ({emp.position_name || 'No Position'})
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700  tracking-wider">Status</label>
            <div className="relative">
              <select
                value={formData.is_active ? 'Active' : 'Inactive'}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'Active' })}
                className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 appearance-none bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors  tracking-wider"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all  tracking-wider"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
