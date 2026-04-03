import React, { useState, useEffect, useRef } from 'react';

import logoImage from '../asset/ScholarSheep.png';
import { MdLanguage } from 'react-icons/md';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { MdInfoOutline } from 'react-icons/md';
import { RiTeamLine } from 'react-icons/ri';
import { FaGamepad } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';

import { FaChild } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { IoIosLogIn } from 'react-icons/io';
// import { SiTheregister } from 'react-icons/si';
import { GiArchiveRegister } from 'react-icons/gi';
// import CircleType from 'circletype';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [booksMenuOpen, setBooksMenuOpen] = useState(false);
  const [gamesMenuOpen, setGamesMenuOpen] = useState(false);

  const [gamesMenuMobile, setGamesMenuMobile] = useState(false);
  const [booksMenuMobile, setBooksMenuMobile] = useState(false);

  const handleBooksMenu = () => {
    setBooksMenuOpen(!booksMenuOpen);
    setMenu(false);
  };
  const handleGamesMenu = () => {
    setGamesMenuOpen(!gamesMenuOpen);
  };
  // const handleGamesClick = () => {
  //   setIsGamesOpen(!isGamesOpen);
  // };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  // function to display menu
  const handleMenu = () => {
    setMenu(!menu);
  };

  // function to display games menu
  const handleGamesMenuMobile = () => {
    setGamesMenuMobile(!gamesMenuMobile);
  };

  // function to display books menu
  const handleBooksMenuMobile = () => {
    setBooksMenuMobile(!booksMenuMobile);
  };

  // function to make the navLinks disappear when clicked on the small screen
  const handleNavLinkDisappear = () => {
    setMenu(false);
  };
  // const circleInstance = useRef();

  // useEffect(() => {
  //   new CircleType(circleInstance.current).dir(-1).radius(250);
  // }, []);

  return (
    <React.Fragment>
      <section className='bg-teal-500'>
        <nav className='w-full h-12 px-5 pt-4 pb-4 flex items-center justify-between md:w-4/5 md:mx-auto'>
          <div className='flex-grow'>
            <Link to='/'>
              <img
                src={logoImage}
                width='150px'
                height='150px'
                style={{ borderRadus: '50%' }}
                alt='logo'
                className='hidden md:block absolute -left-1 -top-0 p-2 '
                // className='absolute -left-40 -top-8 w-14 h-12'
              />
            </Link>
          </div>

          <div className='text-2xl text-black md:hidden'>
            {menu === false ? (
              <AiOutlineMenu onClick={handleMenu} />
            ) : (
              <AiOutlineClose onClick={handleMenu} />
            )}
          </div>

          {/* large screen */}
          <nav className='hidden md:block md:container pl-6 '>
            <div className='flex justify-between text-xl'>
              <div className='flex text-black space-x-10'>
                {/* <Link to='/'>
                  <p className=''>Home</p>
                </Link> */}

                {/* <Link to='/about'>
                  <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {/* <p className=''>ABOUT</p> *
                      <IconContext.Provider
                        value={{ color: 'white', size: 50 }}
                      >
                        <RiTeamLine />
                      </IconContext.Provider>
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>ABOUT</p>
                      )}
                    </div>
                  </button>
                </Link> */}

                <Link to='/info' activeClassName='active'>
                  {/* <p className=''>INFO</p> */}
                  <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500 hover:text-white'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <IconContext.Provider
                        value={{ color: 'white', size: 50 }}
                      >
                        <MdInfoOutline />
                      </IconContext.Provider>
                      {/* <p ref={circleInstance}>INFO</p> */}
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>INFO</p>
                      )}
                    </div>
                  </button>
                </Link>

                <Link to='/books' activeClassName='active'>
                  {/* <p className=''>BOOKS</p> */}
                  {/* <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <IconContext.Provider
                        value={{
                          color: 'white',
                          size: 50,
                          style: { cursor: 'pointer' },
                        }}
                      >
                        <ImBooks />
                      </IconContext.Provider>
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>BOOKS</p>
                      )}
                    </div>
                  </button> */}
                  {/* <p className=''>BOOKS</p> */}

                  {/* the submenu if needed */}
                  <div className='relative group h-0 '>
                    <button>
                      {/* onClick={handleBooksMenu}> */}
                      <div
                        className='w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      >
                        <IconContext.Provider
                          value={{ color: 'white', size: 50 }}
                        >
                          <ImBooks />
                        </IconContext.Provider>
                      </div>
                      <div>
                        {isHovering && (
                          <p className='text-rosered font-fonts text-sm'>
                            BOOKS
                          </p>
                        )}
                      </div>
                    </button>

                    {/* {booksMenuOpen && ( */}
                    <div className='z-10 absolute w-full hidden group-hover:block bg-teal-500 shadow-md rounded w-40 -mt-6 py-2'>
                      <Link to='/books/level'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          ReadingLevel
                        </button>
                      </Link>
                      <Link to='/books/casual'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          Casual Reading
                        </button>
                      </Link>
                    </div>
                    {/* )} */}
                  </div>
                </Link>

                <Link to='/dictionary' activeClassName='active'>
                  <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {/* <p className=''>ABOUT</p> */}
                      <IconContext.Provider
                        value={{ color: 'white', size: 50 }}
                      >
                        <MdLanguage />
                      </IconContext.Provider>
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>
                          DICTIONARY
                        </p>
                      )}
                    </div>
                  </button>
                </Link>

                <Link to='/games'>
                  {/* <p className=''>BOOKS</p> */}
                  {/* <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <IconContext.Provider
                        value={{
                          color: 'white',
                          size: 50,
                          style: { cursor: 'pointer' },
                        }}
                      >
                        <ImBooks />
                      </IconContext.Provider>
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>GAMES</p>
                      )}
                    </div> 
                  </button>*/}
                  <div className='relative group h-0'>
                    <button>
                      {/* onClick={handleGamesMenu}> */}
                      <div
                        className='w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      >
                        <IconContext.Provider
                          value={{ color: 'white', size: 50 }}
                        >
                          <FaGamepad />
                        </IconContext.Provider>
                      </div>
                      <div>
                        {isHovering && (
                          <p className='text-rosered font-fonts text-sm'>
                            GAMES
                          </p>
                        )}
                      </div>
                    </button>
                    {/* {gamesMenuOpen && ( */}
                    <div
                      className='z-10 absolute  w-50 hidden group-hover:block bg-teal-500 shadow-md rounded py-2 '
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <Link to='/games/rsp'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          RockPaperScissor
                        </button>
                      </Link>
                      <Link to='/games/paint'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          Paint app
                        </button>
                      </Link>
                      <Link to='/games/etchsketch'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          Etch A Sketch
                        </button>
                      </Link>
                      <Link to='/games/memorygames'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          Memory games
                        </button>
                      </Link>
                    </div>
                    {/* )} */}
                  </div>
                </Link>

                <Link to='/teachers' activeClassName='active'>
                  {/* <p className='' onClick={handleNavLinkDisappear}>
                    TEACHERS
                  </p> */}
                  <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <IconContext.Provider
                        value={{ color: 'white', size: 50 }}
                      >
                        <GiTeacher />
                      </IconContext.Provider>
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>
                          TEACHERS
                        </p>
                      )}
                    </div>
                  </button>
                </Link>

                <Link to='/students' activeClassName='active'>
                  {/* <p className='' onClick={handleNavLinkDisappear}>
                    STUDENTS
                  </p> */}
                  <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <IconContext.Provider
                        value={{ color: 'white', size: 50 }}
                      >
                        <FaChild />
                      </IconContext.Provider>
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>
                          STUDENTS
                        </p>
                      )}
                    </div>
                  </button>
                </Link>

                {/* <Link to='/logs'>
                  <p className='' onClick={handleNavLinkDisappear}>
                    Logs
                  </p>

                </Link>  */}
              </div>
              <div className='flex pl-2 space-x-4'>
                <Link to='/signup' activeClassName='active'>
                  <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border     border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <IconContext.Provider
                        value={{ color: 'white', size: 50 }}
                      >
                        {/* color: '#115e59' */}
                        <p
                          className='w-18 text-center rounded-md'
                          onClick={handleNavLinkDisappear}
                        >
                          {/* <SiTheregister /> */}
                          <GiArchiveRegister />
                        </p>
                      </IconContext.Provider>
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>
                          SIGNUP
                        </p>
                      )}
                    </div>
                  </button>
                </Link>
                <Link to='/login' activeClassName='active'>
                  <button>
                    <div
                      className=' w-18 h-28 p-2 rounded-full border border-teal-800 border-2 bg-teal-600 hover:bg-teal-500'
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <IconContext.Provider
                        value={{ color: 'white', size: 50 }}
                      >
                        <p
                          className='w-18 text-center rounded-md'
                          onClick={handleNavLinkDisappear}
                        >
                          <IoIosLogIn />
                        </p>
                      </IconContext.Provider>
                    </div>
                    <div>
                      {isHovering && (
                        <p className='text-rosered font-fonts text-sm'>LOGIN</p>
                      )}
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </nav>

        {/* mobile screen */}
        <nav className='md:hidden'>
          <Link to='/'>
            <img
              width='0px'
              height='0px'
              src={logoImage}
              alt='logo'
              className='absolute -left-1 -top-1 w-14 h-12'
            />
          </Link>
          {menu && (
            <div className='text-xl border-t text-black mx-5'>
              <div className='space-y-6 py-4 '>
                {/* <Link to='/'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>
                    HOME
                  </p>
                </Link>*/}

                <Link to='/about'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>
                    ABOUT
                  </p>
                </Link>

                {/* <Link to='/books'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>
                    BOOKS
                  </p>
                </Link> */}
                <Link to='/books'>
                  <div className='relative group h-0'>
                    <button>
                      <div
                        className='w-18 h-28 hover:bg-grey-500'
                        onMouseOver={handleBooksMenuMobile}
                        onMouseOut={handleBooksMenuMobile}
                      >
                        <p className='mt-2'>BOOKS</p>
                      </div>
                    </button>
                    {/* <div
                      className='z-10 absolute  w-50 hidden group-hover:block bg-gray-300 shadow-md rounded py-2 '
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <Link to='/books/level'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          ReadingLevel
                        </button>
                      </Link>
                      <Link to='/books/casual'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          Causal Reading
                        </button>
                      </Link>
                    </div> */}
                    {/* {booksMenuMobile && ( */}
                    <div className='absolute left-0 py-2 w-48 bg-white rounded-md shadow-xl'>
                      <Link to='/books/level'>
                        <p className='mt-2'>ReadingLevel</p>
                      </Link>
                      <Link to='/books/casual'>
                        <p className='mt-2' onClick={handleNavLinkDisappear}>
                          Casual
                        </p>
                      </Link>
                    </div>
                    {/* )} */}
                  </div>
                </Link>
                <Link to='/info'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>
                    INFO
                  </p>
                </Link>
                <Link to='/dictionary'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>
                    DICTIONARY
                  </p>
                </Link>

                <Link to='/games'>
                  <div className='relative group h-0'>
                    <button>
                      <div
                        className='w-18 h-28 hover:bg-grey-500'
                        onMouseOver={handleBooksMenuMobile}
                        onMouseOut={handleBooksMenuMobile}
                      >
                        <p className='mt-2'>GAMES</p>
                      </div>
                    </button>
                    <div
                      className='z-10 absolute  w-50 hidden group-hover:block bg-gray-300 shadow-md rounded py-2 '
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <Link to='/games/rsp'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          RockPaperScissor
                        </button>
                      </Link>
                      <Link to='/games/memorygames'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          Memory Games
                        </button>
                      </Link>
                      <Link to='/games/paint'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          Paint app
                        </button>
                      </Link>
                      <Link to='/games/etchsketch'>
                        <button
                          className='block px-4 py-2 text-black-800 hover:bg-teal-400'
                          onClick={handleNavLinkDisappear}
                        >
                          Etch A Sketch
                        </button>
                      </Link>
                    </div>
                    {/* {gamesMenuMobile && (
                      <div className='absolute left-0 w-48 py-2 bg-white rounded-md shadow-xl'>
                        <Link to='/games/rsp'>
                          <p className='mt-2' onClick={handleNavLinkDisappear}>
                            RockPaperScissor
                          </p>
                        </Link>
                        <Link to='/games/paint'>
                          <p className='mt-2' onClick={handleNavLinkDisappear}>
                            Paint
                          </p>
                        </Link>
                      </div>
                    )} */}
                  </div>
                </Link>

                <Link to='/teachers'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>
                    TEACHERS
                  </p>
                </Link>
                <Link to='/students'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>
                    STUDENTS
                  </p>
                </Link>

                <Link to='/signup'>
                  <p className='mt-2' onClick={handleNavLinkDisappear}>
                    {' '}
                    SIGNUP
                  </p>
                </Link>
                <Link to='/login'>
                  <p className='mt-2 ' onClick={handleNavLinkDisappear}>
                    LOGIN
                  </p>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </section>
    </React.Fragment>
  );
};

export default Navbar;
// {/* https://dev.to/ebereplenty/react-icons-tutorial-all-you-need-to-know-524 */}
// https://blog.reactplay.io/create-a-super-cool-navbar-using-react-and-tailwindcss(for sidebar)
