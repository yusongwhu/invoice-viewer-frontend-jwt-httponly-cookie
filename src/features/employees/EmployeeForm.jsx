import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import API from '../../api';
import useDepartments from '../departments/useDepartments';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const EmployeeForm = ({ selected, onSaved }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employeeName: '',
      salary: '',
      departmentID: ''
    }
  });

  const departments = useDepartments();

  useEffect(() => {
    reset(selected || { employeeName: '', salary: '', departmentID: '' });
  }, [selected]);

  const onSubmit = async (data) => {
    const payload = {
      employeeName: data.employeeName,
      salary: data.salary ? parseFloat(data.salary) : null,
      departmentID: data.departmentID ? parseInt(data.departmentID) : null,
      departmentName: ''
    };

    if (selected?.id) {
      await API.put(`/Employees/${selected.id}`, payload);
      toast.success(t('employee.updated'));
    } else {
      await API.post('/Employees', payload);
      toast.success(t('employee.created'));
    }
    onSaved(null);
    reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {selected ? t('employee.edit') : t('employee.add')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 mb-6">

        <div className="flex flex-col flex-grow">
          <input
            {...register('employeeName', { required: t('employee.nameRequired') })}
            placeholder={t('employee.name')}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.employeeName && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.employeeName.message}</p>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <input
            {...register('salary', {
              required: t('employee.salaryRequired'),
              valueAsNumber: true,
              validate: value => value > 0 || t('employee.salaryPositive')
            })}
            placeholder={t('employee.salary')}
            type="number"
            step="0.01"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.salary.message}</p>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <select
            {...register('departmentID', { required: true })}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('employee.selectDepartment')}</option>
            {departments.map(d => (
              <option key={d.departmentID} value={d.departmentID}>
                {d.departmentName}
              </option>
            ))}
          </select>
          {errors.departmentID && (
            <p className="text-red-500 text-sm mt-1 text-left">{t('employee.departmentRequired')}</p>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded h-fit"
          >
            {selected ? t('employee.update') : t('employee.create')}
          </button>
        </div>
        {selected && (
          <div className="flex flex-col flex-grow">

            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded h-fit"
              onClick={() => {
                reset({ employeeName: '', salary: '', departmentID: '' });
                onSaved(null);
              }}
            >
              {t('employee.cancel')}
            </button>

          </div>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;