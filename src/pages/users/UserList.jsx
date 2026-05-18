import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { userService } from '../../services/user.service';
import LoadingSpinner from '../../components/LoadingSpinner'
import AlertMessage from '../../components/AlertMessage'

const UserList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers();
      setUsers(response.data.data);
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: 'Failed to fetch users. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    if (location.state?.message) {
      setAlert({
        open: true,
        type: location.state.type || 'success',
        message: location.state.message
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const statusColors = {
    Active: 'bg-emerald-100 text-emerald-700',
    Inactive: 'bg-slate-100 text-slate-700',
  }

  // Handlers
  const handleCreateUser = () => {
    navigate('/users/create');
  };

  const handleViewUser = (user) => {
    navigate(`/users/${user.id}`);
  };

  if (loading) return <LoadingSpinner fullPage text="Fetching users..." />;

  return (
    <div className="space-y-4 sm:space-y-6">
      <AlertMessage
        isOpen={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 font-medium tracking-tight mt-1">Manage and monitor accounts across your coffee shop network.</p>
        </div>
      </div>

      <div className="rounded-2xl sm:rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
        {/* Search + Create row */}
        <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-slate-100">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>
            <input
              type="text"
              placeholder="Filter users..."
              className="h-10 sm:h-11 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20 border-0"
            />
          </div>
          <button
            onClick={handleCreateUser}
            className="flex-shrink-0 flex items-center gap-2 rounded-xl bg-blue-600 px-3 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
          >
            <i className="fa-solid fa-plus text-sm"></i>
            <span className="hidden sm:inline">Create User</span>
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleViewUser(user)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold uppercase">
                          {user.username?.charAt(0) || 'U'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{user.username}</span>
                          <span className="text-xs text-slate-400">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="font-medium text-slate-600">{user.employee_name || 'Not Linked'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{user.role_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${user.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">
                    No users found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden divide-y divide-slate-100">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleViewUser(user)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold uppercase text-sm">
                  {user.username?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm truncate">{user.username}</span>
                    <span className={`flex-shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${user.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400 truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500">{user.role_name}</span>
                    {user.employee_name && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-400">{user.employee_name}</span>
                      </>
                    )}
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-300 flex-shrink-0"></i>
              </div>
            ))
          ) : (
            <div className="px-4 py-12 text-center text-slate-400 font-medium text-sm">
              No users found in the system.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Showing {users.length} users</span>
          <div className="flex items-center gap-2">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-400 border border-slate-200 rounded-lg opacity-50 cursor-not-allowed uppercase tracking-wider">Prev</button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-blue-600 border border-blue-600 rounded-lg uppercase tracking-wider">Next</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserList
