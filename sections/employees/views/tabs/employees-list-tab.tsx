"use client";
import TableHeadCustom from "@/components/table/table-head-custom";
import { Table, TableBody } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import TableToolbar from "../../employees-table-toolbar";
import EmployeeTableRow from "../../employees-table-row";
import { useGetEmployees } from "@/api/employees";
import { Icon } from "@iconify/react/dist/iconify.js";
export default function BranchesListTab() {
  // State Management //////////////////////////////////////
  const t = useTranslations();
  const { employees, employeesLoading, employeesValidating } =
    useGetEmployees();
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
  // return <ListLoadingView />;
  // if (branchesLoading) return <LoadingView />;
  return (
    <div className="flex flex-row w-full gap-3.5 h-full">
      <div className="w-3/4 h-full overflow-y-scroll rtl:pl-2">
        {employeesValidating && (
          <p className="flex flex-row items-center gap-2">
            <Icon
              icon="ei:spinner-3"
              className="text-xl text-neon animate-spin"
            />
            <span className="mb-2 font-semibold text-base text-gray-300">
              {t("COMMON.REVALIDATING")}
            </span>
          </p>
        )}
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
        <TableToolbar />
      </div>
    </div>
  );
}
