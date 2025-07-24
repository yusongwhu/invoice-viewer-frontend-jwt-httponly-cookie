import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import API from '../api';

const Navbar = () => {
    const linkClass = ({ isActive }) =>
        isActive
            ? 'bg-black text-white hover:bg-gray-900 hover:text-white font-bold rounded-md px-3 py-2'
            : 'text-white hover:bg-gray-900 hover:text-white font-bold rounded-md px-3 py-2';

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        try {
            e.preventDefault();
            const res = await API.post('/auth/logout');
            navigate('/');
        } catch (err) {
        }
    };

    return (
        <nav className='bg-gray-800 border-b border-indigo-500'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                        <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
                            <img className='h-10 w-auto' src={logo} alt='React Jobs' />
                            <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                                React Jobs
                            </span>
                        </NavLink>
                        <div className='md:ml-auto'>
                            <div className='flex space-x-2'>
                                <NavLink to='/invoice' className={linkClass}>
                                    Invoices
                                </NavLink>
                                <NavLink to='/book' className={linkClass}>
                                    Books
                                </NavLink>
                                <NavLink to='/Department' className={linkClass}>
                                    Departments
                                </NavLink>
                                <NavLink to='/Employees' className={linkClass}>
                                    Employees
                                </NavLink>
                                <button
                                    className="bg-gray-800 border-indigo-500 text-white font-bold hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
