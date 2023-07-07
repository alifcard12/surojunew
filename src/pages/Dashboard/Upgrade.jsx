import React from "react";
import AddQuote from "../../components/Quote/quoteAdd";
import newRequest from "../../utils/newRequest";

const Upgrade = () => {
  const fetchSalam = async () => {
    try {
      await newRequest.post("/api/salam/add"); // Mengambil data salam dari server
    } catch (error) {
      console.error(error);
      // Tampilkan notifikasi error jika ada
    }
  };

  return (
    <div>
      Upgrade
      <button onClick={fetchSalam}>tambahkan</button>
      <AddQuote />
      <select name="" id="">
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
        <option value="">4</option>
        <option value="">5</option>
      </select>
    </div>
  );
};

export default Upgrade;
