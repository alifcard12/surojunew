import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import { BiEdit, BiSave } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await newRequest.get("/api/users/all");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = (userId) => {
    setEditingUserId(userId);
  };

  const handleSaveRole = async (userId) => {
    try {
      await newRequest.put(`/api/users/${userId}`, { role: selectedRole });
      setSelectedRole(null);
      setEditingUserId(null);

      // Perbarui state users setelah pembaruan berhasil dilakukan
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, role: selectedRole };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await newRequest.delete(`/api/users/${userId}`);

      // Perbarui state users setelah penghapusan berhasil dilakukan
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:p-5 p-3">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-orange-600 ">
            <tr className="text-center ">
              <th className="sm:px-3 px-2 sm:py-3 py-2 text-center text-xs font-medium text-white uppercase tracking-wider text">No</th>
              <th className="sm:px-6 px-3 sm:py-3 py-2 text-center text-xs font-medium text-white uppercase tracking-wider ">Ava</th>
              <th className="sm:px-6 px-3 sm:py-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">User</th>
              <th className="sm:px-6 px-3 sm:py-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
              <th className="sm:px-6 px-3 sm:py-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
              <th className="sm:px-6 px-3 sm:py-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Created at</th>
              <th className="sm:px-6 px-3 sm:py-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="sm:px-3 px-2 sm:py-2 py-1 whitespace-nowrap text-xxs sm:text-base text-center ">{index + 1}</td>
                <td className="sm:px-6  sm:py-2 py-1 whitespace-nowrap text-xxs sm:text-base grid justify-items-stretch ">
                  {user.profilePict && <img src={user.profilePict} alt="Profile Picture" className="sm:w-10 w-7 sm:h-10 h-7 rounded-full justify-self-center " />}
                </td>
                <td className="sm:px-6 px-3 sm:py-2 py-1 whitespace-nowrap text-xxs sm:text-base capitalize ">{user.username}</td>
                <td className="sm:px-6 px-3 sm:py-2 py-1 whitespace-nowrap text-xxs sm:text-base capitalize ">
                  {editingUserId === user._id ? (
                    <select className="w-full bg-white border border-gray-300 focus:border-indigo-500  focus:ring-indigo-500 text-xs sm:text-base rounded" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="sm:px-6 px-3 sm:py-2 py-1 whitespace-nowrap text-xxs sm:text-base ">{user.email}</td>
                <td className="sm:px-6 px-3 sm:py-4 py-1 whitespace-nowrap text-xxs sm:text-base ">{moment(user.createdAt).format("DD MMMM YYYY, HH:mm ")}</td>
                <td className="sm:px-6 px-3 sm:py-2 py-1 whitespace-nowrap text-xxs sm:text-base  ">
                  {editingUserId === user._id ? (
                    <button className="bg-green-400 hover:bg-green-500 text-white sm:px-2 px-1 sm:py-2 py-1 mr-2 rounded" onClick={() => handleSaveRole(user._id)}>
                      <BiSave />
                    </button>
                  ) : (
                    <button className="bg-blue-400 hover:bg-blue-500 text-white sm:px-2 px-1 sm:py-2 py-1 mr-2 rounded" onClick={() => handleUpdateRole(user._id)}>
                      <BiEdit />
                    </button>
                  )}
                  <button className="bg-red-400 hover:bg-red-500 text-white sm:px-2 px-1 sm:py-2 py-1 rounded" onClick={() => handleDeleteUser(user._id)}>
                    <RiDeleteBin5Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
