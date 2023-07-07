import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { RiMapPinUserFill } from "react-icons/ri";
import { MdOutlineTimelapse } from "react-icons/md";

const AddUcapan = () => {
  const [userId, setUserId] = useState("");
  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [kehadiran, setKehadiran] = useState("");
  const [ucapanList, setUcapanList] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/api/ucapan/add", {
        userId,
        nama,
        ucapan,
        kehadiran,
      });

      // Reset form fields
      setUserId("");
      setNama("");
      setUcapan("");
      setKehadiran("");

      fetchUcapanList(); // Fetch updated ucapan list
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal menambahkan ucapan!",
      });
    }
  };

  const fetchUcapanList = async () => {
    try {
      const response = await newRequest.get("/api/ucapan");

      setUcapanList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUcapanList();
  }, []);

  const sortedUcapanList = ucapanList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const jumlahHadir = ucapanList.filter((ucapan) => ucapan.kehadiran === "hadir").length;
  const jumlahTidakHadir = ucapanList.filter((ucapan) => ucapan.kehadiran === "tidak hadir").length;
  const jumlahMasihRagu = ucapanList.filter((ucapan) => ucapan.kehadiran === "masih ragu").length;
  const jumlahUcapan = ucapanList.length;

  return (
    <div className="bg-primary-100 shadow-lg p-5 rounded-lg w-full  sm:w-1/3 container  sm:mx-auto text-left ">
      <div className="mb-4 text-center space-y-3">
        <p className="text-gray-500 font-bold text-center">{jumlahUcapan} Ucapan</p>
        <div className="flex justify-evenly">
          <div className="bg-success-800 w-24 h-16 text-white rounded-lg shadow flex flex-col justify-center">
            <p className="text-3xl font-bold">{jumlahHadir}</p>
            <p className="text-sm">Hadir</p>
          </div>
          <div className="bg-danger-800 w-24 h-16 text-white rounded-lg shadow flex flex-col justify-center">
            <p className="text-3xl font-bold">{jumlahTidakHadir}</p>
            <p className="text-sm">Tidak Hadir</p>
          </div>
          <div className="bg-yellow-500 w-24 h-16 text-white rounded-lg shadow flex flex-col justify-center">
            <p className="text-3xl font-bold">{jumlahMasihRagu}</p>
            <p className="text-sm">Masih Ragu</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="nama" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
            Nama
          </label>
          <input type="text" id="nama" name="nama" className="w-full p-2 border rounded text-xs sm:text-base text-slate-700" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="ucapan" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
            Ucapan
          </label>
          <textarea id="ucapan" name="ucapan" className="w-full p-2 border rounded text-xs sm:text-base text-slate-700" value={ucapan} onChange={(e) => setUcapan(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="kehadiran" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
            Kehadiran
          </label>
          <select id="kehadiran" name="kehadiran" className="w-full p-2 border rounded text-xs sm:text-base text-slate-700" value={kehadiran} onChange={(e) => setKehadiran(e.target.value)}>
            <option value="">Pilih Kehadiran</option>
            <option value="hadir">Hadir</option>
            <option value="tidak hadir">Tidak Hadir</option>
            <option value="masih ragu">Masih Ragu</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-3">
          Tambah Ucapan
        </button>
      </form>

      <div className="mt-4 h-48 overflow-y-scroll">
        {sortedUcapanList.map((ucapan) => (
          <div key={ucapan._id} className={`border-b my-2 shadow px-4 py-2 ${ucapan.kehadiran === "hadir" ? "bg-green-100" : ucapan.kehadiran === "tidak hadir" ? "bg-red-100" : "bg-yellow-100"} rounded-md `}>
            <div className="flex items-center gap-1 text-lg">
              <p className="font-bold text-amber-800">{ucapan.nama}</p>
              <div className={ucapan.kehadiran === "hadir" ? "text-green-500" : ucapan.kehadiran === "tidak hadir" ? "text-red-500" : "text-yellow-500"}>
                <RiMapPinUserFill />
              </div>
            </div>
            <p className="text-gray-700 mb-1 whitespace-pre-line">{ucapan.ucapan}</p>
            <div className="text-gray-700 font-semibold text-xs mb-1 gap-1 flex items-center">
              <p>
                <MdOutlineTimelapse />
              </p>
              {formatDistanceToNow(new Date(ucapan.createdAt), {
                locale: id,
                addSuffix: true,
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddUcapan;
