import { useEffect, useState } from 'react';
import API from '../../api';

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    API.get('/Departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  return departments;
};

export default useDepartments;