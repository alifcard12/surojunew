import { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";

const Data = () => {
  const [salam, setSalam] = useState(null);

  useEffect(() => {
    fetchSalam();
  }, []);

  const fetchSalam = async () => {
    try {
      const response = await newRequest.get("/api/salam");
      setSalam(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSalamWa = async (e) => {
    e.preventDefault();

    try {
      const salamWa = e.target.elements.salamWa.value;

      await newRequest.put(`/api/salam/salamWa/${salam._id}`, { salamWa });

      Swal.fire({
        icon: "success",
        title: "Data salam whatsapp berhasil diupdate!",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchSalam();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSalamPembuka = async (e) => {
    e.preventDefault();

    try {
      const salamPembuka = e.target.elements.salamWa.value;

      await newRequest.put(`/api/salam/salamPembuka/${salam._id}`, { salamPembuka });

      Swal.fire({
        icon: "success",
        title: "Data salam pembuka berhasil diupdate!",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchSalam();
    } catch (error) {
      console.error(error);
    }
  };
  const handleQuote = async (e) => {
    e.preventDefault();

    try {
      const quote = e.target.elements.salamWa.value;

      await newRequest.put(`/api/salam/quote/${salam._id}`, { quote });

      Swal.fire({
        icon: "success",
        title: "Data salam pembuka berhasil diupdate!",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchSalam();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-[url('/assets/hero2.png')] bg-[length:100%_270px] bg-no-repeat ">
      <h2 className="text-2xl text-primary-500 font-medium mb-4 mx-5">Data Lainnya</h2>
      <div className=" space-y-5 mx-5">
        {/* Kode untuk card whatsapp  */}
        <div className="  bg-white rounded-lg shadow-lg pb-5">
          <h1 className="bg-gradient-to-r from-primary-600 to-danger-600  text-sm w-fit px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">Edit Whatsapp</h1>
          <form onSubmit={handleSalamWa} className="mx-5 pt-3">
            <div className="mb-2">
              <label htmlFor="salamWa" className="block text-sm pb-1 text-gray-500">
                Salam Whatsapp:
              </label>
              <textarea name="salamWa" defaultValue={salam ? salam.salamWa : ""} className="h-40 p-2 text-xs border border-primary-500 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
              <p className="text-xxxs text-slate-500">* Isikan text [Nama Tamu] , [Alamat Tamu] , [Link Undangan] agar otomatis menambahkan pada Whatsapp</p>
            </div>
            <button type="submit" className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
              Simpan
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-lg pb-5">
          <h1 className="bg-gradient-to-r from-primary-600 to-danger-600  text-sm w-fit px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">Edit Pembuka</h1>
          <form onSubmit={handleSalamPembuka} className="mx-5 pt-3">
            <div className="mb-2">
              <label htmlFor="salamWa" className="block text-sm pb-1 text-gray-500">
                Salam Pembuka:
              </label>
              <textarea name="salamWa" defaultValue={salam ? salam.salamPembuka : ""} className="h-24 p-2 text-xs border border-primary-500 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
            </div>
            <button type="submit" className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
              Simpan
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-lg pb-5">
          <h1 className="bg-gradient-to-r from-primary-600 to-danger-600  text-sm w-fit px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">Edit Quote</h1>
          <form onSubmit={handleQuote} className="mx-5 pt-3">
            <div className="mb-2">
              <label htmlFor="salamWa" className="block text-sm pb-1 text-gray-500">
                Quote:
              </label>
              <textarea name="salamWa" defaultValue={salam ? salam.quote : ""} className="h-24 p-2 text-xs border border-primary-500 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
            </div>
            <button type="submit" className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Data;
