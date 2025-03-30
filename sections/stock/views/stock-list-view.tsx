import TableHeadCustom from "@/components/table/table-head-custom";
import { Table, TableBody } from "@/components/ui/table";
import { STOCK_LIST } from "@/mock/_stock";
import StockTableRow from "../stock-table-row";
import { useTranslations } from "next-intl";
import TableToolbar from "../stock-table-toolbar";
import ViewHeader from "../stock-header";

export default function StockListView() {
  // State Management //////////////////////////////////////
  const t = useTranslations("STOCK_MANAGMENT_PAGE");
  const HEAD_LABEL = [
    {
      id: "imageUrl",
      label: t("IMAGE"),
      style: "text-center",
    },
    {
      id: "nameAr",
      label: t("PRODUCT_NAME"),
      style: "text-left rtl:text-right",
    },
    {
      id: "category",
      label: t("CATEGORY"),
      style: " text-center",
    },
    {
      id: "quantity",
      label: t("QUANTITY"),
      style: " text-center",
    },
    {
      id: "price",
      label: t("PRICE"),
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
  return (
    <div className="flex flex-col gap-2 w-full h-full sticky top-0 ">
      <ViewHeader />
      <div className="flex flex-row w-full gap-3.5 h-full">
        <div className="w-3/4 h-full overflow-y-scroll rtl:pl-2">
          <Table className="rounded-lg">
            <TableHeadCustom tableHeadDetails={HEAD_LABEL} className="" />
            <TableBody>
              {STOCK_LIST?.map((stockItem) => (
                <StockTableRow row={stockItem} key={stockItem?.id} />
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-1/4">
          <TableToolbar />
        </div>
      </div>
    </div>
  );
}
