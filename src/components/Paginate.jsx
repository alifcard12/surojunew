import React from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 3; // Jumlah halaman yang ingin ditampilkan

    const startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`px-2 py-1 cursor-pointer ${currentPage === i ? "font-bold bg-primary-500 rounded-full text-white px-3 ring-2 ring-primary-500 ring-offset-2 mx-2" : ""}`} onClick={() => paginate(i)}>
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  const goToFirstPage = () => {
    paginate(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    paginate(totalPages);
  };

  return (
    <div className="flex flex-col justify-center mt-4 ">
      <ul className="flex justify-center items-center">
        <li className="px-2 py-1 cursor-pointer  bg-primary-500 hover:bg-primary-600 rounded text-white mx-1 text-sm sm:text-xl" onClick={goToFirstPage}>
          {<MdKeyboardDoubleArrowLeft />}
        </li>
        <li className="px-2 py-1 cursor-pointer bg-primary-500 hover:bg-primary-600 rounded text-white mx-1 text-sm sm:text-xl" onClick={goToPreviousPage}>
          {<MdKeyboardArrowLeft />}
        </li>
        {renderPageNumbers()}
        <li className="px-2 py-1 cursor-pointer  bg-primary-500 hover:bg-primary-600 rounded text-white mx-1 text-sm sm:text-xl" onClick={goToNextPage}>
          {<MdKeyboardArrowRight />}
        </li>
        <li className="px-2 py-1 cursor-pointer  bg-primary-500 hover:bg-primary-600 rounded text-white mx-1 text-sm sm:text-xl" onClick={goToLastPage}>
          {<MdKeyboardDoubleArrowRight />}
        </li>
      </ul>
      <div className="flex justify-center mt-3 text-xs sm:text-base">
        {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} baris
      </div>
    </div>
  );
};

export default Pagination;
