import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";

const OrderCover = () => {
  const navigate = useNavigate();
  const [judul, setJudul] = useState("");
  const [namaMempelai, setNamaMempelai] = useState("");
  const [imageCover, setImageCover] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("namaMempelai", namaMempelai);
      formData.append("imageCover", imageCover);

      const response = await newRequest.post("/api/cover/add", formData);

      Swal.fire({
        icon: "success",
        title: "Data imageCover berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form fields
      setJudul("");
      setNamaMempelai("");
      setImageCover(null);

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Terjadi kesalahan saat menambahkan data imageCover.",
      });
    }
  };

  const handleFotoCoverChange = (e) => {
    const file = e.target.files[0];
    setImageCover(file);
  };

  return (
    <div className="h-full text-center mx-5 mb-10">
      <h1 className="text-4xl text-orange-800 font-bold pt-10 sm:pt-20 pb-2">Form Cover!</h1>
      <p className="text-slate-600 pb-8">Silahkan isi data dengan benar</p>
      <div className="bg-white shadow-lg p-5 rounded-lg w-full sm:w-1/3 container sm:mx-auto text-left">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <div className="mb-4">
              <label htmlFor="judul" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Judul
              </label>
              <input type="text" id="judul" name="judul" className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base" value={judul} onChange={(e) => setJudul(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="namaMempelai" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Nama Mempelai
              </label>
              <input
                type="text"
                id="namaMempelai"
                name="namaMempelai"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={namaMempelai}
                onChange={(e) => setNamaMempelai(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageCover" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Pilih Cover
              </label>
              <label htmlFor="imageCover" className="block cursor-pointer text-center">
                <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 bg-slate-100">
                  <RiImageAddLine size={70} className="mx-auto text-gray-400 mb-2" />
                  <div className="text-center text-gray-400">Tambah Gambar</div>
                  <input type="file" id="imageCover" name="imageCover" onChange={handleFotoCoverChange} accept="image/*" className="hidden" />
                </div>
              </label>
              {imageCover && <img src={URL.createObjectURL(imageCover)} alt="Cover" className="w-20 sm:w-40 h-20 sm:h-40 mt-2 object-imageCover" />}
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-3">
            Lanjut
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderCover;
