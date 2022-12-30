import clsx from "clsx";
import { Select } from "../select/select";
import { NormalSelectOptions } from "../select/select.type";

interface PaginationProps {
  currentPage: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const options: NormalSelectOptions = Array(totalPages)
    .fill(0)
    .map((_, index) => ({ label: `Trang ${index + 1}`, value: index + 1 }));

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="flex my-2 gap-2">
      <div
        className={clsx(
          "h-9 w-9 flex justify-center items-center rounded-md bg-gray-200 cursor-pointer",
          {
            "hover:bg-[#83cc74]": currentPage > 1,
            "pointer-events-none text-gray-400": currentPage <= 1,
          }
        )}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
      <Select
        options={options}
        value={currentPage}
        className="auto mt-0"
        onChange={(e) => handlePageChange(Number(e.target.value))}
      />
      <div
        className={clsx(
          "h-9 w-9 flex justify-center items-center rounded-md bg-gray-200 cursor-pointer",
          {
            "hover:bg-[#83cc74]": currentPage < totalPages,
            "pointer-events-none text-gray-400": currentPage >= totalPages,
          }
        )}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="feather feather-chevron-right w-6 h-6"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  );
}

export default Pagination;
