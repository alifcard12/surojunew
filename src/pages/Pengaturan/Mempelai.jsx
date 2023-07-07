import React, { useEffect, useState } from "react";
import MempelaiEditPria from "../../components/Pengaturan/mempelai/MempelaiEditPria";
import MempelaiEditWanita from "../../components/Pengaturan/mempelai/MempelaiEditWanita";
import newRequest from "../../utils/newRequest";
import PosisiMempelai from "../../components/Pengaturan/mempelai/PosisiMempelai";

const Mempelai = () => {
  const [mempelai, setMempelai] = useState(null);

  useEffect(() => {
    // Mendapatkan data pengguna dari server menggunakan token JWT
    const fetchMempelai = async () => {
      try {
        const response = await newRequest.get("/api/mempelai");
        setMempelai(response.data[0]); // Mengambil objek pertama dari array
      } catch (error) {
        console.error(error);
      }
    };

    fetchMempelai();
  }, []);

  return (
    <div className="w-full bg-[url('/assets/hero2.png')] bg-[length:100%_270px] bg-no-repeat ">
      <h1 className=" py-5 text-xl  mx-5 font-bold text-white pt-5">Edit Data Mempelai</h1>
      <div className=" mx-5 gap-5">
        <div className=" h-fit bg-white bg-opacity-40 rounded-lg shadow-lg pb-5">{mempelai && <MempelaiEditPria mempelaiId={mempelai._id} />}</div>
        <div className=" h-fit bg-white bg-opacity-40 rounded-lg shadow-lg pb-5 mt-5">{mempelai && <MempelaiEditWanita mempelaiId={mempelai._id} />}</div>
      </div>
      <div className=" mx-5 gap-5 mt-5">
        <div className=" h-fit bg-white bg-opacity-40 rounded-lg shadow-lg pb-5 mt-5">{mempelai && <PosisiMempelai mempelaiId={mempelai._id} />}</div>
        <div className=" h-fit bg-white bg-opacity-40 rounded-lg shadow-lg pb-5 mt-5">{mempelai && <PosisiMempelai mempelaiId={mempelai._id} />}</div>
      </div>
    </div>
  );
};

export default Mempelai;
