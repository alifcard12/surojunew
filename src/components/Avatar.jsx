"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineLogout, MdOutlinePersonPin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Avatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    // Logika logout di sini
    try {
      await newRequest.post("/api/users/logout");
    } catch (err) {
      console.log(err);
    }
    await navigate("/");
  };

  useEffect(() => {
    // Mendapatkan data pengguna dari server menggunakan token JWT
    const fetchProfile = async () => {
      try {
        const response = await newRequest.get("/api/users/profile");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="p-1 outline-white">
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center" onClick={toggleDropdown}>
          {user.profilePict && <img width={40} height={40} className="h-8 w-8 rounded-full cursor-pointer" src={user.profilePict} alt="Avatar" />}
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-lg text-center">
            <span className="text-sm text-orange-700">{user.email}</span>
            <hr className="mt-2" />
            <Link to="/dashboard/profile" className="px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
              <MdOutlinePersonPin className="mr-2" />
              Profile
            </Link>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
              <MdOutlineLogout className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Avatar;
