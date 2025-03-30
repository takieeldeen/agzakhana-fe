"use client";
import { useConfirmDialog } from "@/components/confirmation-dialog/confirmation-dialog-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { StockListItem } from "@/types/stock";
import { QTY_STATUS } from "@/utilis/CONSTANTS";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback } from "react";

interface TableRowProps {
  row: StockListItem;
}

export default function StockTableRow({ row }: TableRowProps) {
  //   Custom Hooks //////////////////////////
  const { locale } = useParams();
  const t = useTranslations("STOCK_MANAGMENT_PAGE");
  const { confirmDialog } = useConfirmDialog();
  //   Helper Constants /////////////////////
  const currentStatus = QTY_STATUS?.[row?.status];
  //   Callbacks /////////////////////
  const handleDeleteProduct = useCallback(() => {
    confirmDialog(
      "تأكيد الحذف",
      "هل أنت متأكد انك تريد حذف جميع الكمية , في حالة حذف الكمية لن يمكن استرجاعها مرة اخرى."
    );
  }, [confirmDialog]);
  return (
    <TableRow
      key={row?.id}
      className="h-12 text-base dark:bg-table-row-bg dark:border-b-7 dark:border-[rgb(20,28,31)] dark:border-t-7"
    >
      <TableCell className="">
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
      <TableCell className="font-medium max-w-64  truncate">
        {locale === "ar" ? row?.nameAr : row?.nameEn}
      </TableCell>
      <TableCell className="text-center ">
        {row?.category?.[locale === "ar" ? "nameAr" : "nameEn"]}
      </TableCell>
      <TableCell className="text-center">{row?.quantity}</TableCell>
      <TableCell className="text-center ">{row?.price}</TableCell>
      <TableCell className={cn("text-center")}>
        <span
          className={cn(
            "font-bold px-4 py-1 rounded-full text-sm",
            currentStatus?.style
          )}
        >
          {QTY_STATUS?.[row?.status]?.[locale === "ar" ? "nameAr" : "nameEn"]}
        </span>
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
          <PopoverContent className="bg-portal-bg w-96 p-0 overflow-hidden">
            <ul className="flex flex-col gap-1">
              <li
                onClick={handleDeleteProduct}
                className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer"
              >
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon
                    icon="healthicons:rdt-result-out-stock-outline"
                    style={{ fontSize: "30px" }}
                  />
                </div>
                <div>
                  <p>{t("DELETE_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("DELETE_SUBTITLE")}
                  </p>
                </div>
              </li>
              <Separator className="bg-table-row-bg" />
              <li className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer">
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon
                    icon="material-symbols-light:box-add-outline"
                    style={{ fontSize: "30px" }}
                  />
                </div>
                <div>
                  <p>{t("ADD_QTY_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("ADD_QTY_SUBTITLE")}
                  </p>
                </div>
              </li>
              <Separator className="bg-table-row-bg" />

              <li className="flex flex-row gap-3 items-start hover:bg-menu-item-hover py-3 px-6 transition-all cursor-pointer">
                <div className="border-neon border-[1px] rounded-md p-2 text-neon">
                  <Icon
                    icon="system-uicons:box-remove"
                    style={{ fontSize: "30px" }}
                  />
                </div>
                <div>
                  <p>{t("TAKE_QTY_TITLE")}</p>
                  <p className="text-sm text-gray-400">
                    {t("TAKE_QTY_SUBTITLE")}
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
