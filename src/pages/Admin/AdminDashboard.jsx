import React, { useEffect, useState } from "react";
import PieChartComponent from "../../components/Admin/PieChart";
import newRequest from "../../utils/newRequest";
import { FiUser } from "react-icons/fi";

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get("/api/users/all");
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Mengambil data role pengguna dari userData
  const getUserRoleData = () => {
    const roles = userData.map((user) => user.role);
    const roleCounts = {};

    // Menghitung jumlah pengguna untuk setiap peran
    roles.forEach((role) => {
      if (roleCounts[role]) {
        roleCounts[role]++;
      } else {
        roleCounts[role] = 1;
      }
    });

    // Mengonversi data role menjadi format yang dapat digunakan oleh komponen PieChartComponent
    const pieChartData = Object.keys(roleCounts).map((role) => ({
      name: role,
      value: roleCounts[role],
    }));

    return pieChartData;
  };

  return (
    <div>
      <div className="sm:flex flex-none">
        <div className="w-full sm:px-5 px-3 ">
          <div className="rounded  shadow-lg bg-white pb-5">
            <div className="flex justify-between mt-5">
              <h1 className="text-left font-medium text-slate-400 mt-3 ml-4 ">Daftar User Role</h1>
              <div className="mr-3 mt-3  flex items-center ">
                <div className="mr-3 text-lg text-slate-500">{userData.length} Users</div>
                <div className="bg-green-400 text-2xl text-white p-1 rounded">
                  <FiUser />
                </div>
              </div>
            </div>
            <PieChartComponent data={getUserRoleData()} />
          </div>
          <div>{/* <DonutChart data={getUserRoleData()} /> */}</div>
        </div>
        <div className="w-full">kanan</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
