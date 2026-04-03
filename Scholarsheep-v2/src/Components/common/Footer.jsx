import logoImage from '../asset/ScholarSheep.png';
import { Link } from 'react-router-dom';
import DataModeToggle from './DataModeToggle';

const Footer = () => {
  return (
    <div className='mt-4'>
      <div className='bg-teal-500 pt-5 '>
        <div className='max-w-screen-lg px-4 sm:px-6 text-teal-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto'>
          <div className='flex justify-center mt-6 -pl-10'>
            <Link to='/'>
              <img
                src={logoImage}
                alt='logo'
                className=' w-14 h-16'
              />
            </Link>
            <h3 className='font-bold text-xl text-black-600 mt-2'>ScholarSheep</h3>
            
          </div>
          <div className='p-5'>
            <div className='text-sm uppercase text-black-600 font-bold'>
              Resources
            </div>
            <a className='my-3 block' href='/'>
              Home <span className='text-teal-600 text-xs p-1'></span>
            </a>
            <a className='my-3 block' href='/info'>
              How it Works<span className='text-teal-600 text-xs p-1'></span>
            </a>
          </div>
          <div className='p-5'>
            <div className='text-sm uppercase text-black-600 font-bold'>
              Support
            </div>
            <a className='my-3 block' href='/policy'>
              Privacy Policy <span className='text-teal-600 text-xs p-1'></span>
            </a>
            <a className='my-3 block' href='/about'>
             About Me <span className='text-teal-600 text-xs p-1'></span>
            </a>
          </div>
          <div className='p-5'>
            {/* <div className='text-sm uppercase text-black-600 font-bold'>
              Contact us
            </div> */}
            <a className='my-3 block' href='/contact'>
             Contact<span className='text-teal-600 text-xs p-1'></span>
            </a>
            <a className='my-3 block' href='/#'>
              XX-XX,Floor 32 , New York ,NY{' '}
              <span className='text-teal-600 text-xs p-1'></span>
            </a>
            <a className='md:my-3 block ' href='/#'>
              contact@scholarsheep.com{' '}
              <span className='text-teal-600 text-xs p-1'></span>
            </a>
          </div>
        </div>
      </div>

      <div className='bg-teal-500 pt-2'>
        <div
          className='flex pb-5 px-3 m-auto pt-5 border-t text-teal-800 text-sm flex-col
      max-w-screen-lg items-center'
        >
           <a href='https://www.freepik.com/free-vector/monster-404-error-concept-illustration_7906238.htm#page=2&query=404%20color%20green&position=19&from_view=search&track=ais' className='text-xs'>
        Image by storyset on Freepik monster
      </a>
          <div className='md:flex-auto md:flex-row-reverse mt-2 flex-row flex'></div>
          <div className='my-3'>
            <DataModeToggle />
          </div>
          <div className='my-2'>
            © Copyright 2020. Scholar Sheep All Rights Reserved.
          </div>
        </div>
      </div>

     
    </div>
  );
};
export default Footer;
