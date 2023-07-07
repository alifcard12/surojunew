import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const OrderAcara = () => {
  const navigate = useNavigate();
  const [namaAcara, setNamaAcara] = useState("");
  const [tglAcara, setTglAcara] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [tempatAcara, setTempatAcara] = useState("");
  const [alamatAcara, setAlamatAcara] = useState("");
  const [maps, setMaps] = useState("");
  const [zonaWaktu, setZonaWaktu] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/api/acara/add", {
        namaAcara,
        tglAcara,
        waktuMulai,
        waktuSelesai,
        tempatAcara,
        alamatAcara,
        maps,
        zonaWaktu,
      });

      Swal.fire({
        icon: "success",
        title: "Data acara berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form fields
      setNamaAcara("");
      setTglAcara("");
      setWaktuMulai("");
      setWaktuSelesai("");
      setTempatAcara("");
      setAlamatAcara("");
      setMaps("");
      setZonaWaktu("");

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Data acara sudah ada!",
      });
    }
  };

  return (
    <div className="h-full text-center mx-5 mb-10">
      <h1 className="text-4xl text-orange-800 font-bold pt-10 sm:pt-20 pb-2">Form Acara!</h1>
      <p className="text-slate-600 pb-8">Silahkan isi data dengan benar</p>
      <div className="bg-white shadow-lg p-5 rounded-lg w-full sm:w-1/3 container sm:mx-auto text-left">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <div className="mb-4">
              <label htmlFor="namaAcara" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Nama Acara
              </label>
              <input
                type="text"
                id="namaAcara"
                name="namaAcara"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={namaAcara}
                onChange={(e) => setNamaAcara(e.target.value)}
                placeholder="Ex : Akad Nikah"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tglAcara" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Tanggal Acara
              </label>
              <input
                type="date"
                id="tglAcara"
                name="tglAcara"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={tglAcara}
                onChange={(e) => setTglAcara(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="waktuMulai" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Waktu Mulai
              </label>
              <input
                type="time"
                id="waktuMulai"
                name="waktuMulai"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={waktuMulai}
                onChange={(e) => setWaktuMulai(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="waktuSelesai" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Waktu Selesai
              </label>
              <input
                type="time"
                id="waktuSelesai"
                name="waktuSelesai"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={waktuSelesai}
                onChange={(e) => setWaktuSelesai(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zonaWaktu" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Zona Waktu
              </label>
              <input
                type="text"
                id="zonaWaktu"
                name="zonaWaktu"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={zonaWaktu}
                onChange={(e) => setZonaWaktu(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tempatAcara" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Tempat Acara
              </label>
              <input
                type="text"
                id="tempatAcara"
                name="tempatAcara"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={tempatAcara}
                onChange={(e) => setTempatAcara(e.target.value)}
                placeholder="Ex : Kediaman Mempelai Wanita"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="alamatAcara" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Alamat Acara
              </label>
              <input
                type="text"
                id="alamatAcara"
                name="alamatAcara"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={alamatAcara}
                onChange={(e) => setAlamatAcara(e.target.value)}
                placeholder="Ex : Jl. Pahlawan No. 1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maps" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
                Link Google Maps
              </label>
              <input
                type="text"
                id="maps"
                name="maps"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 w-full p-2 border rounded text-xs sm:text-base"
                value={maps}
                onChange={(e) => setMaps(e.target.value)}
                placeholder="Masukkan link Google Maps"
              />
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

export default OrderAcara;
