import React from "react";
import logoImage from '../asset/ScholarSheep.png';

const SecondForm = ({ formValues, onChange, option }) => {
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
            htmlFor="school_address"
          >
            SCHOOL ADDRESS
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="school_address"
            name="school_address"
            type="text"
            placeholder="Address"
            value={formValues.school_address}
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="school_district"
          >
          SCHOOL DISTRICT
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="school_district"
            name="school_district"
            type="text"
            placeholder="district"
            value={formValues.school_district}
            onChange={onChange}
          />
        </div>{" "}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="zipcode"
          >
            ZIP CODE
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zipcode"
            type="text"
            name="zipcode"
            value={formValues.zipcode}
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

export default SecondForm;
