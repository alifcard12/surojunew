import React, { useState, useEffect } from "react";
import newRequest from "../../../utils/newRequest";
import Swal from "sweetalert2";
import { FaRegSave } from "react-icons/fa";

const Countdown = ({ acara, fetchAcara }) => {
  const [selectedAcara, setSelectedAcara] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedOption(acara && acara.some((item) => item.countdown === "Y") ? acara.find((item) => item.countdown === "Y")._id : "");
  }, [acara]);

  const handleCountdownChange = async (e) => {
    e.preventDefault();

    if (selectedAcara) {
      try {
        const updatedAcaraList = acara.map((item) => ({
          ...item,
          countdown: item._id === selectedAcara ? "Y" : "N",
        }));

        await Promise.all(updatedAcaraList.map((item) => newRequest.put(`/api/acara/${item._id}/set-countdown`, item)));

        Swal.fire({
          icon: "success",
          title: "Countdown berhasil diubah!",
          showConfirmButton: false,
          timer: 1500,
        });

        fetchAcara();

        setSelectedOption(selectedAcara);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Terjadi kesalahan saat mengubah countdown.", "error");
      }
    }
  };

  if (!acara || acara.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm  mb-2 bg-gradient-to-r from-primary-600 to-danger-600 px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow w-fit">Countdown</h3>
      <div className="px-5 pb-5">
        <form className="w-full pt-5" onSubmit={handleCountdownChange}>
          <label className="text-slate-500" htmlFor="countdown">
            Pilih acara untuk dijadikan countdown
          </label>
          <select
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setSelectedAcara(e.target.value);
            }}
            className="bg-white border border-gray-300 mt-1 px-2 py-2 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 w-full cursor-pointer"
          >
            <option value="" disabled>
              {acara && acara.some((item) => item.countdown === "Y") ? acara.find((item) => item.countdown === "Y").namaAcara : "Pilih Acara"}
            </option>
            {acara.map((item) => (
              <option value={item._id} key={item._id}>
                {item.namaAcara}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-1 bg-primary-500 hover:bg-primary-600 text-white p-2 rounded mt-5" type="submit">
            <div className="">
              <FaRegSave />
            </div>
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Countdown;
