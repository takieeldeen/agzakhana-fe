import { cn } from "@/lib/utils";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { ComponentProps } from "react";
import { Skeleton } from "../ui/skeleton";

export interface TableHeadProps {
  tableHeadDetails: {
    id: string;
    label: string;
    style?: string;
  }[];
  className?: string;
  loading?: boolean;
  other?: ComponentProps<"tr">;
}

export default function TableHeadCustom({
  tableHeadDetails,
  className,
  loading = false,
  ...other
}: TableHeadProps) {
  return (
    <TableHeader>
      <TableRow
        className={cn(
          "bg-blue-800 text-blue-100  hover:bg-blue-800 h-16 text-base dark:bg-[#192227] hover:dark:bg-[#192227]",
          className
        )}
        {...other}
      >
        {!loading &&
          tableHeadDetails?.map((column) => (
            <TableHead
              key={column?.id}
              className={cn("text-white font-semibold", column?.style)}
            >
              {column?.label}
            </TableHead>
          ))}
        {loading &&
          tableHeadDetails?.map((column) => (
            <TableHead
              key={column?.id}
              className={cn("text-white font-semibold", column?.style)}
            >
              <Skeleton className="w-16 h-4 mx-auto bg-[#2a3439] rounded-sm" />
            </TableHead>
          ))}
      </TableRow>
    </TableHeader>
  );
}
