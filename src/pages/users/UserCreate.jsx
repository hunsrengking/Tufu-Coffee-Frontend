import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../api/resourceApi';
import UserForm from './UserForm';
import AlertMessage from '../../components/AlertMessage';

const UserCreate = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const handleSubmit = async (formData) => {
    try {
      await userService.createUser(formData);
      setAlert({
        open: true,
        type: 'success',
        message: 'User created successfully!'
      });
      setTimeout(() => navigate('/users'), 1500);
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.response?.data?.message || 'Failed to create user. Please try again.'
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <button onClick={() => navigate('/users')} className="hover:text-blue-600 transition-colors">Users</button>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-slate-900 font-medium">Create User</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create User</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Fill in the details to add a new member to your team.</p>
        </div>
      </div>

      <UserForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/users')} 
        submitText="Create User" 
      />
    </div>
  );
};

export default UserCreate;
