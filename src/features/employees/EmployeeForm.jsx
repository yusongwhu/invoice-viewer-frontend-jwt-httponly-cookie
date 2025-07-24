import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import API from '../../api';
import useDepartments from '../departments/useDepartments';
import { toast } from 'react-toastify';

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
            toast.success('Employee updated successfully!');
        } else {
            await API.post('/Employees', payload);
            toast.success('Employee added successfully!');
        }
        onSaved(null);
        reset();
    };

    return (
        <div className="">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{selected ? 'Edit' : 'Add'} Employee</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-4 mb-6">

                <input
                    {...register('employeeName', { required: true })}
                    placeholder="Employee Name"
                    className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    {...register('salary', { required: true })}
                    placeholder="Salary"
                    type="number"
                    step="0.01"
                    className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select {...register('departmentID', { required: true })} className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Department</option>
                    {departments.map(d => (
                        <option key={d.departmentID} value={d.departmentID}>{d.departmentName}</option>
                    ))}
                </select>

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    {selected ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;