import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";

const MempelaiList = () => {
  const [mempelaiList, setMempelaiList] = useState([]);

  useEffect(() => {
    const fetchMempelaiList = async () => {
      try {
        const response = await newRequest.get("/api/mempelai");
        setMempelaiList(response.data);
      } catch (error) {
        console.error("Error fetching mempelai list:", error);
      }
    };

    fetchMempelaiList();
  }, []);

  return (
    <div>
      <h1>Data Mempelai</h1>
      {mempelaiList.map((mempelai) => (
        <div key={mempelai._id}>
          <h2>{mempelai.mempelaiPria}</h2>
          <img src={`${import.meta.env.VITE_API_URL}${mempelai.fotoPria}`} alt="Foto Pria" />

          <h2>{mempelai.mempelaiWanita}</h2>
          <img src={`${import.meta.env.VITE_API_URL}${mempelai.fotoWanita}`} alt="Foto Wanita" />
        </div>
      ))}
    </div>
  );
};

export default MempelaiList;
