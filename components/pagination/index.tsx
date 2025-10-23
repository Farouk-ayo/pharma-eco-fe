import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      {/* Previous Arrow */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700"
        }`}
      >
        <ArrowLeftIcon />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            number === currentPage
              ? "bg-green-600 text-white font-bold"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Ellipsis if needed */}
      {totalPages > 5 && currentPage < totalPages - 2 && (
        <span className="text-gray-700">...</span>
      )}

      {/* Last Page */}
      {totalPages > 5 && currentPage < totalPages - 2 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200"
        >
          {totalPages}
        </button>
      )}

      {/* Next Arrow */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700"
        }`}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
