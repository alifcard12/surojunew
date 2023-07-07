import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";
import { RiDeleteBin5Line, RiImageAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const GalleryPost = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [ytLink, setYtLink] = useState("");

  useEffect(() => {
    fetchGallery();
    fetchYtLink();
  }, []);

  const fetchYtLink = async () => {
    try {
      const response = await newRequest.get("/api/youtube");
      setYtLink(response.data);
    } catch (error) {
      console.error("Error fetching youtube list:", error);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await newRequest.get("/api/gallery");
      setGallery(response.data);
    } catch (error) {
      console.error("Error fetching gallery list:", error);
    }
  };

  const handleYtSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/api/youtube/add", {
        ytLink,
      });

      Swal.fire({
        icon: "success",
        title: "Data Link Youtube berhasil ditambah!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form fields

      setYtLink([]);

      // Fetch updated gallery
      fetchYtLink();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Data link Youtube gagal ditambah!",
      });
    }
  };

  const handleYtChange = (e) => {
    setYtLink(e.target.value);
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageUrl(files);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (imageUrl.length === 0) {
      Swal.fire("Error", "Pilih setidaknya satu gambar untuk diunggah.", "error");
      return;
    }

    try {
      const formData = new FormData();
      imageUrl.forEach((file) => {
        formData.append("imageUrl", file);
      });

      await newRequest.post("/api/gallery/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Gambar berhasil diunggah!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form fields
      setImageUrl([]);

      // Fetch updated gallery
      fetchGallery();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal mengunggah gambar!",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin akan menghapus gambar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await newRequest.delete(`/api/gallery/${id}`);

        // Fetch updated gallery
        fetchGallery();

        Swal.fire({
          icon: "success",
          title: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Terjadi kesalahan saat menghapus item.", "error");
    }
  };
  const handleDeleteYt = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin akan menghapus gambar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await newRequest.delete(`/api/youtube/${id}`);

        // Fetch updated gallery
        fetchYtLink();

        Swal.fire({
          icon: "success",
          title: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Terjadi kesalahan saat menghapus item.", "error");
    }
  };

  return (
    <div className="w-full bg-[url('/assets/hero2.png')] bg-[length:100%_270px] bg-no-repeat">
      <h1 className=" py-5 text-2xl mx-5 font-bold text-primary-400 ">Data Gallery</h1>
      <div className=" mx-5 gap-5">
        <div className="w-full h-fit ">
          <form className="bg-white bg-opacity-40 rounded-lg shadow-lg p-5" onSubmit={handleFormSubmit}>
            {imageUrl.length > 0 && imageUrl.map((file, index) => <img key={index} src={URL.createObjectURL(file)} alt="gallery" className="w-40 h-40 mt-2 object-cover" />)}

            <label htmlFor="imageFiles" className="block cursor-pointer text-center">
              <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 bg-white ">
                <RiImageAddLine size={70} className="mx-auto text-gray-400 mb-2" />
                <div className="text-center text-gray-400">Tambah Gambar</div>
                <input type="file" id="imageFiles" name="imageFiles" onChange={handleImageChange} accept="image/*" className="hidden" multiple />
                <button className="bg-primary-500 text-white py-2 px-3 rounded hover:bg-primary-600  mt-3" type="submit">
                  Upload
                </button>
              </div>
            </label>
          </form>
          <div className="pt-5">
            <h1 className="text-primary-400  font-medium text-lg">List Foto Gallery</h1>
            {gallery.map((item) => (
              <div key={item._id}>
                <div className="w-full bg-white bg-opacity-40 shadow rounded my-2 flex justify-between p-2">
                  <img className="w-14 sm:w-20 h-14 sm:h-20 " src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`} alt="image" />
                  <button className="bg-red-400 hover:bg-red-500 text-white px-3 sm:px-3  py-3  text-md sm:text-lg rounded" onClick={() => handleDelete(item._id)}>
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-fit bg-white bg-opacity-40 rounded-lg shadow-lg mb-5  mt-5 ">
          <h1 className="bg-gradient-to-r from-primary-600 to-danger-600  text-sm w-fit px-2 py-1 text-white rounded-bl-lg rounded-tr-lg shadow">Data Video</h1>
          <form onSubmit={handleYtSubmit} className="mx-5">
            <div className="py-5 grid">
              <p className="text-primary-500">Link Youtube</p>
              <textarea id="ytLink" name="ytLink" onChange={handleYtChange} type="text" placeholder="ex : https://youtu.be/amrNzEwiS8k" className="w-full my-2 p-2 rounded border border-gray-300" />
              <Link className="text-info-500" to="/youtube">
                Cara Menambahkan Video
              </Link>
              <button className="bg-primary-500 text-white py-2 px-3 rounded hover:bg-primary-600 w-1/3 sm:w-1/6 mt-3" type="submit">
                Simpan
              </button>
            </div>
          </form>
          {Array.isArray(ytLink) ? (
            ytLink.map((item) => (
              <div key={item._id} className="p-5">
                <div className="w-full bg-white shadow rounded-lg my-2 flex justify-between p-2  items-center">
                  <p className="ml-2 text-slate-700 text-sm">{item.ytLink}</p>
                  <button className="bg-red-400 hover:bg-red-500 text-white px-3 sm:px-3 py-3 text-md sm:text-lg rounded" onClick={() => handleDeleteYt(item._id)}>
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPost;
