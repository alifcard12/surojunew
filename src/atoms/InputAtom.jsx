import React from "react";

const InputAtom = (props) => {
  return <input className="border border-primary-500 px-4 py-2 rounded-md text-slate-700 placeholder-slate-300  focus:outline-none focus:ring-1 focus:ring-primary-400 w-full" {...props} />;
};

export default InputAtom;
