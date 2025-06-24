import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  totalNoOfRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}
export default function TablePagination({
  totalNoOfRows,
  rowsPerPage,
  currentPage,
  onPageChange,
}: TablePaginationProps) {
  // Helper Constants ////////////////////////////////////
  const totalNoOfPages = Math.ceil(totalNoOfRows / rowsPerPage);
  const pageWindow = 2;
  const pageArray: string[] = ["1"];
  const leftWindow = Math.max(2, currentPage - pageWindow);
  const rightWindow = Math.min(totalNoOfPages - 1, currentPage + pageWindow);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalNoOfPages;
  if (leftWindow > 2) pageArray.push("...");
  for (let i = leftWindow; i <= rightWindow; i++) {
    pageArray.push(`${i}`);
  }
  if (rightWindow < totalNoOfPages - 1) pageArray.push("...");
  if (totalNoOfPages !== 1) pageArray.push(`${totalNoOfPages}`);
  // TSX ////////////////////////////////////////////////

  return (
    <Pagination>
      <Button
        disabled={isFirstPage}
        className="bg-transparent text-white hover:bg-card-dark-bg transition-all transition-300 aspect-square cursor-pointer"
      >
        <Icon icon="mi:chevron-left" className="rtl:rotate-180" />
      </Button>
      <PaginationContent>
        {pageArray.map((pageNumber, i) => (
          <PaginationItem key={i}>
            <Button
              onClick={() => pageNumber !== "..." && onPageChange(+pageNumber)}
              className={cn(
                "bg-transparent dark:text-white cursor-pointer  hover:bg-card-dark-bg hover:text-modal-dark transition-all transition-300",
                pageNumber === `${currentPage}` &&
                  "bg-neon !text-modal-dark-background font-bold hover:bg-neon",
                pageNumber === "..." &&
                  "hover:bg-transparent hover:dark:text-white cursor-default"
              )}
            >
              {pageNumber}
            </Button>
          </PaginationItem>
        ))}
      </PaginationContent>
      <Button
        disabled={isLastPage}
        className="bg-transparent text-white hover:bg-card-dark-bg transition-all transition-300 aspect-square cursor-pointer"
      >
        <Icon icon="mi:chevron-left" />
      </Button>
    </Pagination>
  );
}
