import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-5 h-screen flex justify-center items-end bg-no-repeat bg-center bg-contain sm:bg-auto   bg-[url(/assets/404.png)] ">
      <Link to="/" className="bg-orange-500 text-white px-5 py-2 rounded mb-36">
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
