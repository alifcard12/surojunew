import React from "react";
import { Link } from "react-router-dom";
import { FaBrush, FaPalette, FaChevronRight } from "react-icons/fa";
import Countdown from "./Countdown";

const CardImg = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <img className="w-full h-64 " src="/assets/bgmain.png" alt="Gambar" />
      <div className="">
        <Link to="#" className="text-primary-700 text-base hover:bg-primary-100 flex items-center justify-between sm:px-6 px-3 py-2">
          <div className="flex items-center">
            <FaPalette className="mr-2 text-primary-600" />
            Tema
          </div>
          <FaChevronRight className="ml-1 w-4 h-4 text-primary-500" />
        </Link>
        <hr className="border-primary-300" />
        <Link to="/pengaturan" className="text-primary-700 text-base hover:bg-primary-100 flex items-center justify-between sm:px-6 px-3 py-2">
          <div className="flex items-center">
            <FaBrush className="mr-2 text-primary-600" />
            Ubah Tampilan
          </div>
          <FaChevronRight className="ml-1 w-4 h-4 text-primary-500" />
        </Link>
        <hr className="border-primary-300" />
        <Countdown />
      </div>
    </div>
  );
};

export default CardImg;
