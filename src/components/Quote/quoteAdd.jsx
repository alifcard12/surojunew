import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";

const AddQuote = () => {
  const [isiQuote, setIsiQuote] = useState("");
  const [sumberQuote, setSumberQuote] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/api/quote/add", {
        isiQuote,
        sumberQuote,
      });

      Swal.fire({
        icon: "success",
        title: "Quote added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form fields
      setIsiQuote("");
      setSumberQuote("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add isiQuote!",
      });
    }
  };

  return (
    <div className="h-full text-center mx-5 mb-10">
      <h1 className="text-4xl text-orange-800 font-bold pt-10 sm:pt-20 pb-2">Add Quote</h1>
      <p className="text-slate-600 pb-8">Please fill in the details</p>
      <div className="bg-white shadow-lg p-5 rounded-lg w-full sm:w-1/3 container sm:mx-auto text-left">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="isiQuote" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
              Quote
            </label>
            <textarea id="isiQuote" name="isiQuote" className="w-full p-2 border rounded text-xs sm:text-base" value={isiQuote} onChange={(e) => setIsiQuote(e.target.value)}></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="sumberQuote" className="block font-medium text-xs sm:text-base text-slate-500 mb-1">
              Author
            </label>
            <input type="text" id="sumberQuote" name="sumberQuote" className="w-full p-2 border rounded text-xs sm:text-base" value={sumberQuote} onChange={(e) => setSumberQuote(e.target.value)} />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-3">
            Add Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuote;
