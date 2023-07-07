import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { MdOutlineSpaceDashboard, MdOutlineSupervisedUserCircle, MdOutlineSettings, MdOutlineLogout, MdOutlineBook, MdOutlineCardGiftcard, MdOutlineShoppingCartCheckout, MdOutlineLiveHelp, MdOutlineInfo } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import newRequest from "../utils/newRequest";

function AdminMenuBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const ListMenu = [
    {
      title: "Dashboard",
      icon: MdOutlineSpaceDashboard,
      link: "/admin",
    },
    {
      title: "Pengaturan",
      icon: MdOutlineSettings,
      link: "/admin/pengaturan",
    },

    {
      title: "User",
      icon: MdOutlineSupervisedUserCircle,
      link: "/admin/user",
    },
  ];

  const handleLogout = async () => {
    // Logika logout di sini
    try {
      await newRequest.post("/api/users/logout");
    } catch (err) {
      console.log(err);
    }
    await navigate("/");
  };

  return (
    <div>
      <Disclosure as="nav">
        <div className="bg-orange-500  items-center p-2 flex justify-between sm:rounded-none rounded-full mt-2 mx-2 sm:mt-0 sm:mx-0  bg-opacity-75 sm:bg-opacity-100 ">
          <Disclosure.Button className=" inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-orange-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
            <GiHamburgerMenu className="block lg:hidden h-6 w-6" aria-hidden="true" />
          </Disclosure.Button>
          <h1>Logo</h1>
          <Avatar />
          <div className="sm:p-6 p-3 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
            <div className="flex flex-col justify-start item-center">
              <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">Admin Menu</h1>
              <div className=" my-4 border-b border-gray-100 pb-2 text-gray-600">
                {ListMenu.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className={` ${location.pathname === item.link ? "bg-orange-800 text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-orange-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}
                  >
                    <item.icon className="text-2xl  group-hover:text-white " />
                    <h3 className="text-base  group-hover:text-white font-semibold ">{item.title}</h3>
                  </Link>
                ))}
              </div>
              {/* setting  */}
              <div className="  border-b border-gray-100 pb-4 text-gray-600">
                <Link
                  to="/dashboard/bantuan"
                  className={` ${location.pathname === "/dashboard/bantuan" ? "bg-orange-800 text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-orange-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}
                >
                  <MdOutlineLiveHelp className="text-2xl  group-hover:text-white " />
                  <h3 className="text-base  group-hover:text-white font-semibold ">Bantuan</h3>
                </Link>
                <Link
                  to="/dashboard/faq"
                  className={` ${location.pathname === "/dashboard/faq" ? "bg-orange-800 text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-orange-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}
                >
                  <MdOutlineInfo className="text-2xl  group-hover:text-white " />
                  <h3 className="text-base  group-hover:text-white font-semibold ">F.A.Q</h3>
                </Link>
              </div>
              {/* logout */}
              <button onClick={handleLogout} className=" my-4">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">Logout</h3>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default AdminMenuBar;
