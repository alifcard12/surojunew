import { RiCoupon3Fill } from "react-icons/ri";
import React from "react";

const Kupon = () => {
  return (
    <div className="bg-white rounded  shadow-lg mt-5 p-5">
      <form>
        <label htmlFor="kupon" className="mb-2 text-sm font-medium text-gray-900 sr-only ">
          kupon
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiCoupon3Fill />
          </div>
          <input type="text" id="kupon" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500" placeholder="Masukkan kode kupon....." required />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Kupon;
