"use client";

import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // ✅ Improved dynamic page number generation
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Adjust this to control visible page count

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages - 2) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - (maxVisiblePages - 3)) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 w-fit mx-auto mt-4 mb-4">
      {/* First Page Button (<<) */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
      >
        &laquo;
      </button>

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
      >
        &lt; Previous
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-2 mx-2">
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-500">
              {page}
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
      >
        Next &gt;
      </button>

      {/* Last Page Button (>>) */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
      >
        &raquo;
      </button>

      {/* Showing Results Info */}
      <p className="text-gray-700 text-sm ml-4">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
      </p>
    </div>
  );
};

export default Pagination;
