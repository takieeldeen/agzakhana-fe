"use client";
import { useTranslations } from "next-intl";
import ViewHeader from "../components/view-header";
import { useGetMedicinesList } from "@/api/medicines";
import { useTable } from "@/hooks/use-table";
import TableProvider from "@/components/table-provider/table-provider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import { Table, TableBody } from "@/components/ui/table";
import TableHeadCustom from "@/components/table/table-head-custom";
import StyledTableRow from "../components/table-row";
import TablePagination from "@/components/table-pagination/table-pagination";
import TableToolbar from "../components/table-toolbar";

export default function MedicineListView() {
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
  const {
    medicines,
    medicinesLoading,
    medicinesValidating,
    totalNumberOfRows,
  } = useGetMedicinesList(
    tableProps.page,
    tableProps.rowsPerPage,
    tableProps.filters
  );
  const HEAD_LABEL = [
    {
      id: "_id",
      label: t("MEDICINES_MANAGEMENT_PAGE.ID"),
      style: "text-center",
    },
    {
      id: "imageUrl",
      label: t("MEDICINES_MANAGEMENT_PAGE.IMAGE_URL"),
      style: " text-center",
    },
    {
      id: "nameAr",
      label: t("MEDICINES_MANAGEMENT_PAGE.NAME"),
      style: "text-center",
    },
    {
      id: "currentPrice",
      label: t("MEDICINES_MANAGEMENT_PAGE.CURRENT_PRICE"),
      style: "text-center",
    },
    {
      id: "category",
      label: t("MEDICINES_MANAGEMENT_PAGE.CATEGORY"),
      style: " text-center",
    },
    {
      id: "descriptionAr",
      label: t("MEDICINES_MANAGEMENT_PAGE.DESCRIPTION"),
      style: " text-center",
    },

    {
      id: "requirePrescription",
      label: t("MEDICINES_MANAGEMENT_PAGE.REQUIRE_PRESCRIPTION"),
      style: " text-center",
    },
    {
      id: "dosage",
      label: t("MEDICINES_MANAGEMENT_PAGE.DOSAGE"),
      style: " text-center",
    },
  ];
  return (
    <div className="flex flex-col">
      <ViewHeader />
      <TableProvider table={tableProps}>
        <div className="flex flex-row w-full gap-3.5 h-full">
          <div className="w-3/4 h-full overflow-y-scroll rtl:pl-2">
            <p className="flex flex-row items-center gap-2">
              <Icon
                icon={
                  medicinesValidating || medicinesLoading
                    ? "ei:spinner-3"
                    : "bi:check-all"
                }
                className={cn(
                  "text-xl text-neon ",
                  medicinesValidating ? "animate-spin" : ""
                )}
              />
              <span className="mb-2 font-semibold text-base text-gray-300">
                {medicinesValidating || medicinesLoading
                  ? t("COMMON.REVALIDATING")
                  : t("COMMON.UP_TO_DATE")}
              </span>
            </p>
            <Table className="rounded-lg">
              <TableHeadCustom
                tableHeadDetails={HEAD_LABEL}
                className=""
                loading={medicinesLoading}
              />
              <TableBody
                loading={medicinesLoading}
                columns={HEAD_LABEL?.length}
              >
                {medicines?.map((employee) => (
                  <StyledTableRow row={employee as any} key={employee?._id} />
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-1/4">
            <TableToolbar totalCount={totalNumberOfRows} />
          </div>
        </div>
        {!medicinesLoading && (
          <TablePagination
            totalNoOfRows={totalNumberOfRows ?? 0}
            rowsPerPage={tableProps.rowsPerPage}
            currentPage={tableProps.page}
            onPageChange={(newPage: number) => tableProps.onPageChange(newPage)}
          />
        )}
      </TableProvider>
    </div>
  );
}
