import React, { useState, useEffect } from 'react';

const RoleForm = ({ initialData, onSubmit, submitText = 'Save Changes', onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_active: true,
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-200 overflow-hidden w-full">
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
          {/* Role Name */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800"
              placeholder="e.g. Admin, Manager"
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full h-28 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 resize-none"
              placeholder="Briefly describe the purpose of this role"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
