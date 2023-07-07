import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import ModalAddAcara from "../../components/Pengaturan/Acara/ModalAddAcara";
import ModalEditAcara from "../../components/Pengaturan/Acara/ModalEditAcara";
import { MdOutlineDateRange, MdPlace, MdLibraryAdd } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const Cerita = () => {
  const [acara, setAcara] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedAcara, setSelectedAcara] = useState(null);

  useEffect(() => {
    fetchAcara();
  }, []);

  const fetchAcara = async () => {
    try {
      const response = await newRequest.get("/api/acara/");
      setAcara(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModalAdd = () => {
    setShowModalAdd(!showModalAdd);
  };

  const toggleModalEdit = (acara) => {
    setSelectedAcara(acara);
    setShowModalEdit(!showModalEdit);
  };

  const handleDeleteAcara = async (acaraId) => {
    try {
      await newRequest.delete(`/api/acara/${acaraId}`);
      fetchAcara();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" bg-[url('/assets/hero2.png')] bg-[length:100%_270px] bg-no-repeat ">
      <h2 className="text-2xl text-primary-500 font-medium mb-4 mx-5">Daftar Cerita</h2>
      <div className=" gap-5 mx-5">
        <div className="bg-white rounded shadow-lg p-5 mb-5 w-full h-fit"> ini teks</div>
        <button className="flex items-center gap-1 bg-primary-500 hover:bg-primary-600 text-white p-2 rounded" onClick={toggleModalAdd}>
          <MdLibraryAdd /> Tambah Cerita
        </button>
        <div className="w-full">
          <ul>
            {acara &&
              acara.map((item) => (
                <li key={item._id} className="mb-4">
                  <div className="bg-white rounded-lg shadow-lg pb-4 ">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm  mb-2 bg-gradient-to-r from-primary-600 to-danger-600 px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">{item.namaAcara}</h3>
                      <div className="flex gap-2 mr-3 mt-2">
                        <button className="flex items-center outline outline-1 rounded px-2 outline-success-500 text-success-500 hover:bg-success-100" onClick={() => toggleModalEdit(item)}>
                          <BiEdit /> Edit
                        </button>
                        <button className="outline outline-1 rounded px-2 outline-danger-500 text-danger-500 hover:bg-danger-100" onClick={() => handleDeleteAcara(item._id)}>
                          <RiDeleteBin5Line />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-5">
                      <MdOutlineDateRange /> {new Date(item.tglAcara).toLocaleDateString("en-GB")}
                    </div>
                    <div className="flex items-center gap-2 pl-5">
                      <HiOutlineClock />
                      <div className="flex gap-0">
                        <p>{item.waktuMulai}</p>-
                        <p>
                          {item.waktuSelesai} {item.zonaWaktu}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-5">
                      <MdPlace />
                      <p>{item.tempatAcara}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {showModalAdd && <ModalAddAcara onClose={toggleModalAdd} />}
      {showModalEdit && <ModalEditAcara acara={selectedAcara} onClose={toggleModalEdit} />}
    </div>
  );
};

export default Cerita;
