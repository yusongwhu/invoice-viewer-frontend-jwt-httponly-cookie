import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import API from '../api';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white font-bold rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white font-bold rounded-md px-3 py-2';

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      await API.post('/auth/logout');
      navigate('/');
    } catch (err) {}
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang); // Save preference
  };

  return (
    <nav className='bg-gray-800 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
              </span>
            </NavLink>
            <div className='md:ml-auto flex items-center space-x-2'>
              <NavLink to='/invoice' className={linkClass}>
                {t('nav.invoices')}
              </NavLink>
              <NavLink to='/book' className={linkClass}>
                {t('nav.books')}
              </NavLink>
              <NavLink to='/Department' className={linkClass}>
                {t('nav.departments')}
              </NavLink>
              <NavLink to='/Employees' className={linkClass}>
                {t('nav.employees')}
              </NavLink>
              <button
                className="bg-gray-800 border-indigo-500 text-white font-bold hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                onClick={handleLogout}
              >
                {t('nav.logout')}
              </button>

              {/* Language Switcher */}
              <select
                className="ml-2 bg-gray-700 text-white rounded px-2 py-1"
                value={i18n.language}
                onChange={handleLanguageChange}
              >
                <option value="en">EN</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;