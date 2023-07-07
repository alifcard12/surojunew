import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";

const Paket = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [domain, setDomain] = useState("");
  const [tema, setTema] = useState(slug);
  const [paket, setPaket] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/api/order/add", {
        domain,
        tema,
        paket,
      });

      Swal.fire({
        icon: "success",
        title: "Order berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form fields
      setDomain("");
      setTema("");
      setPaket("");

      navigate("/order/mempelai");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal menambahkan order!",
      });
    }
  };

  return (
    <div className="max-h-screen h-full  text-center mx-5">
      <h1 className="text-4xl text-orange-800 font-bold pt-10 sm:pt-20 pb-2">Form Order !</h1>
      <p className="text-slate-600 pb-8">Silahkan isi data dengan benar</p>
      <div className="bg-white shadow-lg p-5 rounded-lg w-full  sm:w-1/3 container  sm:mx-auto text-left ">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="paket" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
              Paket Undangan
            </label>
            <select id="paket" name="paket" className="w-full p-2 border rounded text-xs sm:text-base" value={paket} onChange={(e) => setPaket(e.target.value)}>
              <option value="">Pilih Paket</option>
              <option value="Free">Paket Free - 1 Hari</option>
              <option value="Bronze">Paket Bronze - Rp. 50.000</option>
              <option value="Diamond">Paket Diamond - Rp. 100.000</option>
              <option value="Premium">Paket Premium - Rp. 150.000</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="urlUndangan" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
              Undangan URL
            </label>
            <div className="flex">
              <span className="bg-gray-200 py-2 px-4 rounded-l text-xs sm:text-base">suroju/</span>
              <input type="text" id="urlUndangan" name="urlUndangan" className="w-full p-2 border  text-xs sm:text-base" value={domain} onChange={(e) => setDomain(e.target.value)} />
              <span className="bg-gray-200 py-2 px-2 rounded-r text-xs sm:text-base">.com</span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="temaUndangan" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
              Tema Undangan
            </label>
            <input type="text" id="temaUndangan" name="temaUndangan" className="w-full p-2 border rounded text-xs sm:text-base" value={tema} onChange={(e) => setTema(e.target.value)} disabled />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-3">
            Lanjut
          </button>
        </form>
      </div>
    </div>
  );
};

export default Paket;
