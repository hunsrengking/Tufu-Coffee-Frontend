import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../services/user.service';
import ChangePasswordModal from './ChangePasswordModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import AlertMessage from '../../components/AlertMessage';

const InfoRow = ({ icon, iconBg, iconColor, label, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 group">
    <div className="flex items-center gap-3">
      <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
        <i className={`${icon} text-sm`}></i>
      </span>
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </div>
    <div className="text-sm font-semibold text-slate-800 text-right max-w-[55%] break-all">
      {children}
    </div>
  </div>
);

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userService.getUser(id);
      setUser(response.data.data);
    } catch (error) {
      setAlert({ open: true, type: 'error', message: 'Failed to fetch user details.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, [id]);

  const handleSavePassword = async (userId, passwordData) => {
    try {
      await userService.changePassword(userId, passwordData);
      setAlert({ open: true, type: 'success', message: 'Password updated successfully!' });
      setIsPasswordOpen(false);
    } catch (error) {
      setAlert({ open: true, type: 'error', message: error.response?.data?.message || 'Failed to update password.' });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userService.deleteUser(id);
        navigate('/users', { state: { message: 'User deleted successfully!', type: 'success' } });
      } catch (error) {
        setAlert({ open: true, type: 'error', message: 'Failed to delete user.' });
      }
    }
  };

  if (loading) return <LoadingSpinner fullPage text="Loading user profile..." />;
  if (!user) return <div className="p-8 text-center text-slate-500 font-medium">User not found.</div>;

  const initials = (user.username || 'U').slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6 animate-fade-in">
      <AlertMessage
        isOpen={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />

      {/* Page Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <button
              onClick={() => navigate('/users')}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Users
            </button>
            <i className="fa-solid fa-chevron-right text-[9px]"></i>
            <span className="text-slate-600 font-medium">Profile</span>
          </nav>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">User Profile</h1>
          <p className="text-sm text-slate-400 mt-0.5">View and manage this account's details and permissions.</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Banner */}
        <div className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-blue-800 px-6 sm:px-10 pt-10 pb-14">

          {/* Decorative rings */}
          <div className="absolute inset-0 overflow-hidden rounded-t-2xl pointer-events-none">
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full border border-white/5"></div>
            <div className="absolute -top-6 -right-6 h-48 w-48 rounded-full border border-white/5"></div>
            <div className="absolute top-4 right-20 h-32 w-32 rounded-full border border-white/5"></div>
            <div className="absolute bottom-0 left-1/3 h-40 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
          </div>

          {/* ⋮ Actions button */}
          <div className="absolute top-4 right-4 z-10">
            <div className="relative">
              <button
                onClick={() => setIsActionsOpen(prev => !prev)}
                className={`flex items-center justify-center h-8 w-8 rounded-xl transition-all ${isActionsOpen ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
                aria-label="Actions"
              >
                <i className="fa-solid fa-ellipsis-vertical text-white text-sm"></i>
              </button>

              {isActionsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsActionsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
                    <div className="px-3 pb-2 mb-1 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</p>
                    </div>
                    <button
                      onClick={() => { setIsActionsOpen(false); navigate(`/users/edit/${id}`); }}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <i className="fa-solid fa-pen-to-square text-xs"></i>
                      </span>
                      <div className="text-left">
                        <p className="font-semibold text-slate-800 text-[13px]">Edit Profile</p>
                        <p className="text-[11px] text-slate-400">Update user information</p>
                      </div>
                    </button>
                    <button
                      onClick={() => { setIsActionsOpen(false); setIsPasswordOpen(true); }}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <i className="fa-solid fa-key text-xs"></i>
                      </span>
                      <div className="text-left">
                        <p className="font-semibold text-slate-800 text-[13px]">Change Password</p>
                        <p className="text-[11px] text-slate-400">Reset account credentials</p>
                      </div>
                    </button>
                    <div className="my-2 mx-3 border-t border-slate-100"></div>
                    <button
                      onClick={() => { setIsActionsOpen(false); handleDelete(); }}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-500">
                        <i className="fa-solid fa-trash text-xs"></i>
                      </span>
                      <div className="text-left">
                        <p className="font-semibold text-red-600 text-[13px]">Delete Account</p>
                        <p className="text-[11px] text-red-400">Permanently remove user</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Profile content — centered on mobile, left-aligned on desktop */}
          <div className="relative flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-2xl ring-4 ring-white/10 uppercase select-none">
                {initials}
              </div>
              <span className={`absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-white shadow-sm ${user.is_active ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
            </div>
            {/* Name */}
            <div className="text-center sm:text-left pb-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{user.username}</h2>
            </div>
          </div>
        </div>
        {/* Account Information */}
        <div className="px-6 sm:px-10 pt-6 pb-8">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-slate-700">Account Details</h3>
          </div>
          <p className="text-xs text-slate-400 mb-5">Contact and authentication information for this user.</p>

          <div className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 divide-y divide-slate-100">
            <InfoRow icon="fa-solid fa-at" iconBg="bg-blue-50" iconColor="text-blue-500" label="Email Address">
              <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a>
            </InfoRow>
            <InfoRow icon="fa-solid fa-envelope-circle-check" iconBg="bg-sky-50" iconColor="text-sky-500" label="Recovery Email">
              {user.recovery_email
                ? <a href={`mailto:${user.recovery_email}`} className="text-blue-600 hover:underline">{user.recovery_email}</a>
                : <span className="text-slate-400 font-medium italic">Not configured</span>
              }
            </InfoRow>
            <InfoRow icon="fa-solid fa-shield-halved" iconBg="bg-emerald-50" iconColor="text-emerald-500" label="Role & Permissions">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
                <i className="fa-solid fa-check text-[10px]"></i>
                {user.role_name}
              </span>
            </InfoRow>
            <InfoRow icon="fa-solid fa-toggle-on" iconBg="bg-purple-50" iconColor="text-purple-500" label="Account Status">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${user.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </InfoRow>
            <InfoRow icon="fa-solid fa-calendar-day" iconBg="bg-amber-50" iconColor="text-amber-500" label="Date Joined">
              {user.joined_date
                ? new Date(user.joined_date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
                : <span className="text-slate-400 font-medium italic">Not recorded</span>
              }
            </InfoRow>
            <InfoRow icon="fa-solid fa-id-badge" iconBg="bg-rose-50" iconColor="text-rose-500" label="Linked Employee">
              {user.employee_name
                ? <span className="text-slate-800">{user.employee_name}</span>
                : <span className="text-slate-400 font-medium italic">No employee linked</span>
              }
            </InfoRow>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-10 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            <i className="fa-solid fa-circle-info mr-1.5"></i>
            User ID: <span className="font-mono font-semibold text-slate-600">#{id}</span>
          </p>
          <button
            onClick={() => navigate('/users')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-[10px]"></i>
            Back to Users
          </button>
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
