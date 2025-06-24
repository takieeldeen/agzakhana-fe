// "use client";
import TableHeadCustom from "@/components/table/table-head-custom";
import { Table, TableBody } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import TableToolbar from "../../employees-table-toolbar";
import EmployeeTableRow from "../../employees-table-row";
import { useGetEmployees } from "@/api/employees";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import TableProvider from "@/components/table-provider/table-provider";
import { useTable } from "@/hooks/use-table";
import TablePagination from "@/components/table-pagination/table-pagination";
export default function BranchesListTab() {
  // State Management //////////////////////////////////////
  const t = useTranslations();

  const tableProps = useTable({
    defaultRowsPerPage: 9,
    defaultFilters: {
      status: "",
      name: "",
      sort: "",
      jobTitle: "",
    },
  });
  const HEAD_LABEL = [
    {
      id: "branchCode",
      label: t("USER_MANAGEMENT_PAGE.EMPLOYEE_IMG"),
      style: "text-center",
    },
    {
      id: "name",
      label: t("USER_MANAGEMENT_PAGE.EMPLOYEE_NAME"),
      style: "text-center",
    },
    {
      id: "jobTitle",
      label: t("USER_MANAGEMENT_PAGE.POSITION"),
      style: "text-center",
    },
    {
      id: "distance",
      label: t("USER_MANAGEMENT_PAGE.EMPLOYEE_CODE"),
      style: "text-center",
    },
    {
      id: "branchManager",
      label: t("USER_MANAGEMENT_PAGE.EMPLOYEE_CURRENT_BRANCH"),
      style: "text-center",
    },
    {
      id: "category",
      label: t("USER_MANAGEMENT_PAGE.EMPLOYEE_PHONE"),
      style: " text-center",
    },
    {
      id: "status",
      label: t("USER_MANAGEMENT_PAGE.STATUS"),
      style: " text-center",
    },
    {
      id: "action",
      label: t("USER_MANAGEMENT_PAGE.ACTION"),
      style: " text-center",
    },
  ];
  // Data Fetching Hooks //////////////////////////////////
  const {
    employees,
    employeesLoading,
    employeesValidating,
    totalNumberOfRows,
  } = useGetEmployees(
    tableProps.page,
    tableProps.rowsPerPage,
    tableProps.filters
  );
  // return <ListLoadingView />;
  // if (branchesLoading) return <LoadingView />;
  return (
    <TableProvider table={tableProps}>
      <div className="flex flex-row w-full gap-3.5 h-full">
        <div className="w-3/4 h-full overflow-y-scroll rtl:pl-2">
          <p className="flex flex-row items-center gap-2">
            <Icon
              icon={
                employeesValidating || employeesLoading
                  ? "ei:spinner-3"
                  : "bi:check-all"
              }
              className={cn(
                "text-xl text-neon ",
                employeesValidating ? "animate-spin" : ""
              )}
            />
            <span className="mb-2 font-semibold text-base text-gray-300">
              {employeesValidating || employeesLoading
                ? t("COMMON.REVALIDATING")
                : t("COMMON.UP_TO_DATE")}
            </span>
          </p>
          <Table className="rounded-lg">
            <TableHeadCustom
              tableHeadDetails={HEAD_LABEL}
              className=""
              loading={employeesLoading}
            />
            <TableBody loading={employeesLoading} columns={HEAD_LABEL?.length}>
              {employees?.map((employee) => (
                <EmployeeTableRow row={employee} key={employee?._id} />
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-1/4">
          <TableToolbar totalCount={totalNumberOfRows} />
        </div>
      </div>
      {!employeesLoading && (
        <TablePagination
          totalNoOfRows={totalNumberOfRows ?? 0}
          rowsPerPage={tableProps.rowsPerPage}
          currentPage={tableProps.page}
          onPageChange={(newPage: number) => tableProps.onPageChange(newPage)}
        />
      )}
    </TableProvider>
  );
}
