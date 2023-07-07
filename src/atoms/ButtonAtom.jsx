import React from "react";
import { IconContext } from "react-icons";

const ButtonAtom = ({ text, onClick, className, color, icon }) => {
  return (
    <button className={`bg-${color}-500 hover:bg-${color}-600 text-white py-2 px-4 rounded ${className} items-center flex justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`} onClick={onClick}>
      <IconContext.Provider value={{ className: "inline-block mr-1" }}>{icon}</IconContext.Provider>
      {text}
    </button>
  );
};

export default ButtonAtom;
