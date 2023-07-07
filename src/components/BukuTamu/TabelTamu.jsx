import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdPaperPlane } from "react-icons/io";
import { FaSortAlphaDown, FaSortAlphaUpAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import ModalTamu from "./ModalTamu";
import newRequest from "../../utils/newRequest";

const TabelTamu = ({ data, fetchData, handleSort, sortColumn, sortOrder }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTamu, setSelectedTamu] = useState(null);
  const [salam, setSalam] = useState([]);
  const [domain, setDomain] = useState([]);

  useEffect(() => {
    fetchSalam();
    fetchDomain();
  }, []);
  const fetchDomain = async () => {
    try {
      const response = await newRequest.get("/api/order");
      setDomain(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSalam = async () => {
    try {
      const response = await newRequest.get("/api/salam");
      setSalam(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async ({ namaTamu, alamatTamu, namaSlug, noWa, alamatSlug }) => {
    try {
      const response = await newRequest.put(`/api/tamu/${selectedTamu._id}`, {
        namaTamu,
        noWa,
        alamatTamu,
        namaSlug,
        alamatSlug,
      });

      fetchData();

      // Tampilkan notifikasi sukses jika perlu
    } catch (error) {
      console.error(error);
      // Tampilkan notifikasi error jika ada
    }
  };

  const handleEdit = (tamu) => {
    setSelectedTamu(tamu);
    setIsEditModalOpen(true);
  };

  const getStatusColor = (status) => {
    if (status === "Pending") {
      return "bg-yellow-300";
    } else if (status === "Dikirim") {
      return "bg-green-300";
    } else {
      return "bg-red-300";
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin akan menghapus data tamu?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await newRequest.delete(`/api/tamu/${id}`);
        fetchData();

        Swal.fire({
          icon: "success",
          title: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Terjadi kesalahan saat menghapus item.", "error");
    }
  };

  const handleSendWhatsApp = async (tamu) => {
    try {
      // Mengirim pesan WhatsApp
      window.location.href = `https://api.whatsapp.com/send/?phone=${tamu.noWa}&text=${salam.salamWa
        .replace("[Nama Tamu]", tamu.namaTamu)
        .replace("[Alamat Tamu]", tamu.alamatTamu)
        .replace(/\n/g, "%0A")
        .replace("[Link Undangan]", import.meta.env.VITE_CLIENT_URL + "/" + domain.domain + "?" + tamu.namaSlug)}`;

      // Memperbarui statusKirim menjadi "Dikirim"
      await newRequest.put(`/api/tamu/${tamu._id}/kirim`, { statusKirim: "Dikirim" });

      fetchData();

      Swal.fire({
        icon: "success",
        title: "Tamu berhasil dikirim!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Tampilkan notifikasi sukses jika perlu
    } catch (error) {
      console.error(error);
      await newRequest.put(`/api/tamu/${tamu._id}/kirim`, { statusKirim: "Gagal" });
      Swal.fire("Error", "Terjadi kesalahan saat mengirim pesan.", "error");
      // Tampilkan notifikasi error jika ada
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary-500">
          <tr>
            <th onClick={() => handleSort("namaTamu")} className={`whitespace-nowrap py-3 text-center sm:text-left text-xxxs sm:text-base font-medium text-white capitalize cursor-pointer ${sortColumn === "namaTamu" ? "font-bold" : ""}`}>
              <div className="flex justify-between sm:mr-5 mx-1 items-center pl-2">
                Nama Tamu {sortColumn === "namaTamu" && (sortOrder === "asc" ? <FaSortAlphaUpAlt /> : <FaSortAlphaDown />)}
                {sortColumn !== "namaTamu" && <FaSortAlphaDown />}
              </div>
            </th>
            <th
              onClick={() => handleSort("alamatTamu")}
              className={`whitespace-nowrap py-3 text-center sm:text-left text-xxxs sm:text-base font-medium text-white capitalize cursor-pointer ${sortColumn === "alamatTamu" ? "font-bold" : ""}`}
            >
              <div className="flex justify-between sm:mr-5 mx-1 items-center">
                Alamat Tamu {sortColumn === "alamatTamu" && (sortOrder === "asc" ? <FaSortAlphaUpAlt /> : <FaSortAlphaDown />)}
                {sortColumn !== "alamatTamu" && <FaSortAlphaDown />}
              </div>
            </th>
            <th className="py-3 text-center text-xxxs sm:text-base font-medium text-white capitalize">No Wa</th>
            <th onClick={() => handleSort("statusKirim")} className={`whitespace-nowrap py-3 text-center text-xxxs sm:text-base font-medium text-white capitalize cursor-pointer ${sortColumn === "statusKirim" ? "font-bold" : ""}`}>
              <div className="flex justify-between sm:mr-5 mx-1 items-center">
                Status Kirim {sortColumn === "statusKirim" && (sortOrder === "asc" ? <FaSortAlphaUpAlt /> : <FaSortAlphaDown />)}
                {sortColumn !== "statusKirim" && <FaSortAlphaDown />}
              </div>
            </th>

            <th className="py-3 text-center text-xxxs sm:text-base font-medium text-white capitalize">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {data.map((tamu, index) => (
            <tr key={tamu._id}>
              <td className="py-1 sm:py-2 whitespace-nowrap capitalize text-xxxs sm:text-base pl-3">{tamu.namaTamu}</td>
              <td className="pl-2 py-1 sm:py-2 whitespace-nowrap capitalize text-xxxs sm:text-base">{tamu.alamatTamu}</td>
              <td className="pl-2 py-1 sm:py-2 whitespace-nowrap capitalize text-xxxs sm:text-base">{tamu.noWa}</td>
              <td className="px-1 py-1 sm:py-2 whitespace-nowrap text-center text-xxs sm:text-base">
                <div className={`inline-block w-fit px-1 rounded-full text-xxxs sm:text-xxs text-slate-700 ${getStatusColor(tamu.statusKirim)}`}>
                  <span className="inline-block">{tamu.statusKirim}</span>
                </div>
              </td>

              <td className="py-1 sm:py-2 whitespace-nowrap text-center px-2">
                <button className="bg-green-400 hover:bg-green-500 text-white px-1 sm:px-2 py-1 text-xxs sm:text-lg mr-1 sm:mr-2 rounded" onClick={() => handleSendWhatsApp(tamu)}>
                  <IoMdPaperPlane />
                </button>

                <button className="bg-blue-400 hover:bg-blue-500 text-white px-1 sm:px-2 py-1 text-xxs sm:text-lg mr-1 sm:mr-2 rounded" onClick={() => handleEdit(tamu)}>
                  <BiEdit />
                </button>
                <button className="bg-red-400 hover:bg-red-500 text-white px-1 sm:px-2 py-1 text-xxs sm:text-lg rounded" onClick={() => handleDelete(tamu._id)}>
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalTamu isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} tamu={selectedTamu} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default TabelTamu;
