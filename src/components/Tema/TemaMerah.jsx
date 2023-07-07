import React from "react";

const TemaMerah = ({ order, mempelai, acara, quote }) => {
  return (
    <div style={{ background: "red", color: "white" }}>
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
      <h2>Detail Acara:</h2>
      <ul>
        <li>Nama Acara: {acara.namaAcara} </li>
        <li>Tanggal Acara: {acara.tanggalAcara} </li>
        <li>Waktu Mulai: {acara.waktuMulai} </li>
        <li>Waktu Selesai: {acara.waktuSelesai} </li>
        <li>Tempat Acara: {acara.tempatAcara} </li>
        <li>Alamat Acara: {acara.alamatAcara} </li>
        <li>Google Maps: {acara.maps} </li>
      </ul>

      {quote && (
        <div>
          <h2>Quote:</h2>
          <p>{quote.isiQuote}</p>
          <p>- {quote.sumberQuote}</p>
        </div>
      )}
    </div>
  );
};

export default TemaMerah;
