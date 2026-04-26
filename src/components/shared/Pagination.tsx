interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          currentPage === 1
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === page
              ? "bg-amber-500 text-slate-950"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          currentPage === totalPages
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
