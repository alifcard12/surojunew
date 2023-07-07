import React, { useState, useEffect } from "react";
import newRequest from "../../../utils/newRequest";
import Swal from "sweetalert2";

const MempelaiEditWanita = ({ mempelaiId }) => {
  const [mempelai, setMempelai] = useState(null);
  const [mempelaiWanita, setMempelaiWanita] = useState("");
  const [namaPanggilanWanita, setNamaPanggilanWanita] = useState("");
  const [ayahWanita, setAyahWanita] = useState("");
  const [ibuWanita, setIbuWanita] = useState("");
  const [fotoWanita, setFotoWanita] = useState(null);
  const [currentFotoWanita, setCurrentFotoWanita] = useState(null);

  useEffect(() => {
    fetchMempelai();
  }, []);
  // Mendapatkan data mempelai berdasarkan ID saat komponen dimuat

  const fetchMempelai = async () => {
    try {
      const response = await newRequest.get(`/api/mempelai/${mempelaiId}`);
      setMempelai(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Set nilai awal field input dengan data mempelai yang diambil dari server
  useEffect(() => {
    if (mempelai) {
      setMempelaiWanita(mempelai.mempelaiWanita);
      setNamaPanggilanWanita(mempelai.namaPanggilanWanita);
      setAyahWanita(mempelai.ayahWanita);
      setIbuWanita(mempelai.ibuWanita);
      setCurrentFotoWanita(mempelai.fotoWanita);
    }
  }, [mempelai]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("mempelaiWanita", mempelaiWanita);
      formData.append("namaPanggilanWanita", namaPanggilanWanita);
      formData.append("ayahWanita", ayahWanita);
      formData.append("ibuWanita", ibuWanita);
      formData.append("fotoWanita", fotoWanita);

      const response = await newRequest.put(`/api/mempelai/wanita/${mempelai._id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Data mempelai berhasil diupdate!",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchMempelai();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal mengupdate data mempelai!",
      });
    }
  };

  if (!mempelai) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <form onSubmit={handleFormSubmit}>
        <h1 className="bg-gradient-to-r from-primary-600 to-danger-600 text-sm w-fit px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">Data Mempelai Wanita</h1>
        <div className="px-5 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7 pt-5">
          <div className="flex flex-col mb-4">
            <label className="block font-medium text-xs sm:text-base text-primary-500 mb-1">Mempelai Wanita</label>
            <input type="text" value={mempelaiWanita} onChange={(e) => setMempelaiWanita(e.target.value)} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="block font-medium text-xs sm:text-base text-primary-500 mb-1">Nama Panggilan Wanita</label>
            <input type="text" value={namaPanggilanWanita} onChange={(e) => setNamaPanggilanWanita(e.target.value)} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="block font-medium text-xs sm:text-base text-primary-500 mb-1">Ayah Wanita</label>
            <input type="text" value={ayahWanita} onChange={(e) => setAyahWanita(e.target.value)} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="block font-medium text-xs sm:text-base text-primary-500 mb-1">Ibu Wanita</label>
            <input type="text" value={ibuWanita} onChange={(e) => setIbuWanita(e.target.value)} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="block font-medium text-xs sm:text-base text-primary-500 mb-1">Foto Wanita</label>
            <div className="flex gap-10 items-center">
              {currentFotoWanita && <img src={`${import.meta.env.VITE_API_URL}${currentFotoWanita}`} alt="Current Foto Wanita" className="my-2 w-28 sm:w-40 h-28 sm:h-40 rounded-lg" />}
              <label htmlFor="fotoWanita" className="block cursor-pointer ">
                <div className="bg-primary-500 hover:bg-primary-600 flex justify-center items-center h-9  text-white px-4  text-sm rounded-md focus:outline-none">Ubah Foto</div>
              </label>
            </div>
            <input type="file" id="fotoWanita" name="fotoWanita" onChange={(e) => setFotoWanita(e.target.files[0])} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 hidden" />
          </div>
        </div>
        <div className="pt-4 flex items-center space-x-4 ml-5">
          <button type="submit" className="bg-primary-500 hover:bg-primary-600 flex justify-center items-center  text-white px-4 py-2 rounded-md focus:outline-none">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default MempelaiEditWanita;
