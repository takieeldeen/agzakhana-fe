"use client";
import TableHeadCustom from "@/components/table/table-head-custom";
import { Table, TableBody } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import TableToolbar from "../../employees-table-toolbar";
import { useGetBranchesList } from "@/api/branches";
import BranchesTableRow from "../../employees-table-row";
export default function BranchesListTab() {
  // State Management //////////////////////////////////////
  const t = useTranslations("USER_MANAGEMENT_PAGE");
  const { branches, branchesLoading } = useGetBranchesList();
  const HEAD_LABEL = [
    {
      id: "branchCode",
      label: t("EMPLOYEE_IMG"),
      style: "text-center",
    },
    {
      id: "name",
      label: t("EMPLOYEE_NAME"),
      style: "text-center",
    },
    {
      id: "distance",
      label: t("EMPLOYEE_CODE"),
      style: "text-center",
    },
    {
      id: "branchManager",
      label: t("EMPLOYEE_CURRENT_BRANCH"),
      style: "text-center",
    },
    {
      id: "category",
      label: t("EMPLOYEE_PHONE"),
      style: " text-center",
    },
    {
      id: "status",
      label: t("STATUS"),
      style: " text-center",
    },
    {
      id: "action",
      label: t("ACTION"),
      style: " text-center",
    },
  ];
  // return <ListLoadingView />;
  // if (branchesLoading) return <LoadingView />;
  return (
    <div className="flex flex-row w-full gap-3.5 h-full">
      <div className="w-3/4 h-full overflow-y-scroll rtl:pl-2">
        <Table className="rounded-lg">
          <TableHeadCustom
            tableHeadDetails={HEAD_LABEL}
            className=""
            loading={branchesLoading}
          />
          <TableBody loading={branchesLoading} columns={HEAD_LABEL?.length}>
            {branches?.map((branch) => (
              <BranchesTableRow row={branch} key={branch?.id} />
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
