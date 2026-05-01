import React, { useState, useEffect } from 'react';
import { positionService } from '../../../../services/position.service';
import { departmentService } from '../../../../services/department.service';

const EmployeesForm = ({ initialData, onSubmit, submitText = 'Save Changes', onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position_id: '',
    department_id: '',
    salary: '',
    joinon_date: new Date().toISOString().split('T')[0],
    office_id: '',
    is_active: true,
    ...initialData
  });

  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        const [posRes, deptRes] = await Promise.all([
          positionService.getPosition(),
          departmentService.getDepartments()
        ]);
        setPositions(posRes.data.data || []);
        setDepartments(deptRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch positions or departments:', error);
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ 
        ...prev, 
        ...initialData,
        joinon_date: initialData.joinon_date ? new Date(initialData.joinon_date).toISOString().split('T')[0] : ''
      }));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert IDs to numbers if they are strings
    const submissionData = {
      ...formData,
      position_id: formData.position_id ? parseInt(formData.position_id) : null,
      department_id: formData.department_id ? parseInt(formData.department_id) : null,
      office_id: formData.office_id ? parseInt(formData.office_id) : null,
      salary: formData.salary ? parseFloat(formData.salary) : null,
    };
    onSubmit(submissionData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-200 overflow-hidden w-full">
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={formData.first_name || ''}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="e.g. John"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={formData.last_name || ''}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="e.g. Doe"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              required
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="e.g. john@example.com"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Phone Number</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="e.g. +1 234 567 890"
            />
          </div>

          {/* Position */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Position</label>
            <div className="relative">
              <select
                value={formData.position_id || ''}
                onChange={(e) => setFormData({ ...formData, position_id: e.target.value })}
                className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 appearance-none bg-white"
                disabled={loadingOptions}
              >
                <option value="">Select Position</option>
                {positions.map(pos => (
                  <option key={pos.id} value={pos.id}>{pos.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Department</label>
            <div className="relative">
              <select
                value={formData.department_id || ''}
                onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 appearance-none bg-white"
                disabled={loadingOptions}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Salary</label>
            <input
              type="number"
              value={formData.salary || ''}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="e.g. 500"
            />
          </div>

          {/* Join Date */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Join Date</label>
            <input
              type="date"
              value={formData.joinon_date || ''}
              onChange={(e) => setFormData({ ...formData, joinon_date: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Status</label>
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
            className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all uppercase tracking-wider"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeesForm;
