import React from "react";
import logoImage from '../asset/ScholarSheep.png';


const FirstForm = ({ formValues, onChange }) => {
  return (
    <div className="w-full max-w-smn bg-teal-lighter">
      <form className="bg-white shadow-lg  px-24 pt-10 pb-6 rounded-md">
      <div className='flex items-center justify-center'>
            <img className=' h-12 w-18 rounded-full' src={logoImage} alt='' />
           
      </div>
          <h1 className=" items-center justify-center text-gray-darkest pb-8 font-bold  text-center text-2xl">Person Info</h1>
        {/* <div className="grid gap-4 place-content-center items-center">
          <h1 className="text-gray-700 pb-8 font-bold text-2xl">Person Info</h1>
        </div> */}
        <div className="mb-4">
          <label
            className="block text-gray-darkest text-sm font-bold mb-2"
            htmlFor="teacher_name"
          >
            NAME
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darkest "
            id="teacher_name"
            name="teacher_name"
            type="text"
            placeholder="Name"
            onChange={onChange}
            value={formValues.teacher_name}
          ></input>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-darkest text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            LASTNAME
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darkest leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            name="lastname"
            onChange={onChange}
            value={formValues.lastname}
            type="text"
            placeholder="LastName"
          ></input>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-darkest text-sm font-bold mb-2"
            htmlFor="teacher_email"
          >
            EMAIL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darkest leading-tight focus:outline-none focus:shadow-outline"
            id="teacher_email"
            name="teacher_email"
            onChange={onChange}
            value={formValues.teacher_email}
            type="email"
            placeholder="
            Email"
          ></input>
        </div>
        <p className='font-semibold mb-2 text-center'>
              Already Registered? Goto{' '}
              <a href='/login/teacher-login'>
                <span className='text-teal-700'>Login</span>
              </a>
        </p>
        {/* <div className="flex items-center justify-between"></div> */}
      </form>
     </div>
   
  );
};

export default FirstForm;
