import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        email,
        password,
        username,
      });

      // Navigasi ke halaman login setelah berhasil mendaftar
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
      // Show error notification
    }
  };

  const handleGoogleRegister = async () => {
    try {
      // Redirect ke endpoint Google OAuth di backend
      window.location.href = "http://localhost:3000/auth/google";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Registrasi Pengguna</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} className="border border-gray-300 px-4 py-2 w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className="border border-gray-300 px-4 py-2 w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username:
          </label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className="border border-gray-300 px-4 py-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Daftar
        </button>
        <button onClick={handleGoogleRegister} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
          Daftar dengan Google
        </button>
      </form>
    </div>
  );
};

export default Register;
