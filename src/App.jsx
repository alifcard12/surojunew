import * as React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Dashboard/Home";
import Menubar from "./components/Menubar";
import Dashboard from "./pages/Dashboard";
import Pengaturan from "./pages/Dashboard/Pengaturan";
import BukuTamu from "./pages/Dashboard/BukuTamu";
import Gifts from "./pages/Dashboard/Gifts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Dashboard/Profile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import User from "./pages/Admin/User";
import AdminMenuBar from "./components/AdminMenuBar";
import Mempelai from "./pages/Pengaturan/Mempelai";
import Bantuan from "./pages/Dashboard/Bantuan";
import Upgrade from "./pages/Dashboard/Upgrade";
import Undangan from "./pages/Undangan";
import OrderLayout from "./pages/Order/OrderLayout";
import OrderPaket from "./pages/Order/OrderPaket";
import OrderMempelai from "./pages/Order/OrderMempelai";
import OrderFooter from "./pages/Order/OrderFooter";
import OrderAcara from "./pages/Order/OrderAcara";
import OrderCover from "./pages/Order/OrderCover";
import UbahTema from "./pages/Pengaturan/UbahTema";
import Gallery from "./pages/Pengaturan/Gallery";
import Cover from "./pages/Pengaturan/Cover";
import Acara from "./pages/Pengaturan/Acara";
import MyComponent from "./components/Mobile/MyComponent";
import Cerita from "./pages/Pengaturan/Cerita";
import Data from "./pages/Pengaturan/Data";
function App() {
  const Layout = () => {
    return (
      <div>
        <div className=" sticky sm:static top-0">
          <Menubar />
        </div>
        <div className="lg:ml-60 bg-slate-100 flex ">
          <div className="w-full lg:w-1/2">
            <Outlet />
          </div>
          <div className=" w-full hidden lg:block">
            <MyComponent />
          </div>
        </div>
      </div>
    );
  };
  const Admin = () => {
    return (
      <div>
        <AdminMenuBar />
        <div className="lg:ml-60 bg-slate-100">
          <Outlet />
        </div>
      </div>
    );
  };
  const Order = () => {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
        <OrderLayout />
        <Outlet />
        <OrderFooter />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "/admin",
          element: <AdminDashboard />,
        },
        {
          path: "/admin/user",
          element: <User />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/pengaturan",
          element: <Pengaturan />,
        },
        {
          path: "/dashboard/pengaturan/mempelai",
          element: <Mempelai />,
        },
        {
          path: "/dashboard/pengaturan/tema",
          element: <UbahTema />,
        },
        {
          path: "/dashboard/pengaturan/gallery",
          element: <Gallery />,
        },
        {
          path: "/dashboard/pengaturan/cover",
          element: <Cover />,
        },
        {
          path: "/dashboard/pengaturan/acara",
          element: <Acara />,
        },
        {
          path: "/dashboard/pengaturan/cerita",
          element: <Cerita />,
        },
        {
          path: "/dashboard/pengaturan/data",
          element: <Data />,
        },
        {
          path: "/dashboard/bukutamu",
          element: <BukuTamu />,
        },
        {
          path: "/dashboard/gifts",
          element: <Gifts />,
        },
        {
          path: "/dashboard/profile",
          element: <Profile />,
        },
        {
          path: "/dashboard/upgrade",
          element: <Upgrade />,
        },
        {
          path: "/dashboard/bantuan",
          element: <Bantuan />,
        },
      ],
    },
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/:domain",
      element: <Undangan />,
    },

    {
      path: "/order",
      element: <Order />,
      children: [
        {
          path: "/order/paket/:slug",
          element: <OrderPaket />,
        },
        {
          path: "/order/mempelai",
          element: <OrderMempelai />,
        },
        {
          path: "/order/acara",
          element: <OrderAcara />,
        },
        {
          path: "/order/cover",
          element: <OrderCover />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
