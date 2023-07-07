import React, { useState, useEffect } from "react";
import newRequest from "../../../utils/newRequest";
import Swal from "sweetalert2";

const EditAcara = ({ acaraId, acara }) => {
  const [namaAcara, setNamaAcara] = useState("");
  const [tglAcara, setTglAcara] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [tempatAcara, setTempatAcara] = useState("");
  const [alamatAcara, setAlamatAcara] = useState("");
  const [maps, setMaps] = useState("");

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const eventData = acara; // Modify this based on your API response structure

      setNamaAcara(eventData.namaAcara);
      setTglAcara(new Date(eventData.tglAcara).toLocaleDateString("en-CA"));
      setWaktuMulai(eventData.waktuMulai);
      setWaktuSelesai(eventData.waktuSelesai);
      setTempatAcara(eventData.tempatAcara);
      setAlamatAcara(eventData.alamatAcara);
      setMaps(eventData.maps);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.put(`/api/acara/${acaraId}`, {
        namaAcara,
        tglAcara,
        waktuMulai,
        waktuSelesai,
        tempatAcara,
        alamatAcara,
        maps,
      });

      Swal.fire({
        icon: "success",
        title: "Data acara berhasil diupdate!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal mengupdate data acara!",
      });
    }
  };

  return (
    <div className="h-full text-center mx-5 mb-10">
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
                placeholder="Ex: Akad Nikah"
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
                placeholder="Ex: Kediaman Mempelai Wanita"
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
                placeholder="Ex: Jl. Pahlawan No. 1"
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
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAcara;
