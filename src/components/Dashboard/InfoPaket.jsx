import React, { useState } from "react";
import { MdCancel, MdOutlineShoppingCartCheckout, MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const InfoPaket = () => {
  const [isHidden, setIsHidden] = useState(false);

  const handleClose = () => {
    setIsHidden(true);
  };

  if (isHidden) {
    return null; // Jika isHidden bernilai true, komponen InfoPaket tidak ditampilkan
  }
  return (
    <div className="bg-success-100 rounded-lg border border-green-600 shadow-lg ">
      {/* <span className="text-sm  mb-2 bg-gradient-to-r h-fit from-primary-600 to-danger-600 px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">Masa Berlaku</span> */}
      <div className="flex justify-between items-start">
        <div className="mx-5 text-success-700 text-xs">
          <div className="pt-3 text-sm font-medium flex items-center">
            <div className="mr-1">
              <MdVerified />
            </div>
            Undangan anda telah aktif (Trial)
          </div>
          <p>Masa berlaku undangan anda tinggal 1 hari </p>
          <p className="flex ">Silahkan Upgrade paket anda, untuk menikmati fitur lainnya</p>
        </div>
        <button className="text-red-600 m-2 text-lg" onClick={handleClose}>
          <MdCancel />
        </button>
      </div>
      <div className="flex justify-end pb-3 pt-2">
        <Link className="bg-green-600 hover:bg-green-500 text-white p-1 px-2 mx-3 rounded text-xs flex items-center h-fit w-fit" to="/dashboard/upgrade">
          <div className="mr-1">
            <MdOutlineShoppingCartCheckout />
          </div>
          Upgrade
        </Link>
      </div>
    </div>
  );
};

export default InfoPaket;
