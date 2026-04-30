import React from 'react'


const UserList = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joined: 'Mar 12, 2024' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Staff', status: 'Active', joined: 'Feb 28, 2024' },
    { id: 3, name: 'Mike Ross', email: 'mike@example.com', role: 'Customer', status: 'Inactive', joined: 'Jan 15, 2024' },
    { id: 4, name: 'Harvey Specter', email: 'harvey@example.com', role: 'Admin', status: 'Active', joined: 'Jan 10, 2024' },
    { id: 5, name: 'Donna Paulsen', email: 'donna@example.com', role: 'Super Admin', status: 'Active', joined: 'Dec 05, 2023' },
  ]

  const statusColors = {
    Active: 'bg-emerald-100 text-emerald-700',
    Inactive: 'bg-slate-100 text-slate-700',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Manage and monitor accounts across your coffee shop network.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700">
          <i className="fa-solid fa-plus text-sm"></i>
          Create User
        </button>
      </div>

      <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 border-b border-slate-100">
          <div className="relative w-full max-w-sm">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>
            <input
              type="text"
              placeholder="Filter users..."
              className="h-11 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20 border-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 border-0 ring-1 ring-slate-200">
              <i className="fa-solid fa-filter text-sm"></i>
              Filter
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="hover:bg-slate-50 transition-colors">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{user.name}</span>
                      <span className="text-xs text-slate-400">{user.email}</span>
                    </div>
                  </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium pr-6">
                    <div className="flex items-center justify-end gap-2">
                     <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <i className="fa-solid fa-pen text-sm"></i>
                     </button>
                     <button className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <i className="fa-solid fa-trash text-sm"></i>
                     </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Showing 5 of 64 users</span>
           <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-xs font-bold text-slate-400 border border-slate-200 rounded-lg opacity-50 cursor-not-allowed uppercase tracking-wider">Prev</button>
              <button className="px-4 py-2 text-xs font-bold text-blue-600 border border-blue-600 rounded-lg uppercase tracking-wider">Next</button>
           </div>
        </div>
      </div>
    </div>
  )
}

export default UserList
