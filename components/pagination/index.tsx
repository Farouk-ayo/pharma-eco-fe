import React from "react";
import { ArrowLeft, ArrowRight } from "../icons";

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
  return (
    <div className="flex items-center justify-center gap-3 md:gap-4 my-8 md:my-12">
      {/* Previous Arrow */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`transition-all ${
          currentPage === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:scale-110"
        }`}
      >
        <ArrowLeft className="w-10 h-10 md:w-12 md:h-12" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          // Show first page, last page, current page, and pages around current
          const showPage =
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

          // Show ellipsis
          const showEllipsisBefore =
            pageNumber === currentPage - 2 && currentPage > 3;
          const showEllipsisAfter =
            pageNumber === currentPage + 2 && currentPage < totalPages - 2;

          if (showEllipsisBefore || showEllipsisAfter) {
            return (
              <span key={pageNumber} className="text-gray-400 px-1 md:px-2">
                ...
              </span>
            );
          }

          if (!showPage) return null;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold transition-all text-sm md:text-base ${
                currentPage === pageNumber
                  ? " text-primary  scale-110"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Arrow */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`transition-all ${
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:scale-110"
        }`}
      >
        <ArrowRight className="w-10 h-10 md:w-12 md:h-12" />
      </button>
    </div>
  );
};

export default Pagination;
