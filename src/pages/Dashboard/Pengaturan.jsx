import React from "react";
import { Link } from "react-router-dom";
import { FaTransgender, FaPalette, FaImages, FaGift, FaRegFileImage } from "react-icons/fa";
import { MdDateRange, MdSettings, MdOutlineChat, MdOutlineDataset } from "react-icons/md";

const Pengaturan = () => {
  return (
    <div className="min-h-screen bg-[url('/assets/hero2.png')] bg-[length:100%_270px] bg-no-repeat">
      <div className=" gap-5 mx-5">
        <div className="w-full">
          <div className="py-10">Ini halaman setting</div>
          <div>
            <h1>Ini halaman Info Setting</h1>
            <div>Paket Tambahan</div>
            <div>Tagihan</div>
          </div>
          <div className="mx-5">
            <div className="w-full gap-5 flex">
              <Link to="/dashboard/pengaturan/tema" className=" grid justify-items-center w-full p-3 sm:p-5 ">
                <FaPalette className=" text-primary-500 hover:text-primary-700 text-5xl sm:text-7xl mb-3" />
                <div className="hover:text-primary-700 text-primary-600 text-xs">Ubah Tema</div>
              </Link>
              <Link to="/dashboard/pengaturan/acara" className=" grid justify-items-center w-full p-3 sm:p-5  ">
                <MdDateRange className=" text-primary-500 hover:text-primary-700 text-5xl sm:text-7xl mb-3" />
                <div className="hover:text-primary-700 text-primary-600 text-xs">Acara</div>
              </Link>
              <Link to="/dashboard/pengaturan/mempelai" className=" grid justify-items-center w-full p-3 sm:p-5 ">
                <FaTransgender className=" text-primary-500 hover:text-primary-700 text-5xl sm:text-7xl mb-3" />
                <div className="hover:text-primary-700 text-primary-600 text-xs">Mempelai</div>
              </Link>
            </div>
            <div className="w-full gap-5 flex mt-5">
              <Link to="/dashboard/pengaturan/cover" className=" grid justify-items-center w-full p-3 sm:p-5 ">
                <FaRegFileImage className=" text-primary-500 hover:text-primary-700 text-5xl sm:text-7xl mb-3" />
                <div className="hover:text-primary-700 text-primary-600 text-xs">Cover</div>
              </Link>
              <Link to="/dashboard/pengaturan/gallery" className=" grid justify-items-center w-full p-3 sm:p-5 ">
                <FaImages className=" text-primary-500 hover:text-primary-700 text-5xl sm:text-7xl mb-3" />
                <div className="hover:text-primary-700 text-primary-600 text-xs">Galeri</div>
              </Link>
              <Link to="/dashboard/pengaturan/data" className=" grid justify-items-center w-full p-3 sm:p-5 ">
                <MdOutlineDataset className=" text-primary-500 hover:text-primary-700 text-5xl sm:text-7xl mb-3" />
                <div className="hover:text-primary-700 text-primary-600 text-xs">Data</div>
              </Link>
            </div>
            <div className="w-full gap-5 flex mt-5">
              <Link to="/dashboard/pengaturan/cerita" className=" grid justify-items-center w-full p-3 sm:p-5 ">
                <MdOutlineChat className=" text-primary-500 hover:text-primary-700 text-5xl sm:text-7xl mb-3" />
                <div className="hover:text-primary-700 text-primary-600 text-xs text-center">Cerita & Quote</div>
              </Link>
              <Link to="/dashboard/pengaturan/gift" className=" grid justify-items-center w-full p-3 sm:p-5 ">
                <FaGift className=" text-primary-500 hover:text-primary-700 text-5xl sm:text-7xl mb-3" />
                <div className="hover:text-primary-700 text-primary-600 text-xs text-center">Gift & Rekening</div>
              </Link>
              <Link to="/dashboard/pengaturan/gift" className=" grid justify-items-center w-full p-3 sm:p-5 "></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;
