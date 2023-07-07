import React, { useState } from "react";
import newRequest from "../../../utils/newRequest";
import Swal from "sweetalert2";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const ModalEditAcara = ({ acara, onClose, fetchAcara }) => {
  const [editData, setEditData] = useState({
    namaAcara: acara.namaAcara,
    tglAcara: acara.tglAcara,
    waktuMulai: acara.waktuMulai,
    waktuSelesai: acara.waktuSelesai,
    tempatAcara: acara.tempatAcara,
    alamatAcara: acara.alamatAcara,
    maps: acara.maps,
    zonaWaktu: acara.zonaWaktu,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditAcara = async (e) => {
    e.preventDefault(); // Menghentikan perilaku default form submit

    try {
      await newRequest.put(`/api/acara/${acara._id}`, editData);

      fetchAcara();

      onClose();

      Swal.fire({
        icon: "success",
        title: "Acara berhasil diubah!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Mengubah nilai tglAcara menjadi format tanggal yang sesuai
  const formattedTglAcara = new Date(editData.tglAcara).toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-80 rounded-lg shadow-lg">
        <div className="text-xl text-white font-medium px-4 py-3 bg-gradient-to-b from-red-400 to-primary-600 rounded-t-lg flex justify-between">
          <p>Edit Acara</p>
          <button onClick={onClose}>
            <MdCancel />
          </button>
        </div>
        <hr />
        <form className="p-4 max-h-96 overflow-y-auto" onSubmit={handleEditAcara}>
          <div className="mb-2">
            <label htmlFor="namaAcara" className="block text-sm text-gray-500">
              Nama Acara:
            </label>
            <input type="text" name="namaAcara" value={editData.namaAcara} onChange={handleChange} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
          </div>
          <div className="mb-2">
            <label htmlFor="tglAcara" className="block text-sm text-gray-500">
              Tanggal:
            </label>
            <input type="date" name="tglAcara" value={formattedTglAcara} onChange={handleChange} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
          </div>
          <div className="mb-2">
            <label htmlFor="waktuMulai" className="block text-sm text-gray-500">
              Waktu Mulai:
            </label>
            <input type="time" name="waktuMulai" value={editData.waktuMulai} onChange={handleChange} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
          </div>
          <div className="mb-2">
            <label htmlFor="waktuSelesai" className="block text-sm text-gray-500">
              Waktu Selesai:
            </label>
            <input type="time" name="waktuSelesai" value={editData.waktuSelesai} onChange={handleChange} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
          </div>
          <div className="mb-2">
            <label htmlFor="tempatAcara" className="block text-sm text-gray-500">
              Tempat Acara:
            </label>
            <input type="text" name="tempatAcara" value={editData.tempatAcara} onChange={handleChange} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
          </div>
          <div className="mb-2">
            <label htmlFor="alamatAcara" className="block text-sm text-gray-500">
              Alamat Acara:
            </label>
            <textarea name="alamatAcara" value={editData.alamatAcara} onChange={handleChange} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="maps" className="block text-sm text-gray-500">
              Maps:
            </label>
            <input type="text" name="maps" value={editData.maps} onChange={handleChange} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
          </div>
          <div className="mb-2">
            <label htmlFor="zonaWaktu" className="block text-sm text-gray-500">
              Zona Waktu:
            </label>
            <select id="zonaWaktu" value={editData.zonaWaktu} onChange={handleChange} className="px-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full">
              <option value="WIB">WIB - Waktu Indonesia Barat</option>
              <option value="WITA">WITA - Waktu Indonesia Tengah</option>
              <option value="WIT">WIT - Waktu Indonesia Timur</option>
            </select>
          </div>

          <div className="flex justify-end pt-3">
            <button type="submit" className="px-2 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none flex items-center">
              <div className="mr-1">
                <FaRegSave />
              </div>
              Simpan
            </button>
            <button onClick={onClose} className="ml-2 px-2 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none  flex items-center">
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

export default ModalEditAcara;
