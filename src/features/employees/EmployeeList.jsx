import { useEffect, useState } from 'react';
import API from '../../api';
import EmployeeForm from './EmployeeForm';
import { toast } from 'react-toastify';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = (newSelection) => {
    if (newSelection == null) {
      setSelected(null);
    }
    API.get('/Employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
    };

  const handleDelete = async (id) => {
    await API.delete(`/Employees/${id}`);
    load();
    toast.success('Employee deleted successfully!');
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <EmployeeForm selected={selected} onSaved={load} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Salary</th>
              <th className="p-2">Department</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-t">
                <td className="p-2">{emp.id}</td>
                <td className="p-2">{emp.employeeName}</td>
                <td className="p-2">${emp.salary}</td>
                <td className="p-2">{emp.departmentName}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => setSelected(emp)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;