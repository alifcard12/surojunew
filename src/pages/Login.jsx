import React, { useState } from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan logika autentikasi atau pengiriman data ke backend di sini
    try {
      const res = await newRequest.post("/api/users/login", { email, password });
      res.data;
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      // Kirim token ID ke endpoint login dengan Google
      window.location.href = "http://localhost:3000/auth/google/";

      // Simpan token access dalam local storage atau cookie, sesuai preferensi Anda

      // Redirect ke halaman dashboard atau halaman yang sesuai setelah login
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleFacebookLogin = () => {
    // Lakukan logika autentikasi dengan Facebook di sini
    console.log("Logging in with Facebook");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-200">
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input type="email" id="email" placeholder="emailanda@gmail.com" className="w-full px-3 py-2 border" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input type="password" id="password" placeholder="*********" className="w-full px-3 py-2 border" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
        <div className="mt-4">
          <button onClick={handleGoogleLogin} className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded">
            Login with Google
          </button>
        </div>
        <div className="mt-2">
          <button onClick={handleFacebookLogin} className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded">
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
