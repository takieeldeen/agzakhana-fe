"use client";
import { useMutateBranches } from "@/api/branches";
import { useConfirmDialog } from "@/components/confirmation-dialog/confirmation-dialog-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BranchType } from "@/types/branches";
import { BRANCH_STATUS } from "@/utilis/CONSTANTS";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback } from "react";

interface TableRowProps {
  row: BranchType;
}

export default function BranchesTableRow({ row }: TableRowProps) {
  //   Custom Hooks //////////////////////////
  const { locale } = useParams();
  const t = useTranslations("");
  const { confirmDialog } = useConfirmDialog();
  const { deleteBranch } = useMutateBranches();
  //   Helper Constants /////////////////////
  //   Callbacks /////////////////////
  const handleDeleteProduct = useCallback(() => {
    confirmDialog(
      "تأكيد الحذف",
      "هل أنت متأكد انك تريد حذف جميع الكمية , في حالة حذف الكمية لن يمكن استرجاعها مرة اخرى.",
      "ALERT",
      async () => {
        await deleteBranch(row);
      }
    );
  }, [confirmDialog, deleteBranch, row]);
  return (
    <TableRow
      key={row?._id}
      className=" text-base dark:bg-table-row-bg dark:border-b-7 dark:border-[rgb(20,28,31)] dark:border-t-7 h-24"
    >
      <TableCell className="font-medium max-w-64  truncate text-center">
        {row?._id}
      </TableCell>
      <TableCell className="font-medium max-w-64  truncate text-center">
        {row?.name}
      </TableCell>

      <TableCell className="text-center ">
        {row?.managerName ?? t("COMMON.UNSPECIFIED")}
      </TableCell>
      <TableCell className="text-center">
        {row?.openingHour
          ? new Date(row?.openingHour)?.toLocaleTimeString(
              locale === "ar" ? "ar-EG" : "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )
          : "--"}
      </TableCell>
      <TableCell className="text-center ">
        {row?.closingHour
          ? new Date(row?.closingHour)?.toLocaleTimeString(
              locale === "ar" ? "ar-EG" : "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )
          : "--"}
      </TableCell>
      <TableCell
        className={cn(
          "text-center font-semibold",
          BRANCH_STATUS?.[row?.status]?.style
        )}
      >
        <div className="flex items-center gap-1.5 justify-center ">
          <div
            className={cn(
              BRANCH_STATUS?.[row?.status]?.background,
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
            {t("BRANCHES_MANAGEMENT_PAGE.ACTION")}
            <Icon
              icon="tabler:chevron-up"
              style={{ transform: "rotate(180deg)" }}
            />
          </PopoverTrigger>
          <PopoverContent className="bg-portal-bg w-96 p-0 overflow-x-hidden max-h-64 overflow-y-scroll">
            <ul className="flex flex-col gap-1">
              <li
                // onClick={handleDeleteProduct}
                className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer"
              >
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon icon="hugeicons:eye" style={{ fontSize: "30px" }} />
                </div>
                <div>
                  <p>{t("BRANCHES_MANAGEMENT_PAGE.DETAILS_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("BRANCHES_MANAGEMENT_PAGE.DETAILS_SUBTITLE")}
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
                  <p>{t("BRANCHES_MANAGEMENT_PAGE.STAFF_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("BRANCHES_MANAGEMENT_PAGE.STAFF_SUBTITLE")}
                  </p>
                </div>
              </li>
              <Separator className="bg-table-row-bg" />

              <li className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer">
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon
                    icon="solar:pause-outline"
                    style={{ fontSize: "30px" }}
                  />
                </div>
                <div>
                  <p>{t("BRANCHES_MANAGEMENT_PAGE.ACTIVATION_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("BRANCHES_MANAGEMENT_PAGE.ACTIVATION_SUBTITLE")}
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
                  <p>{t("BRANCHES_MANAGEMENT_PAGE.DELETE_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("BRANCHES_MANAGEMENT_PAGE.DELETE_SUBTITLE")}
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
