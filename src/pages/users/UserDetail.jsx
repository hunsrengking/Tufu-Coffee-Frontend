import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock User Data
  const user = {
    id: id,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Mar 12, 2024'
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/users/edit/${id}`)}
            className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
          >
            <i className="fa-solid fa-pen text-xs"></i>
            Edit User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
        {/* Header Profile */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
          <div className="h-24 w-24 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-600 shadow-lg border-4 border-white/20">
            {user.name.charAt(0)}
          </div>
          <div className="text-white">
            <h3 className="text-3xl font-bold">{user.name}</h3>
            <p className="text-blue-100 font-medium mt-1 text-lg">{user.role}</p>
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
                <p className="text-base font-medium text-slate-900">{user.role}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-amber-500 bg-amber-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-calendar-day text-lg"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Joined Date</p>
                <p className="text-base font-medium text-slate-900">{user.joined}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-purple-500 bg-purple-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-signal text-lg"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Account Status</p>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold mt-1 ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
