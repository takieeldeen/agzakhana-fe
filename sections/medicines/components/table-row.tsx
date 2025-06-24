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
import { Medicine } from "@/types/medicines";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

interface TableRowProps {
  row: Medicine;
}

export default function StyledTableRow({ row }: TableRowProps) {
  //   Custom Hooks //////////////////////////
  const { locale } = useParams();
  const t = useTranslations("");
  const { confirmDialog } = useConfirmDialog();
  const { deleteBranch } = useMutateBranches();
  const router = useRouter();
  //   Helper Constants /////////////////////
  const isAr = locale === "ar";
  //   Callbacks /////////////////////
  const handleDeleteProduct = useCallback(() => {
    confirmDialog(
      t("MEDICINES_MANAGEMENT_PAGE.DELTEE_MSG_TITLE"),
      t("MEDICINES_MANAGEMENT_PAGE.DELETE_MSG_SUBTITLE"),
      "ALERT",
      async () => {
        await deleteBranch(row);
      }
    );
  }, [confirmDialog, deleteBranch, row, t]);
  const handleActiavtion = useCallback(() => {
    confirmDialog(
      t(
        `MEDICINES_MANAGEMENT_PAGE.${
          row.status === "ACTIVE" ? "DEACTIVATION" : "ACTIVATION"
        }_MSG_TITLE`
      ),
      t(
        `MEDICINES_MANAGEMENT_PAGE.${
          row.status === "ACTIVE" ? "DEACTIVATION" : "ACTIVATION"
        }_MSG_SUBTITLE`
      ),
      "WARNING",
      async () => {
        await deleteBranch(row);
      }
    );
  }, [confirmDialog, deleteBranch, row, t]);
  const handleViewDetails = useCallback(() => {
    router.push(`medicines/${row._id}`);
  }, [router, row._id]);
  console.log(row.status);
  return (
    <TableRow
      key={row?._id}
      className=" text-base dark:bg-table-row-bg dark:border-b-7 dark:border-[rgb(20,28,31)] dark:border-t-7 h-24"
    >
      <TableCell className="font-medium max-w-64  truncate text-center">
        {row?._id}
      </TableCell>
      <TableCell className={cn("text-center font-semibold")}>
        <div className="flex items-center justify-center">
          {row?.imageUrl && (
            <Image
              src={row?.imageUrl}
              alt={row?.nameEn}
              className="h-12 w-auto"
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
        {isAr ? row?.nameAr : row?.nameEn}
      </TableCell>
      <TableCell className="font-medium max-w-64  truncate text-center">
        {t("MEDICINES_MANAGEMENT_PAGE.PRICE", {
          price: row?.price,
        })}
      </TableCell>

      <TableCell className="text-center ">
        {isAr ? row?.category?.nameAr : row?.category?.nameEn}
      </TableCell>
      <TableCell className="text-center">
        {isAr ? row?.descriptionAr : row?.descriptionEn}
      </TableCell>
      <TableCell className="text-center ">
        {t(
          `MEDICINES_MANAGEMENT_PAGE.PRESCRIPTION_${row?.requirePrescription}`
        )}
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
                onClick={handleViewDetails}
                className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer"
              >
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon icon="hugeicons:eye" style={{ fontSize: "30px" }} />
                </div>
                <div>
                  <p>{t("MEDICINES_MANAGEMENT_PAGE.MEDICINE_DETAILS")}</p>
                  <p className="text-sm text-gray-400">
                    {t("MEDICINES_MANAGEMENT_PAGE.MEDICINE_DETAILS_SUBTITLE")}
                  </p>
                </div>
              </li>

              <Separator className="bg-table-row-bg" />

              <li
                className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer"
                onClick={handleActiavtion}
              >
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon
                    icon={
                      row?.status === "ACTIVE"
                        ? "solar:pause-outline"
                        : "solar:play-line-duotone"
                    }
                    style={{ fontSize: "30px" }}
                  />
                </div>
                <div>
                  <p>
                    {t(
                      `MEDICINES_MANAGEMENT_PAGE.${
                        row?.status === "ACTIVE" ? "DEACTIVATE" : "ACTIVATE"
                      }_MEDICINE`
                    )}
                  </p>
                  <p className="text-sm text-gray-400">
                    {t(
                      `MEDICINES_MANAGEMENT_PAGE.${
                        row?.status === "ACTIVE" ? "DEACTIVATE" : "ACTIVATE"
                      }_MEDICINE_SUBTITLE`
                    )}
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
                  <p>{t("MEDICINES_MANAGEMENT_PAGE.DELETE_MEDICINE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("MEDICINES_MANAGEMENT_PAGE.DELETE_MEDICINE_SUBTITLE")}
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
