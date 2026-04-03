import React from "react";
import logoImage from '../asset/ScholarSheep.png';

const SecondParentForm = ({ formValues, onChange, option }) => {
  return (
    <div className="w-full max-w-sm bg-teal-lighter">
      <form className="bg-white shadow-lg  px-24 pt-10 pb-6 rounded-md">
      <div className='flex items-center justify-center'>
            <img className=' h-12 w-18 rounded-full' src={logoImage} alt='' />
           
      </div>
      <h1 className="text-gray-700 text-center pb-8 font-bold text-2xl">Other Info</h1>
        {/* <div className="grid gap-4 place-content-center items-center">
          <h1 className="text-gray-700 pb-8 font-bold text-2xl">Other Info</h1>
        </div> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="student_name"
          >
            STUDENT NAME
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="student_name"
            name="student_name"
            type="text"
            placeholder="Address"
            value={formValues.student_name}
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="academic_year"
          >
          ACADEMIC YEAR
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="academic_year"
            name="academic_year"
            type="text"
            placeholder="Academic shcool year"
            value={formValues.academic_year}
            onChange={onChange}
          />
        </div>{" "}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reading_level"
          >
           READING LEVEL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reading_level"
            type="text"
            name="reading_levele"
            value={formValues.reading_level}
            onChange={onChange}
            placeholder="Zip"
          ></input>
        </div>
        <div className="flex items-center justify-between"></div>
      </form>
      {/* <p className="text-center text-gray-500 text-xs">
        &copy;2022 Form Stepper. All rights reserved.
      </p> */}
    </div>
  );
};

export default SecondParentForm;
