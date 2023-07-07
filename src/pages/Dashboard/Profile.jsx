import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";

const Profile = () => {
  const [user, setUser] = useState(null);

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

  console.log(user);
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 shadow">
        <div className="flex items-center">
          {user.profilePict && <img src={user.profilePict} alt="Profile Picture" className="w-16 h-16 rounded-full mr-4" />}
          <div>
            <p className="font-semibold">Role: {user.role}</p>
            <p className="font-semibold">Username: {user.username}</p>
            <p className="font-semibold">Email: {user.email}</p>
          </div>
        </div>
        {/* Tampilkan informasi profil pengguna lainnya */}
      </div>
    </div>
  );
};

export default Profile;
