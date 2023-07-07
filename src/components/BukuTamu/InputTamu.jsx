import React, { useState } from "react";
import InputAtom from "../../atoms/InputAtom";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";

const InputTamu = ({ onSubmit, onClose }) => {
  const [namaTamu, setNamaTamu] = useState("");
  const [alamatTamu, setAlamatTamu] = useState("");
  const [noWa, setNoWa] = useState("");
  const [namaSlug, setNamaSlug] = useState("");
  const [alamatSlug, setAlamatSlug] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const namaSlugValue = namaTamu.trim().replace(/\s+/g, "-");
    const alamatSlugValue = alamatTamu.trim().replace(/\s+/g, "-");

    onSubmit({ namaTamu, noWa, alamatTamu, namaSlug: namaSlugValue, alamatSlug: alamatSlugValue });

    setNamaTamu("");
    setNoWa("");
    setAlamatTamu("");
    setNamaSlug("");
    setAlamatSlug("");
  };

  const handleClose = () => {
    onClose();
    setNamaTamu("");
    setNoWa("");
    setAlamatTamu("");
    setAlamatSlug("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImport = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        jsonData.forEach((row) => {
          const namaTamu = row[0];
          const alamatTamu = row[1];
          const noWa = row[2];

          const namaSlugValue = namaTamu.trim().replace(/\s+/g, "-");
          const alamatSlugValue = alamatTamu.trim().replace(/\s+/g, "-");

          onSubmit({ namaTamu, noWa, alamatTamu, namaSlug: namaSlugValue, alamatSlug: alamatSlugValue });
        });

        setFile(null);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-80 rounded-lg shadow-lg">
        <div className="text-xl text-white font-medium px-4 py-3 bg-gradient-to-b from-red-400 to-primary-600 rounded-t-lg flex justify-between">
          <p>Tambah Tamu</p>
          <button onClick={handleClose}>
            <MdCancel />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-500 pb-1" htmlFor="namaTamu">
              Nama Tamu:
            </label>
            <InputAtom
              id="namaTamu"
              type="text"
              placeholder="Isi nama tamu..."
              value={namaTamu}
              onChange={(e) => {
                setNamaTamu(e.target.value);
                setNamaSlug(e.target.value.trim().replace(/\s+/g, "-"));
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 pb-1" htmlFor="alamatTamu">
              Alamat Tamu:
            </label>
            <InputAtom
              id="alamatTamu"
              placeholder="Isi alamat tamu..."
              value={alamatTamu}
              onChange={(e) => {
                setAlamatTamu(e.target.value);
                setAlamatSlug(e.target.value.trim().replace(/\s+/g, "-"));
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 pb-1" htmlFor="noWa">
              Whatsapp:
            </label>
            <InputAtom
              id="noWa"
              type="number"
              placeholder="Ex: 628123456789"
              value={noWa}
              onChange={(e) => {
                setNoWa(e.target.value);
              }}
              required
            />
            <label className="block text-xxxs text-gray-500 pt-1">* Isi dengan kode negara, ex: 628123456789</label>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500 pb-1" htmlFor="importExcel">
              Import dari Excel:
              <div className="bg-green-500 text-white w-fit flex items-center gap-1 text-base py-1 px-2 rounded cursor-pointer">
                <SiMicrosoftexcel /> Pilih File
              </div>
            </label>
            <input id="importExcel" type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="hidden" />
            {file && (
              <button type="button" className="px-3 py-2 text-sm sm:text-md rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleImport}>
                Import
              </button>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className="mr-2 px-3 py-2 text-sm sm:text-md rounded-md border text-white bg-red-500 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
              onClick={handleClose}
            >
              <div className="mr-1">
                <MdCancel />
              </div>
              Batal
            </button>
            <button type="submit" className="px-3 py-2 text-sm sm:text-md rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center">
              <div className="mr-1">
                <FaRegSave />
              </div>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputTamu;
