import React from "react";
import logoImage from '../asset/ScholarSheep.png';


const ThirdParentForm = ({ onChange, formValues }) => {
  return (
    <div className="w-full max-w-sm bg-teal-lighter">
      <form className="bg-white shadow-lg rounded px-24 pt-10 pb-6 rounded-md ">
      <div className='flex items-center justify-center'>
            <img className=' h-12 w-18 rounded-full' src={logoImage} alt='' />
      </div>
      <h1 className="text-gray-700 pb-8 font-bold text-center text-2xl">Login Info</h1>
        {/* <div className="grid gap-4 place-content-center items-center">
          <h1 className="text-gray-700 pb-8 font-bold text-2xl">Login Info</h1>
        </div> */}
        <div className="mb-6 ">
          <label
            className=" text-gray-700 text-sm font-bold mb-2"
            htmlFor="grade"
          >
          GRADE
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grade"
            name="grade"
            onChange={onChange}
            value={formValues.grade}
            type="text"
            placeholder="
          Grade"
          ></input>
        </div>
        
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            value={formValues.password}
            onChange={onChange}
            type="password"
            placeholder="******************"
          ></input>
        </div>
         <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            ConfirmPassword
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            onChange={onChange}
            placeholder="******************"
          ></input>
        </div>
         {/* <div className="flex justify-items-center content-center items-center">
          <label
            className="block text-gray-700 px-2  text-sm font-bold mb-2"
            htmlFor="Terms"
          >
            Terms
          </label>
          <input
            name="terms"
            value={formValues.terms}
            onChange={onChange}
            className="shadow cursor-pointer border rounded"
            type="checkbox"
          />
        </div> 
        <div className="flex items-center justify-between"></div> */}
      </form>
      {/* <p className="text-center text-gray-500 text-xs">
        &copy;2022 Form Stepper. All rights reserved.
      </p> */}
    </div>
  );
};

export default ThirdParentForm;
