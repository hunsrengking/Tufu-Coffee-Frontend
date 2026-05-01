import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeesService } from '../../../../services/employees.service';
import EmployeesForm from './EmployeesForm';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AlertMessage from '../../../../components/AlertMessage';

const EmployeesEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const response = await employeesService.getEmployee(id);
        setInitialData(response.data.data);
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
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await employeesService.updateEmployee(id, formData);
      navigate('/organization/employee', { 
        state: { message: 'Employee updated successfully!', type: 'success' } 
      });
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.response?.data?.message || 'Failed to update employee.'
      });
    }
  };

  if (loading) return <LoadingSpinner fullPage text="Loading employee data..." />;

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
            <span className="text-slate-900 font-medium">Edit Employee</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit Employee</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Update information for this employee account.</p>
        </div>
      </div>

      {initialData && (
        <EmployeesForm 
          initialData={initialData}
          onSubmit={handleSubmit} 
          onCancel={() => navigate('/organization/employee')} 
          submitText="Update Employee" 
        />
      )}
    </div>
  );
};

export default EmployeesEdit;
