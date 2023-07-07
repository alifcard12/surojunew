import React, { useState } from "react";
import newRequest from "../../../utils/newRequest";
import Swal from "sweetalert2";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Modal = ({ onClose, fetchAcara }) => {
  const [namaAcara, setNamaAcara] = useState("");
  const [tglAcara, setTglAcara] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [tempatAcara, setTempatAcara] = useState("");
  const [alamatAcara, setAlamatAcara] = useState("");
  const [maps, setMaps] = useState("");
  const [zonaWaktu, setZonaWaktu] = useState("WIB");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/api/acara/add/", {
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
        title: "Acara berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchAcara();

      // Reset form fields
      setNamaAcara("");
      setTglAcara("");
      setWaktuMulai("");
      setWaktuSelesai("");
      setTempatAcara("");
      setAlamatAcara("");
      setMaps("");
      setZonaWaktu("WIB");

      // Close the modal
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal menambahkan acara!",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-80 rounded-lg shadow-lg ">
        <div className="text-xl text-white font-medium px-4 py-3 bg-gradient-to-b from-red-400 to-primary-600 rounded-t-lg flex  justify-between">
          <p>Tambah Acara</p>
          <button onClick={onClose}>
            <MdCancel />
          </button>
        </div>
        <hr />

        <form className="p-4 max-h-96 overflow-y-auto" onSubmit={handleFormSubmit}>
          <div className="mb-2">
            <label htmlFor="namaAcara" className="block text-sm  text-gray-500">
              Nama Acara:
            </label>
            <input
              placeholder="Akad Nikah"
              type="text"
              id="namaAcara"
              value={namaAcara}
              onChange={(e) => setNamaAcara(e.target.value)}
              className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="tglAcara" className="block text-sm  text-gray-500">
              Tanggal Acara:
            </label>
            <input type="date" id="tglAcara" value={tglAcara} onChange={(e) => setTglAcara(e.target.value)} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" required />
          </div>

          <div className="mb-2">
            <label htmlFor="waktuMulai" className="block text-sm  text-gray-500">
              Waktu Mulai:
            </label>
            <input type="time" id="waktuMulai" value={waktuMulai} onChange={(e) => setWaktuMulai(e.target.value)} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" required />
          </div>

          <div className="mb-2">
            <label htmlFor="waktuSelesai" className="block text-sm  text-gray-500">
              Waktu Selesai:
            </label>
            <input
              type="time"
              id="waktuSelesai"
              value={waktuSelesai}
              onChange={(e) => setWaktuSelesai(e.target.value)}
              className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="zonawaktu" className="block text-sm  text-gray-500">
              Zona Waktu:
            </label>
            <select id="zonaWaktu" value={zonaWaktu} onChange={(e) => setZonaWaktu(e.target.value)} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" required>
              <option value="WIB">WIB - Waktu Indonesia Barat</option>
              <option value="WITA">WITA - Waktu Indonesia Tengah</option>
              <option value="WIT">WIT - Waktu Indonesia Timur</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="tempatAcara" className="block text-sm  text-gray-500">
              Tempat Acara:
            </label>
            <input
              placeholder="Gedung Pernikahan"
              type="text"
              id="tempatAcara"
              value={tempatAcara}
              onChange={(e) => setTempatAcara(e.target.value)}
              className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="alamatAcara" className="block text-sm  text-gray-500">
              Alamat Acara:
            </label>
            <textarea
              placeholder="Jl. Pahlawan No. 123"
              type="text"
              id="alamatAcara"
              value={alamatAcara}
              onChange={(e) => setAlamatAcara(e.target.value)}
              className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="maps" className="block text-sm  text-gray-500">
              Google Maps URL:
            </label>
            <input
              placeholder="https://goo.gl/maps/MrVwiXL4i1KVxZpi8"
              type="text"
              id="maps"
              value={maps}
              onChange={(e) => setMaps(e.target.value)}
              className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button type="submit" className="px-2 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 flex items-center">
              <div className="mr-1">
                <FaRegSave />
              </div>
              Simpan
            </button>
            <button type="button" className="ml-2 px-2 py-1.5 text-sm  bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none flex items-center" onClick={onClose}>
              <div className="mr-1">
                <MdCancel />
              </div>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
