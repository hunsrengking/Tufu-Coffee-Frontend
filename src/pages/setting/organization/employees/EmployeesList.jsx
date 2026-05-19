import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { employeesService } from '../../../../services/employees.service';
import LoadingSpinner from '../../../../components/LoadingSpinner'
import AlertMessage from '../../../../components/AlertMessage'

const EmployeesList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeesService.getEmployees();
      setEmployees(response.data.data);
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: 'Failed to fetch employees. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();

    // Check for success message from navigation state
    if (location.state?.message) {
      setAlert({
        open: true,
        type: location.state.type || 'success',
        message: location.state.message
      });
      // Clear state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handlers
  const handleCreateEmployee = () => {
    navigate('/organization/employee/create');
  };

  const handleViewEmployee = (employee) => {
    navigate(`/organization/employee/${employee.id}`);
  };

  if (loading) return <LoadingSpinner fullPage text="Fetching employees..." />;

  return (
    <div className="space-y-6">
      <AlertMessage
        isOpen={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Employee Management</h1>
          <p className="text-sm text-slate-500 font-medium tracking-tight mt-1">Manage and monitor accounts across your organization.</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-slate-100">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>
            <input
              type="text"
              placeholder="Filter employees..."
              className="h-10 sm:h-11 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20 border-0"
            />
          </div>
          <button
            onClick={handleCreateEmployee}
            className="flex-shrink-0 flex items-center gap-2 rounded-xl bg-blue-600 px-3 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
          >
            <i className="fa-solid fa-plus text-sm"></i>
            <span className="hidden sm:inline">Create Employee</span>
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="hover:bg-slate-50 transition-colors">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr
                    key={employee.id}
                    onClick={() => handleViewEmployee(employee)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group/row"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold uppercase">
                          {employee.first_name?.charAt(0) || 'E'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{employee.first_name} {employee.last_name}</span>
                          <span className="text-xs text-slate-400">{employee.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{employee.position_name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${employee.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {employee.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {employee.joinon_date ? new Date(employee.joinon_date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">
                    No employees found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden divide-y divide-slate-100">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <div
                key={employee.id}
                onClick={() => handleViewEmployee(employee)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold uppercase text-sm">
                  {employee.first_name?.charAt(0) || 'E'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm truncate">{employee.first_name} {employee.last_name}</span>
                    <span className={`flex-shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${employee.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400 truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-500">{employee.position_name || 'N/A'}</span>
                    <span className="text-xs text-slate-400">
                      {employee.joinon_date ? new Date(employee.joinon_date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-300 flex-shrink-0"></i>
              </div>
            ))
          ) : (
            <div className="px-4 py-12 text-center text-slate-400 font-medium text-sm">
              No employees found in the system.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeesList;
