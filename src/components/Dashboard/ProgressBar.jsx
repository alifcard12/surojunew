import React from "react";
import { BsFillChatFill, BsPhoneFill, BsFillPersonFill } from "react-icons/bs";

const ProgressBar = () => {
  const totalGuests = 50;
  const totalWhatsapp = 25;
  const totalSmartWhatsapp = 10;
  const guestmaxProgress = 100;
  const whatsappmaxProgress = 100;
  const smartWhatsappmaxProgress = 100;

  const guestProgress = (totalGuests / guestmaxProgress) * 100;
  const whatsappProgress = (totalWhatsapp / whatsappmaxProgress) * 100;
  const smartWhatsappProgress = (totalSmartWhatsapp / smartWhatsappmaxProgress) * 100;

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white mt-5 py-5">
      <div className="w-full px-5">
        <div className="flex items-center pb-5">
          <div className="mr-3 bg-blue-500 rounded-full p-1 text-white">
            <BsFillPersonFill />
          </div>
          <div className="w-full">
            <h2 className="text-slate-700 text-md">Total Tamu</h2>
            <div className="flex items-end">
              <div className="text-blue-500 mr-1 text-lg"> {totalGuests}</div> /<div className="text-gray-500 ml-1 text-sm"> {guestmaxProgress}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-lg">
              <div className="bg-blue-500 h-1 rounded-lg" style={{ width: `${guestProgress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="flex items-center pb-5">
          <div className="mr-3 bg-green-500 rounded-full p-1 text-white">
            <BsFillChatFill />
          </div>
          <div className="w-full">
            <h2 className="text-slate-700 text-md">Total Whatsapp</h2>
            <div className="flex items-end">
              <div className="text-green-500 mr-1 text-lg"> {totalWhatsapp}</div>/<div className="text-gray-500 ml-1 text-sm"> {whatsappmaxProgress}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-lg">
              <div className="bg-green-500 h-1 rounded-lg" style={{ width: `${whatsappProgress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-3 bg-pink-500 rounded-full p-1 text-white">
            <BsPhoneFill />
          </div>
          <div className="w-full">
            <h2 className="text-slate-700 text-md">Total Smart Whatsapp</h2>
            <div className="flex items-end">
              <div className="text-pink-500 mr-1 text-lg"> {totalSmartWhatsapp}</div> /<div className="text-gray-500 ml-1 text-sm"> {smartWhatsappmaxProgress}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-lg">
              <div className="bg-pink-500 h-1 rounded-lg" style={{ width: `${smartWhatsappProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
