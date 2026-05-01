import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../api/resourceApi';
import ChangePasswordModal from './ChangePasswordModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import AlertMessage from '../../components/AlertMessage';

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userService.getUser(id);
      // API returns: { status: 'success', message: '...', data: { ... } }
      setUser(response.data.data);
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

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleSavePassword = async (userId, newPassword) => {
    try {
      await userService.changePassword(userId, { password: newPassword });
      setAlert({
        open: true,
        type: 'success',
        message: 'Password updated successfully!'
      });
      setIsPasswordOpen(false);
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.response?.data?.message || 'Failed to update password.'
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userService.deleteUser(id);
        setAlert({
          open: true,
          type: 'success',
          message: 'User deleted successfully!'
        });
        setTimeout(() => navigate('/users'), 1500);
      } catch (error) {
        setAlert({
          open: true,
          type: 'error',
          message: 'Failed to delete user.'
        });
      }
    }
  };

  if (loading) return <LoadingSpinner fullPage text="Loading user profile..." />;
  if (!user) return <div className="p-8 text-center text-slate-500 font-medium">User not found.</div>;

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
            <span className="text-slate-900 font-medium">User Details</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Profile</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Detailed information about this user account.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => navigate(`/users/edit/${id}`)}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-blue-50 hover:text-blue-600"
          >
            <i className="fa-solid fa-pen text-xs"></i>
            Edit User
          </button>
          <div className="w-px h-4 bg-slate-200"></div>
          <button
            onClick={() => setIsPasswordOpen(true)}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-amber-50 hover:text-amber-600"
          >
            <i className="fa-solid fa-key text-xs"></i>
            Password
          </button>
          <div className="w-px h-4 bg-slate-200"></div>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
          >
            <i className="fa-solid fa-trash text-xs"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
        {/* Header Profile */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
          <div className="h-24 w-24 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-600 shadow-lg border-4 border-white/20 uppercase">
            {user.username?.charAt(0) || 'U'}
          </div>
          <div className="text-white">
            <h3 className="text-3xl font-bold">{user.username}</h3>
            <p className="text-blue-100 font-medium mt-1 text-lg">{user.role_name}</p>
          </div>
        </div>

        {/* Body Information */}
        <div className="p-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 border-b border-slate-100 pb-3">Account Information</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1 text-blue-500 bg-blue-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-envelope text-lg"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                <p className="text-base font-medium text-slate-900 break-all">{user.email}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-emerald-500 bg-emerald-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-shield-halved text-lg"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Role Level</p>
                <p className="text-base font-medium text-slate-900">{user.role_name}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-amber-500 bg-amber-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-calendar-day text-lg"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Joined Date</p>
                <p className="text-base font-medium text-slate-900">
                  {user.joined_date ? new Date(user.joined_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-purple-500 bg-purple-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-signal text-lg"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Account Status</p>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold mt-1 ${user.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal 
        isOpen={isPasswordOpen} 
        onClose={() => setIsPasswordOpen(false)} 
        user={user} 
        onSave={handleSavePassword} 
      />
    </div>
  );
};

export default UserDetail;
