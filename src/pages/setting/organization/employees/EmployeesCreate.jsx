import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeesService } from '../../../../services/employees.service';
import EmployeesForm from './EmployeesForm';
import AlertMessage from '../../../../components/AlertMessage';

const EmployeesCreate = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const handleSubmit = async (formData) => {
    try {
      await employeesService.createEmployee(formData);
      navigate('/organization/employee', {
        state: { message: 'Employee created successfully!', type: 'success' }
      });
    } catch (error) {
      setAlert({
        open: true,
        type: 'error',
        message: error.response?.data?.message || 'Failed to create employee. Please try again.'
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
            <button onClick={() => navigate('/organization/employee')} className="hover:text-blue-600 transition-colors">Employees</button>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-slate-900 font-medium">Create Employee</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Employee</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Fill in the details to add a new member to your team.</p>
        </div>
      </div>

      <EmployeesForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/organization/employee')} 
        submitText="Create Employee" 
      />
    </div>
  );
};

export default EmployeesCreate;
