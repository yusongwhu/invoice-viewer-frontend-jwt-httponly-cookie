import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import API from '../../api';
import useDepartments from '../departments/useDepartments';

const EmployeeForm = ({ selected, onSaved }) => {
  const { register, handleSubmit, reset } = useForm();
  const departments = useDepartments();

  useEffect(() => {
    reset(selected || { employeeName: '', salary: '', departmentID: '' });
  }, [selected]);

  const onSubmit = async (data) => {

    const payload = {
        employeeName: data.employeeName,
        salary: data.salary ? parseFloat(data.salary) : null,
        departmentID: data.departmentID ? parseInt(data.departmentID) : null,
        departmentName: '', // not required on POST, but if your model needs it
    };

    if (selected?.id) {
      await API.put(`/Employees/${selected.id}`, payload);
    } else {
      await API.post('/Employees', payload);
    }
    onSaved(null);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded shadow max-w-md">
      <h2 className="text-xl font-bold">{selected ? 'Edit' : 'Add'} Employee</h2>

      <input
        {...register('employeeName', { required: true })}
        placeholder="Employee Name"
        className="w-full p-2 border rounded"
      />

      <input
        {...register('salary', { required: true })}
        placeholder="Salary"
        type="number"
        step="0.01"
        className="w-full p-2 border rounded"
      />

      <select {...register('departmentID', { required: true })} className="w-full p-2 border rounded">
        <option value="">Select Department</option>
        {departments.map(d => (
          <option key={d.departmentID} value={d.departmentID}>{d.departmentName}</option>
        ))}
      </select>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        {selected ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default EmployeeForm;