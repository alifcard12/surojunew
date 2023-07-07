import React from "react";

const TemaKuning = ({ order, mempelai }) => {
  return (
    <div style={{ background: "yellow", color: "white" }}>
      <h1>Halaman Order: {order.domain}</h1>
      <p>Detail Order:</p>
      <ul>
        <li>User ID: {order.userId}</li>
        <li>Domain: {order.domain}</li>
        <li>Tema: {order.tema}</li>
        <li>Paket: {order.paket}</li>
        <li>Status: {order.status}</li>
      </ul>

      <h2>Detail Mempelai:</h2>
      <ul>
        <li>Mempelai Pria: {mempelai.mempelaiPria}</li>
        <li>Nama Panggilan Pria: {mempelai.namaPanggilanPria}</li>
        <li>Ayah Pria: {mempelai.ayahPria}</li>
        <li>Ibu Pria: {mempelai.ibuPria}</li>
        <li>Mempelai Wanita: {mempelai.mempelaiWanita}</li>
        <li>Nama Panggilan Wanita: {mempelai.namaPanggilanWanita}</li>
        <li>Ayah Wanita: {mempelai.ayahWanita}</li>
        <li>Ibu Wanita: {mempelai.ibuWanita}</li>
        <li>Posisi Mempelai: {mempelai.posisiMempelai}</li>
      </ul>
    </div>
  );
};

export default TemaKuning;
