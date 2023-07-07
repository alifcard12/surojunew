import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import newRequest from "../../utils/newRequest";
import InputTamu from "../../components/BukuTamu/InputTamu";
import TabelTamu from "../../components/BukuTamu/TabelTamu";
import Swal from "sweetalert2";
import Pagination from "../../components/Paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

const BukuTamu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataTamu, setDataTamu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Jumlah item yang ingin ditampilkan per halaman
  const [sortColumn, setSortColumn] = useState(""); // Kolom pengurutan saat ini
  const [sortOrder, setSortOrder] = useState("asc"); // Arah pengurutan saat ini
  const [searchTerm, setSearchTerm] = useState(""); // Nilai pencarian

  const fetchData = async () => {
    try {
      const response = await newRequest.get("/api/tamu");
      setDataTamu(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortData = (column) => {
    // Jika kolom yang sama diklik, toggle arah pengurutan
    const newSortOrder = column === sortColumn && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    const sortedData = [...dataTamu].sort((a, b) => {
      const itemA = a[sortColumn] ? a[sortColumn].toLowerCase() : "";
      const itemB = b[sortColumn] ? b[sortColumn].toLowerCase() : "";

      if (itemA < itemB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (itemA > itemB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setDataTamu(sortedData);
  }, [sortColumn, sortOrder]);

  const handleFormSubmit = async (tamu) => {
    try {
      const response = await newRequest.post("/api/tamu/add", tamu);

      Swal.fire({
        icon: "success",
        title: "Data berhasil disimpan!",
        showConfirmButton: false,
        timer: 1500,
      });
      // Memperbarui data tamu setelah berhasil menambahkan tamu baru
      fetchData();

      // Menutup form
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter data tamu berdasarkan nilai pencarian
  const filteredData = dataTamu.filter((tamu) => tamu.namaTamu.toLowerCase().includes(searchTerm.toLowerCase()) || tamu.alamatTamu.toLowerCase().includes(searchTerm.toLowerCase()));

  // Mendapatkan indeks item terakhir pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  // Mendapatkan indeks item pertama pada halaman saat ini
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Mengambil item yang sesuai dengan halaman saat ini
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isOpen && <InputTamu onSubmit={handleFormSubmit} onClose={handleCloseForm} />}
      <h1 className="text-lg font-bold mt-4">Data Tamu</h1>

      <div className="sm:p-5 p-3">
        <div className="mb-2 flex justify-between">
          <div className="flex items-center">
            <div className="bg-primary-500 border border-primary-300 p-2 rounded-l-lg">
              <AiOutlineSearch className="text-white" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Cari tamu..."
              className="px-3 py-2 border border-primary-500 rounded-r-lg text-xs focus:outline-none focus:ring-2 ring-primary-500  focus:border-primary-300"
            />
          </div>
          <button className="bg-primary-500 hover:bg-primary-700 text-white text-xs rounded flex items-center px-2" onClick={() => setIsOpen(true)}>
            <FaPlus className="mr-1" />
            Tambah Tamu
          </button>
        </div>
        <TabelTamu data={currentData} fetchData={fetchData} handleSort={sortData} sortColumn={sortColumn} sortOrder={sortOrder} />

        <Pagination itemsPerPage={itemsPerPage} totalItems={filteredData.length} currentPage={currentPage} paginate={paginate} />
      </div>
    </div>
  );
};

export default BukuTamu;
