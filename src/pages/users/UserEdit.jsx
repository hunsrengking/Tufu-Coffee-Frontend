import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../api/resourceApi';
import UserForm from './UserForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import AlertMessage from '../../components/AlertMessage';

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await userService.getUser(id);
        setInitialData(response.data.data);
      } catch (error) {
        setAlert({
          open: true,
          type: 'error',
          message: 'Failed to fetch user details.'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await userService.updateUser(id, formData);
      setAlert({
        open: true,
        type: 'success',
        message: 'User updated successfully!'
      });
      setTimeout(() => navigate('/users'), 1500);
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.response?.data?.message || 'Failed to update user.'
      });
    }
  };

  if (loading) return <LoadingSpinner fullPage text="Loading user data..." />;

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
            <span className="text-slate-900 font-medium">Edit User</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit User</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Update information for this user account.</p>
        </div>
      </div>

      {initialData && (
        <UserForm 
          initialData={initialData}
          onSubmit={handleSubmit} 
          onCancel={() => navigate('/users')} 
          submitText="Save Changes" 
        />
      )}
    </div>
  );
};

export default UserEdit;
