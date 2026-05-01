import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeesService } from '../../../../services/employees.service';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AlertMessage from '../../../../components/AlertMessage';

const EmployeesDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeesService.getEmployee(id);
      setEmployee(response.data.data);
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: 'Failed to fetch employee details.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      try {
        await employeesService.deleteEmployee(id);
        navigate('/organization/employee', {
          state: { message: 'Employee deleted successfully!', type: 'success' }
        });
      } catch (error) {
        setAlert({
          open: true,
          type: 'error',
          message: 'Failed to delete employee.'
        });
      }
    }
  };

  if (loading) return <LoadingSpinner fullPage text="Loading employee profile..." />;
  if (!employee) return <div className="p-8 text-center text-slate-500 font-medium">Employee not found.</div>;

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
            <button onClick={() => navigate('/organization/employee')} className="hover:text-blue-600 transition-colors">Employees</button>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-slate-900 font-medium">Employee Details</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Employee Profile</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Detailed information about this team member.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => navigate(`/organization/employee/edit/${id}`)}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-blue-50 hover:text-blue-600 uppercase tracking-wider"
          >
            <i className="fa-solid fa-pen text-xs"></i>
            Edit
          </button>
          <div className="w-px h-4 bg-slate-200"></div>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-red-600 transition-all hover:bg-red-50 uppercase tracking-wider"
          >
            <i className="fa-solid fa-trash text-xs"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-200 overflow-hidden w-full">
        {/* Header Profile */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
          <div className="h-24 w-24 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-600 shadow-lg border-4 border-white/20 uppercase">
            {employee.first_name?.charAt(0) || 'E'}
          </div>
          <div className="text-white">
            <h3 className="text-3xl font-bold">{employee.first_name} {employee.last_name}</h3>
            <p className="text-blue-100 font-medium mt-1 text-lg">{employee.position_name || 'Employee'}</p>
          </div>
        </div>

        {/* Body Information */}
        <div className="p-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-3">General Information</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1 text-blue-500 bg-blue-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-envelope text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                <p className="text-sm font-bold text-slate-900 break-all">{employee.email}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-emerald-500 bg-emerald-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-phone text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
                <p className="text-sm font-bold text-slate-900">{employee.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-amber-500 bg-amber-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-briefcase text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Position</p>
                <p className="text-sm font-bold text-slate-900">{employee.position_name || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-purple-500 bg-purple-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-building text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Department</p>
                <p className="text-sm font-bold text-slate-900">{employee.department_name || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-rose-500 bg-rose-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-money-bill-wave text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Salary</p>
                <p className="text-sm font-bold text-slate-900">${employee.salary || '0'}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 text-indigo-500 bg-indigo-50 h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-calendar-check text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Join Date</p>
                <p className="text-sm font-bold text-slate-900">
                  {employee.joinon_date ? new Date(employee.joinon_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesDetail;
