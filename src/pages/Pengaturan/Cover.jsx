import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";

const EditCover = () => {
  const [cover, setCover] = useState(null);
  const [judul, setJudul] = useState("");
  const [namaMempelai, setNamaMempelai] = useState("");
  const [imageCover, setImageCover] = useState(null);
  const [currentFotoCover, setCurrentFotoCover] = useState(null);

  useEffect(() => {
    fetchCover();
  }, []);

  const fetchCover = async () => {
    try {
      const response = await newRequest.get("/api/cover/");
      setCover(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cover) {
      setJudul(cover.judul);
      setNamaMempelai(cover.namaMempelai);
      setCurrentFotoCover(cover.imageCover);
    }
  }, [cover]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("namaMempelai", namaMempelai);
      formData.append("imageCover", imageCover);

      const response = await newRequest.put(`/api/cover/${cover?._id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Cover berhasil diupdate!",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchCover();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal mengupdate data cover!",
      });
    }
  };

  if (!cover) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-5">
      <h1 className=" py-5 text-2xl  font-bold text-primary-400 ">Edit Cover</h1>
      <div className="w-full  bg-white rounded-lg bg-opacity-40 shadow-lg pb-5">
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-sm w-fit  mb-2 bg-gradient-to-r from-primary-600 to-danger-600 px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">Edit Cover</h1>
          <div className="text-base leading-6 text-gray-700 sm:text-lg sm:leading-7 pt-5 mx-5">
            <div className="flex flex-col mb-4">
              <label className="block font-medium text-xs sm:text-base text-primary-500 mb-1">Judul</label>
              <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block font-medium text-xs sm:text-base text-primary-500 mb-1">Nama Mempelai</label>
              <input type="text" value={namaMempelai} onChange={(e) => setNamaMempelai(e.target.value)} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block font-medium text-xs sm:text-base text-primary-500 mb-1">Foto Cover</label>
              <span className="text-xs text-slate-400">*disarankan menggunakan foto portrait</span>
              <div className="flex gap-10 items-center">
                {currentFotoCover && <img src={`${import.meta.env.VITE_API_URL}${currentFotoCover}`} alt="Current Foto Cover" className="my-2 w-32 sm:w-40 h-52 sm:h-60 rounded-lg" />}
                <label htmlFor="imageCover" className="block cursor-pointer">
                  <div className="bg-primary-500 hover:bg-primary-600 flex justify-center items-center h-9 text-white px-4 text-sm rounded-md focus:outline-none">Ubah Foto</div>
                </label>
              </div>
              <input type="file" id="imageCover" name="imageCover" onChange={(e) => setImageCover(e.target.files[0])} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 hidden" />
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-4 ml-5">
            <button type="submit" className="bg-primary-500 hover:bg-primary-600 flex justify-center items-center text-white px-4 py-2 rounded-md focus:outline-none">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCover;
