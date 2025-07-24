import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import API from "../../api"; // adjust the path if needed
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const DepartmentTable = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await API.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await API.put(`/departments/${editingId}`, {
          departmentID: editingId,
          departmentName: data.departmentName,
        });
        setEditingId(null);
        toast.success('Department updated successfully!');
      } else {
        await API.post("/departments", data);
        toast.success('Department added successfully!');
      }
      reset();
      fetchDepartments();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleEdit = (dept) => {
    setEditingId(dept.departmentID);
    setValue("departmentName", dept.departmentName);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await API.delete(`/departments/${id}`);
        fetchDepartments();
        toast.success(t('employee.deleteDepartmentSuccess'));
      } catch (error) {
        console.error("Error deleting department:", error);
        toast.error(t('employee.departmentDeleteError'));
      }
    }
  };

  return (
    <div className="mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {editingId ? t('employee.editDepartment') : t('employee.addDepartment')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-4 mb-6">
        <input
          {...register("departmentName", { required: true })}
          placeholder={t('employee.departmentName')}
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? t('employee.update') : t('employee.create')}
        </button>
        {editingId && (
          <button
            type="button"
            className="text-gray-500 underline"
            onClick={() => {
              reset();
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full text-sm text-left border border-gray-300">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 ">{t('employee.departmentName')}</th>
            <th className="py-2 px-4 ">{t('employee.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.departmentID} className="hover:bg-gray-50 border-t border-gray-300">
              <td className="py-2 px-4 ">{dept.departmentName}</td>
              <td className="py-2 px-4  space-x-2">
                <button
                  onClick={() => handleEdit(dept)}
                  className="text-blue-600 hover:underline"
                >
                  {t('employee.edit')}
                </button>
                <button
                  onClick={() => handleDelete(dept.departmentID)}
                  className="text-red-600 hover:underline"
                >
                  {t('employee.delete')}
                </button>
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;