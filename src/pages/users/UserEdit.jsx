import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from './UserForm';

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const initialData = {
    name: 'John Doe', // Mock populated data
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  };

  const handleSubmit = (formData) => {
    console.log('Update user:', formData);
    navigate('/users');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <button onClick={() => navigate('/users')} className="hover:text-blue-600 transition-colors">Users</button>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-slate-900 font-medium">Edit User</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit User</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Update information for this user account.</p>
        </div>
      </div>

      <UserForm 
        initialData={initialData}
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/users')} 
        submitText="Save Changes" 
      />
    </div>
  );
};

export default UserEdit;
