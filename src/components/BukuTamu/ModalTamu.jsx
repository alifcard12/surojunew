import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import InputAtom from "../../atoms/InputAtom";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const ModalTamu = ({ isOpen, onClose, tamu, onSubmit }) => {
  const [namaTamu, setNamaTamu] = useState("");
  const [noWa, setNoWa] = useState("");
  const [alamatTamu, setAlamatTamu] = useState("");
  const [namaSlug, setNamaSlug] = useState("");
  const [alamatSlug, setAlamatSlug] = useState("");

  useEffect(() => {
    if (tamu) {
      setNamaTamu(tamu.namaTamu);
      setNoWa(tamu.noWa);
      setAlamatTamu(tamu.alamatTamu);
      setNamaSlug(tamu.namaSlug);
      setAlamatSlug(tamu.alamatSlug);
    }
  }, [tamu]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const namaSlugValue = namaSlug || namaTamu.trim().replace(/\s+/g, "-");
    const alamatSlugValue = alamatSlug || alamatTamu.trim().replace(/\s+/g, "-");

    try {
      await onSubmit({ namaTamu, noWa, alamatTamu, namaSlug: namaSlugValue, alamatSlug: alamatSlugValue });

      // Menampilkan notifikasi sukses
      Swal.fire({
        icon: "success",
        title: "Data berhasil disimpan!",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (error) {
      // Menampilkan notifikasi error jika ada
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  };

  if (!tamu) {
    return null;
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="bg-white w-80 rounded-lg shadow-lg">
        <div className="text-xl text-white font-medium px-4 py-3 bg-gradient-to-b from-red-400 to-primary-600 rounded-t-lg flex  justify-between">
          <p>Edit Tamu</p>
          <button onClick={onClose}>
            <MdCancel />
          </button>
        </div>
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="namaTamu" className="block text-sm text-gray-500 pb-1">
                Nama Tamu :
              </label>
              <InputAtom
                type="text"
                name="namaTamu"
                id="namaTamu"
                placeholder="Nama Tamu"
                value={namaTamu}
                onChange={(e) => {
                  setNamaTamu(e.target.value);
                  setNamaSlug(e.target.value.trim().replace(/\s+/g, "-"));
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="alamatTamu" className="block text-sm text-gray-500 pb-1">
                Alamat Tamu :
              </label>
              <InputAtom
                type="text"
                name="alamatTamu"
                id="alamatTamu"
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
                Whatsapp
              </label>
              <InputAtom
                id="noWa"
                type="number"
                value={noWa}
                onChange={(e) => {
                  setNoWa(e.target.value);
                }}
                required
              />
              <label className="block text-xxxs  text-gray-500 pt-1">* Isi dengan kode negara, ex: 628123456789</label>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-3 py-2 text-sm sm:text-md rounded-md border text-white bg-red-500 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
                onClick={onClose}
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
    </div>
  );
};

export default ModalTamu;
