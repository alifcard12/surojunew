import React, { useState, useEffect } from "react";
import newRequest from "../../../utils/newRequest";
import Swal from "sweetalert2";

const PosisiMempelai = ({ mempelaiId }) => {
  const [mempelai, setMempelai] = useState(null);
  const [posisiMempelai, setPosisiMempelai] = useState("");

  useEffect(() => {
    fetchMempelai();
  }, []);

  const fetchMempelai = async () => {
    try {
      const response = await newRequest.get(`/api/mempelai/${mempelaiId}`);
      setMempelai(response.data);
      setPosisiMempelai(response.data.posisiMempelai);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newRequest.put(`/api/mempelai/posisi/${mempelaiId}`, { posisiMempelai });

      Swal.fire({
        icon: "success",
        title: "Data mempelai berhasil diupdate!",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchMempelai();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="bg-gradient-to-r from-primary-600 to-danger-600  text-sm w-fit px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">Data Posisi Mempelai</h1>
      <form className="pt-5 mx-5" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="posisiMempelai" className="block font-medium text-xs sm:text-base text-primary-500 mb-1">
            Posisi Mempelai
          </label>
          <select id="posisiMempelai" name="posisiMempelai" className="w-full p-2 border rounded text-xs sm:text-base" value={posisiMempelai} onChange={(e) => setPosisiMempelai(e.target.value)}>
            <option value="pw">Pria - Wanita</option>
            <option value="wp">Wanita - Pria</option>
          </select>
        </div>
        <button type="submit" className="bg-primary-500 hover:bg-primary-600 flex justify-center items-center text-white px-4 py-2 rounded-md focus:outline-none">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default PosisiMempelai;
