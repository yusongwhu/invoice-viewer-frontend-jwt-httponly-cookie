import { useEffect, useState } from 'react';
import API from '../../api';
import EmployeeForm from './EmployeeForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const load = (newSelection) => {
    if (newSelection == null) {
      setSelected(null);
    }
    API.get('/Employees')
      .then(res => setEmployees(res.data))
      .catch(err => {
        navigate('/');
        toast.error(t('employee.loadFail'));
      });
  };

  const handleDelete = async (id) => {
    await API.delete(`/Employees/${id}`);
    load();
    toast.success(t('employee.deleteSuccess'));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <EmployeeForm selected={selected} onSaved={load} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2">{t('employee.name')}</th>
              <th className="p-2">{t('employee.salary')}</th>
              <th className="p-2">{t('employee.department')}</th>
              <th className="p-2">{t('employee.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-t border-gray-300">
                <td className="p-2">{emp.employeeName}</td>
                <td className="p-2">${emp.salary}</td>
                <td className="p-2">{emp.departmentName}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => setSelected(emp)}
                    className="text-blue-600 hover:underline"
                  >
                    {t('employee.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-600 hover:underline"
                  >
                    {t('employee.delete')}
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