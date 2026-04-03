import React, { useState } from 'react';
import './NavBar.css';
import logoImage from '../asset/sheeplogo.png';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaGamepad, FaChild } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';
import { GiTeacher, GiArchiveRegister } from 'react-icons/gi';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { MdDashboard, MdMenuBook, MdTimer } from 'react-icons/md';
import { FaTrophy } from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../notifications/NotificationBell';

const Navbar = ({ darkModeButton, mode }) => {
  const [menu, setMenu] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);
  const handleMenu = () => setMenu(!menu);
  const handleNavLinkDisappear = () => setMenu(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    handleNavLinkDisappear();
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/teacher-dashboard';
      case 'teacher': return '/teacher-dashboard';
      case 'parent': return '/parent-dashboard';
      default: return '/student-dashboard';
    }
  };

  const NavIconButton = ({ to, icon, label, onClick }) => (
    <Link to={to} activeclassname='active'>
      <button onClick={onClick}>
        <div
          className='w-18 h-28 p-3 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <IconContext.Provider value={{ color: 'white', size: 40 }}>
            {icon}
          </IconContext.Provider>
        </div>
        <div>
          <p className='text-teal font-fonts text-sm'>{label}</p>
        </div>
      </button>
    </Link>
  );

  return (
    <React.Fragment>
      <section className='bg-teal-500'>
        <nav className='w-full h-12 px-5 pt-4 pb-4 flex items-center justify-between md:w-4/5 md:mx-auto'>
          <div className='flex-grow'>
            <Link to='/'>
              <img
                loading='lazy'
                width={130}
                height={10}
                src={logoImage}
                alt='ScholarSheep logo'
                className='hidden md:block absolute left-2 top-1 w-24 h-8'
              />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className='text-2xl text-black md:hidden'>
            {!menu ? (
              <div className='flex gap-10 left-5'>
                {darkModeButton}
                <AiOutlineMenu onClick={handleMenu} />
              </div>
            ) : (
              <div className='flex gap-10 left-5 -top-4'>
                {darkModeButton}
                <AiOutlineClose onClick={handleMenu} />
              </div>
            )}
          </div>

          {/* ===== DESKTOP NAV ===== */}
          <nav className='hidden md:block md:container pl-2'>
            <div className='flex justify-between text-xl'>
              <div className='flex text-black space-x-10'>
                <NavIconButton to='/books' icon={<ImBooks />} label='BOOKS' />
                <NavIconButton to='/games' icon={<FaGamepad />} label='GAMES' />
                <NavIconButton to='/timer' icon={<MdTimer />} label='TIMER' />

                {/* Admin sees Teachers + Students */}
                {isAuthenticated && user?.role === 'admin' && (
                  <>
                    <NavIconButton to='/teachers' icon={<GiTeacher />} label='TEACHERS' />
                    <NavIconButton to='/students' icon={<FaChild />} label='STUDENTS' />
                  </>
                )}

                {/* Teacher (not admin) sees only My Students */}
                {isAuthenticated && user?.role === 'teacher' && (
                  <NavIconButton to='/students' icon={<FaChild />} label='MY STUDENTS' />
                )}

                {/* Reading log for logged-in users */}
                {isAuthenticated && (
                  <>
                    <NavIconButton to='/my-books' icon={<MdMenuBook />} label='MY BOOKS' />
                    <NavIconButton to={getDashboardLink()} icon={<MdDashboard />} label='DASHBOARD' />
                  </>
                )}
              </div>

              <div className='flex pl-2 space-x-4'>
                {!isAuthenticated ? (
                  <>
                    <NavIconButton to='/register' icon={<GiArchiveRegister />} label='SIGNUP' />
                    <NavIconButton to='/login' icon={<IoIosLogIn />} label='LOGIN' />
                  </>
                ) : (
                  <>
                  {/* Teacher notification bell */}
                  {hasRole('teacher') && (
                    <div className='flex items-center mt-3'>
                      <NotificationBell />
                    </div>
                  )}
                  <div>
                    <button onClick={handleLogout}>
                      <div
                        className='w-18 h-28 p-3 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      >
                        <IconContext.Provider value={{ color: 'white', size: 40 }}>
                          <IoIosLogOut />
                        </IconContext.Provider>
                      </div>
                      <div>
                        <p className='text-teal font-fonts text-sm'>LOGOUT</p>
                      </div>
                    </button>
                    {user && (
                      <p className='text-xs text-center text-teal-900 mt-1 truncate max-w-[80px]'>
                        {user.username}
                      </p>
                    )}
                  </div>
                  </>
                )}

                {/* Dark mode toggle */}
                <div>
                  <div
                    className='w-16 h-28 p-3 mt-0.5 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <IconContext.Provider value={{ color: 'white' }}>
                      <p className='w-18 text-center rounded-md'>
                        {darkModeButton}
                      </p>
                    </IconContext.Provider>
                  </div>
                  <div className='text-teal font-fonts text-sm'>
                    {mode === 'light' ? 'LIGHT MODE' : 'DARKMODE'}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </nav>

        {/* ===== MOBILE NAV ===== */}
        <nav className='md:hidden'>
          <Link to='/'>
            <img
              loading='lazy'
              width={70}
              src={logoImage}
              alt='ScholarSheep logo'
              className='absolute left-4 top-1 w-14 h-8'
            />
          </Link>

          {menu && (
            <div className='text-xl border-t text-black mx-5'>
              <div className='space-y-6 py-4'>
                <Link to='/about'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>ABOUT</p>
                </Link>
                <Link to='/books'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>BOOKS</p>
                </Link>
                <Link to='/timer'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>TIMER</p>
                </Link>
                <Link to='/games'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>GAMES</p>
                </Link>

                {/* Admin sees Teachers + Students */}
                {isAuthenticated && user?.role === 'admin' && (
                  <>
                    <Link to='/teachers'>
                      <p className='mt-2' onClick={handleNavLinkDisappear}>TEACHERS</p>
                    </Link>
                    <Link to='/students'>
                      <p className='mt-2' onClick={handleNavLinkDisappear}>STUDENTS</p>
                    </Link>
                  </>
                )}

                {/* Teacher (not admin) sees only My Students */}
                {isAuthenticated && user?.role === 'teacher' && (
                  <Link to='/students'>
                    <p className='mt-2' onClick={handleNavLinkDisappear}>MY STUDENTS</p>
                  </Link>
                )}

                {/* Reading log & Dashboard links */}
                {isAuthenticated && (
                  <>
                    <Link to='/my-books'>
                      <p className='mt-2' onClick={handleNavLinkDisappear}>MY BOOKS</p>
                    </Link>
                    <Link to='/my-stats'>
                      <p className='mt-2' onClick={handleNavLinkDisappear}>MY STATS</p>
                    </Link>
                    <Link to='/my-stickers'>
                      <p className='mt-2' onClick={handleNavLinkDisappear}>STICKERS</p>
                    </Link>
                    <Link to={getDashboardLink()}>
                      <p className='mt-2' onClick={handleNavLinkDisappear}>DASHBOARD</p>
                    </Link>
                  </>
                )}

                {!isAuthenticated ? (
                  <>
                    <Link to='/register'>
                      <p className='mt-2' onClick={handleNavLinkDisappear}>SIGNUP</p>
                    </Link>
                    <Link to='/login'>
                      <p className='mt-2' onClick={handleNavLinkDisappear}>LOGIN</p>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className='mt-2 text-teal-800 text-sm'>
                      Signed in as <strong>{user?.username}</strong> ({user?.role})
                    </p>
                    <p className='mt-2 cursor-pointer text-red-600' onClick={handleLogout}>
                      LOGOUT
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </section>
    </React.Fragment>
  );
};

export default Navbar;
