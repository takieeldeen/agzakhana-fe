import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export default function TableSkeleton({ columns = 8 }: { columns?: number }) {
  return (
    <tbody>
      {Array?.from({ length: 4 }, (_, el) => el)?.map((column) => (
        <TableRow
          key={column}
          className=" text-base dark:bg-table-row-bg dark:border-b-7 dark:border-[rgb(20,28,31)] dark:border-t-7 h-24"
        >
          <TableCell className="font-medium max-w-64  truncate text-center">
            <Skeleton
              className={`w-12 h-12 mx-auto bg-[#2a3439] rounded-[50%]`}
            />
          </TableCell>
          {Array?.from({ length: columns - 1 }, (_, el) => el)?.map((field) => (
            <TableCell
              key={field}
              className="font-medium max-w-64  truncate text-center"
            >
              <Skeleton
                className={`w-full h-4 mx-auto bg-[#2a3439] rounded-sm`}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </tbody>
  );
}
