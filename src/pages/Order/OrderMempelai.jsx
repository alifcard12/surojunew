import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line, RiImageAddLine } from "react-icons/ri";

const OrderMempelai = () => {
  const navigate = useNavigate();
  const [mempelaiPria, setMempelaiPria] = useState("");
  const [namaPanggilanPria, setNamaPanggilanPria] = useState("");
  const [ayahPria, setAyahPria] = useState("");
  const [ibuPria, setIbuPria] = useState("");
  const [mempelaiWanita, setMempelaiWanita] = useState("");
  const [namaPanggilanWanita, setNamaPanggilanWanita] = useState("");
  const [ayahWanita, setAyahWanita] = useState("");
  const [ibuWanita, setIbuWanita] = useState("");
  const [posisiMempelai, setPosisiMempelai] = useState("");
  const [fotoPria, setFotoPria] = useState(null);
  const [fotoWanita, setFotoWanita] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("mempelaiPria", mempelaiPria);
      formData.append("fotoPria", fotoPria);
      formData.append("namaPanggilanPria", namaPanggilanPria);
      formData.append("ayahPria", ayahPria);
      formData.append("ibuPria", ibuPria);
      formData.append("mempelaiWanita", mempelaiWanita);
      formData.append("fotoWanita", fotoWanita);
      formData.append("namaPanggilanWanita", namaPanggilanWanita);
      formData.append("ayahWanita", ayahWanita);
      formData.append("ibuWanita", ibuWanita);
      formData.append("posisiMempelai", posisiMempelai);

      const response = await newRequest.post("/api/mempelai/add", formData);

      Swal.fire({
        icon: "success",
        title: "Data mempelai berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form fields
      setMempelaiPria("");
      setFotoPria(null);
      setNamaPanggilanPria("");
      setAyahPria("");
      setIbuPria("");
      setMempelaiWanita("");
      setFotoWanita(null);
      setNamaPanggilanWanita("");
      setAyahWanita("");
      setIbuWanita("");
      setPosisiMempelai("");

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Terjadi kesalahan saat menambahkan data mempelai.",
      });
    }
  };

  const handleFotoPriaChange = (e) => {
    const file = e.target.files[0];
    setFotoPria(file);
  };

  const handleFotoWanitaChange = (e) => {
    const file = e.target.files[0];
    setFotoWanita(file);
  };

  console.log(fotoPria);

  return (
    <div className="h-full text-center mx-5 mb-10">
      <h1 className="text-4xl text-orange-800 font-bold pt-10 sm:pt-20 pb-2">Form Mempelai!</h1>
      <p className="text-slate-600 pb-8">Silahkan isi data dengan benar</p>
      <div className="bg-white shadow-lg p-5 rounded-lg w-full sm:w-1/3 container sm:mx-auto text-left">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <div className="mb-4">
              <label htmlFor="mempelaiPria" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Nama Lengkap Pria
              </label>
              <input
                type="text"
                id="mempelaiPria"
                name="mempelaiPria"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={mempelaiPria}
                onChange={(e) => setMempelaiPria(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fotoPria" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Foto Pria
              </label>
              <label htmlFor="fotoPria" className="block cursor-pointer text-center">
                <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 bg-slate-100">
                  <RiImageAddLine size={70} className="mx-auto text-gray-400 mb-2" />
                  <div className="text-center text-gray-400">Tambah Gambar</div>
                  <input type="file" id="fotoPria" name="fotoPria" onChange={handleFotoPriaChange} accept="image/*" className="hidden" multiple />
                </div>
              </label>
              {fotoPria && <img src={URL.createObjectURL(fotoPria)} alt="Foto Pria" className="w-20 sm:w-40 h-20 sm:h-40 mt-2 object-cover" />}
            </div>
            <div className="mb-4">
              <label htmlFor="namaPanggilanPria" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Nama Panggilan Pria
              </label>
              <input
                type="text"
                id="namaPanggilanPria"
                name="namaPanggilanPria"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={namaPanggilanPria}
                onChange={(e) => setNamaPanggilanPria(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ayahPria" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Ayah Pria
              </label>
              <input
                type="text"
                id="ayahPria"
                name="ayahPria"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={ayahPria}
                onChange={(e) => setAyahPria(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ibuPria" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Ibu Pria
              </label>
              <input type="text" id="ibuPria" name="ibuPria" className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base" value={ibuPria} onChange={(e) => setIbuPria(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="mempelaiWanita" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Nama Lengkap Wanita
              </label>
              <input
                type="text"
                id="mempelaiWanita"
                name="mempelaiWanita"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={mempelaiWanita}
                onChange={(e) => setMempelaiWanita(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fotoWanita" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Foto Wanita
              </label>
              <label htmlFor="fotoWanita" className="block cursor-pointer text-center">
                <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 bg-slate-100">
                  <RiImageAddLine size={70} className="mx-auto text-gray-400 mb-2" />
                  <div className="text-center text-gray-400">Tambah Gambar</div>
                  <input type="file" id="fotoWanita" name="fotoWanita" onChange={handleFotoWanitaChange} accept="image/*" className="hidden" multiple />
                </div>
              </label>
              {fotoWanita && <img src={URL.createObjectURL(fotoWanita)} alt="Foto Wanita" className="w-20 sm:w-40 h-20 sm:h-40 mt-2 object-cover" />}
            </div>
            <div className="mb-4">
              <label htmlFor="namaPanggilanWanita" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Nama Panggilan Wanita
              </label>
              <input
                type="text"
                id="namaPanggilanWanita"
                name="namaPanggilanWanita"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={namaPanggilanWanita}
                onChange={(e) => setNamaPanggilanWanita(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ayahWanita" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Ayah Wanita
              </label>
              <input
                type="text"
                id="ayahWanita"
                name="ayahWanita"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={ayahWanita}
                onChange={(e) => setAyahWanita(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ibuWanita" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Ibu Wanita
              </label>
              <input
                type="text"
                id="ibuWanita"
                name="ibuWanita"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={ibuWanita}
                onChange={(e) => setIbuWanita(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="posisiMempelai" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Posisi Mempelai
              </label>
              <select
                id="posisiMempelai"
                name="posisiMempelai"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={posisiMempelai}
                onChange={(e) => setPosisiMempelai(e.target.value)}
              >
                <option value="">Pilih Posisi</option>
                <option value="pw">Pria - Wanita</option>
                <option value="wp">Wanita - Pria</option>
              </select>
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

export default OrderMempelai;
