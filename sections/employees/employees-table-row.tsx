"use client";
import { useDeleteEmployee, useToggleEmployeeStatus } from "@/api/employees";
import { useConfirmDialog } from "@/components/confirmation-dialog/confirmation-dialog-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Employee } from "@/types/employees";
import { USER_STATUS } from "@/utilis/CONSTANTS";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

interface TableRowProps {
  row: Employee;
}

export default function EmployeeTableRow({ row }: TableRowProps) {
  //   Custom Hooks //////////////////////////
  const t = useTranslations("USER_MANAGEMENT_PAGE");
  const { confirmDialog } = useConfirmDialog();
  const { deleteEmployee } = useDeleteEmployee();
  const { toggleEmployeeStatus } = useToggleEmployeeStatus();
  const router = useRouter();
  //   Helper Constants /////////////////////
  //   Callbacks /////////////////////
  const handleDeleteProduct = useCallback(() => {
    confirmDialog(
      t("DELETE_CONFIRMATION_TITLE"),
      t("DELETE_CONFIRMATION_SUBTITLE"),
      "ALERT",
      () =>
        deleteEmployee(row?._id).then(() => {
          toast("Successfully Deleted");
        })
    );
  }, [confirmDialog, deleteEmployee, row?._id, t]);
  const handleStatusChange = useCallback(() => {
    confirmDialog(
      row?.status === "ACTIVE"
        ? t("DEACTIVATION_CONFIRMATION_TITLE")
        : t("ACTIVATION_CONFIRMATION_TITLE"),
      row?.status === "ACTIVE"
        ? t("DEACTIVATION_CONFIRMATION_SUBTITLE")
        : t("ACTIVATION_CONFIRMATION_SUBTITLE"),
      "WARNING",
      () =>
        toggleEmployeeStatus(row).then(() => {
          toast("Successfully Deleted");
        })
    );
  }, [confirmDialog, row, t, toggleEmployeeStatus]);
  return (
    <TableRow
      key={row?._id}
      className=" text-base dark:bg-table-row-bg dark:border-b-7 dark:border-[rgb(20,28,31)] dark:border-t-7 h-24"
    >
      <TableCell className="">
        <div className="flex items-center justify-center rounded-full overflow-hidden">
          {row?.imageUrl && (
            <Image
              src={row?.imageUrl}
              alt={row?.name}
              className="h-12 w-auto rounded-full"
              height="128"
              width="128"
              loading="lazy"
            />
          )}
          {!row?.imageUrl && (
            <Icon
              icon="lets-icons:img-box-light"
              className="text-4xl text-neon"
            />
          )}
        </div>
      </TableCell>
      <TableCell className="font-medium max-w-64  truncate text-center">
        {row?.name}
      </TableCell>
      <TableCell className="font-medium max-w-64  truncate text-center">
        {row?.jobTitle ? t(row.jobTitle) : "--"}
      </TableCell>
      <TableCell className="font-medium max-w-64  truncate text-center">
        {row?._id?.substring(20)}
      </TableCell>
      <TableCell className="font-medium  text-center">
        {row?.currentBranch ?? "--"}
      </TableCell>
      <TableCell className="text-center ">{row?.phone}</TableCell>

      <TableCell
        className={cn(
          "text-center font-semibold"
          // USER_STATUS?.[row?.status]?.style
        )}
      >
        <div className="flex items-center gap-1.5 justify-center ">
          <div
            className={cn(
              USER_STATUS?.[row?.status]?.background,
              "w-3 h-3 rounded-[50%]"
            )}
          >
            &nbsp;
          </div>
          {row?.status ? t(row?.status) : "--"}
        </div>
      </TableCell>
      <TableCell className={cn("text-center w-36")}>
        <Popover>
          <PopoverTrigger className="cursor-pointer bg-transparent border-[1px] border-blue-700 dark:border-[#00Df72] dark:text-[#00Df72] text-blue-700 transition-all hover:bg-blue-700 dark:hover:bg-[#00Df72] hover:text-white rounded-full py-1.5 font-bold flex flex-row gap-0.5 items-center px-2 mx-auto text-sm dark:hover:text-[#192227] ">
            {t("ACTION")}
            <Icon
              icon="tabler:chevron-up"
              style={{ transform: "rotate(180deg)" }}
            />
          </PopoverTrigger>
          <PopoverContent className="bg-portal-bg w-96 p-0 overflow-x-hidden max-h-64 overflow-y-scroll">
            <ul className="flex flex-col gap-1">
              <li
                // onClick={handleDeleteProduct}

                onClick={() => {
                  router.push(`employees/${row?._id}`);
                }}
                className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer"
              >
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon icon="hugeicons:eye" style={{ fontSize: "30px" }} />
                </div>
                <div>
                  <p>{t("DETAILS_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("DETAILS_SUBTITLE")}
                  </p>
                </div>
              </li>
              <Separator className="bg-table-row-bg" />
              <li className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer">
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon
                    icon="mynaui:users-group"
                    style={{ fontSize: "30px" }}
                  />
                </div>
                <div>
                  <p>{t("STAFF_TITLE")}</p>
                  <p className="text-sm text-gray-400">{t("STAFF_SUBTITLE")}</p>
                </div>
              </li>
              <Separator className="bg-table-row-bg" />

              <li
                className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer"
                onClick={handleStatusChange}
              >
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon
                    icon="solar:pause-outline"
                    style={{ fontSize: "30px" }}
                  />
                </div>
                <div>
                  <p>{t("ACTIVATION_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("ACTIVATION_SUBTITLE")}
                  </p>
                </div>
              </li>
              <li
                className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer"
                onClick={handleDeleteProduct}
              >
                <div className="border-danger-dark border-[1px] rounded-md p-2 text-danger-dark">
                  <Icon icon="prime:trash" style={{ fontSize: "30px" }} />
                </div>
                <div>
                  <p>{t("DELETE_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("DELETE_SUBTITLE")}
                  </p>
                </div>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}
