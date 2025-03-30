import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function ListLoadingView() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="h-full flex flex-row gap-3">
        <div className="w-3/4 h-full gap-3 flex flex-col">
          <Table className="rounded-lg">
            <TableHeader>
              <TableRow
                className={cn(
                  "bg-blue-800 text-blue-100  hover:bg-blue-800 h-16 text-base dark:bg-[#192227] hover:dark:bg-[#192227]"
                  // className
                )}
                // {...other}
              >
                {Array?.from({ length: 8 }, (_, el) => el)?.map((column) => (
                  <TableHead
                    key={column}
                    className={cn("text-white font-semibold")}
                  >
                    <Skeleton className="w-16 h-4 mx-auto bg-[#2a3439] rounded-sm" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>{" "}
            <TableBody>
              {Array?.from({ length: 4 }, (_, el) => el)?.map((column) => (
                <TableRow
                  key={column}
                  className=" text-base dark:bg-table-row-bg dark:border-b-7 dark:border-[rgb(20,28,31)] dark:border-t-7 h-24"
                >
                  <TableCell className="font-medium max-w-64  truncate text-center">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="font-medium max-w-64  truncate text-center">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="font-medium  text-center">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center ">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center ">
                    <Skeleton />
                  </TableCell>
                  <TableCell className={cn("text-center font-semibold")}>
                    <Skeleton />
                  </TableCell>
                  <TableCell className={cn("text-center w-36")}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-1/4 h-full">
          <Skeleton className=" w-full h-full bg-nav-item" />
        </div>
      </div>
    </div>
  );
}
