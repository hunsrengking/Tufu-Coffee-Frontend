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
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-4 max-w-4xl">
          {/* Role Name */}
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-sm font-bold text-slate-600 text-right">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-60 h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 font-medium"
              placeholder=""
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="text-sm font-bold text-slate-600 text-right pt-2">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-60 h-20 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 font-medium resize-none"
              placeholder=""
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors tracking-wider"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all tracking-wider"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
